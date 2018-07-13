import URI from 'url';
import path from 'path';
import moment from 'moment';
import urlRegex from 'is-url';
import PropTypes from 'prop-types';
import getVideoId from 'get-video-id';
import { connect } from 'react-redux';
import React, { PureComponent } from 'react';
import { withRouter } from 'react-router-dom';

import {
    createPost,
    getProfileCommunities,
    getFetchedData,
    saveFileInStorage
} from '../api'
import { Parser } from '../api/_helpers'
import {
    createFlashMessage,
    switchLoader,
} from '../actions'
import NewPostForm from '../components/NewPostForm';

class NewPost extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: true,
            isCloseConfirmOpen: false,
            isPublishing: false,
            isOptionsMenuOpen: false,
            isAddPollDialogOpen: false,
            isCommunitiesDialogOpen: false,
            isAddLinkDialogOpen: false,
            isPollEndDateDialogOpen: false,
            availableCommunities: {
                hasMore: true,
                empty: false,
                list: [],
                selected: this.props.community,
            },

            description: '',
            archived: false,
            commentable: true,
            content: {
                isLoading: false,
                type: this.props.repost ? 'repost' : 'text',

                repost: this.props.repost,

                files: [],
                thumbFiles: [],
                filesType: 'img',
                isVideoFilePlay: false,

                link: '',
                linkType: 'page', //page, file, embed
                linkImg: null,
                linkTitle: null,
                linkSrc: null,
                linkDescription: null,
                linkEmbed: null,

                pollMode: 'text', // text, img
                pollEndsAt: null,
                pollAnswers: [
                    {
                        text: '',
                        img: null,
                        thumb: null
                    },
                    {
                        text: '',
                        img: null,
                        thumb: null
                    }
                ]
            }
        }
    };

    static propTypes = {
        close: PropTypes.func.isRequired,
        repost: PropTypes.object,
        community: PropTypes.object,
        isSlide: PropTypes.bool.isRequired,
        userId: PropTypes.string.isRequired,
        username: PropTypes.string.isRequired,
        userAvatar: PropTypes.string.isRequired,
        switchLoader: PropTypes.func.isRequired,
        createMessage: PropTypes.func.isRequired,
    }

    toggleFormHandler = () => {
        if (!this.state.isCloseConfirmOpen &&
            (this.state.description.length > 0 ||
                this.state.content.type !== 'text')
        ) {
            this.setState({ isCloseConfirmOpen: true })
            return
        }
        this.setState({ isCloseConfirmOpen: false })
        this.setState({ isOpen: false })
    }

    toggleContextDialogHandler = (target) => {
        this.setState({ [target]: !this.state[target] })
    }

    getProfileCommunitiesHandler = async (page) => {
        const data = {
            userId: this.props.userId,
            page
        }
        const res = await getProfileCommunities(data)
        if (!res) {
            this.setState({
                availableCommunities: {
                    ...this.state.availableCommunities,
                    hasMore: false
                }
            });
            this.props.createMessage('Server error. Try later.')
            return
        }
        // if there are no requested communities
        if (res.data.count === '0') {
            this.setState({
                availableCommunities: {
                    ...this.state.availableCommunities,
                    hasMore: false,
                    empty: true
                }
            })
        }
        // enlarge communities arr if there are, 
        // block loading if there are not
        if (res.data.communities.length > 0) {
            const list = await this.state.availableCommunities.list
                .concat(...res.data.communities)
            this.setState({
                availableCommunities: {
                    ...this.state.availableCommunities,
                    list
                }
            });
        } else {
            this.setState({
                availableCommunities: {
                    ...this.state.availableCommunities,
                    hasMore: false
                }
            });
        }
    }

    setCommunityHandler = ({ selected }) => {
        this.setState({
            availableCommunities: {
                ...this.state.availableCommunities,
                selected
            }
        })
    }

    changeDescriptionHandler = (val) => {
        this.setState({ description: val })
    }

    toggleArchivedHandler = () => {
        this.setState({ archived: !this.state.archived })
    }

    toggleCommentableHandler = () => {
        this.setState({ commentable: !this.state.commentable })
    }


    addFileHandler = e => {
        let filesType = 'img'
        const files = []
        for (let file of Object.values(e.target.files)) {
            if (file.size > 10000000) {
                this.props.createMessage('Maximum file size is 10 mB')
                return
            }
            if (file.type.match(/^video\//)) {
                files.length = 0
                files.push(file)
                filesType = 'video'
                break
            }
            if (file.type.match(/^image\//)) files.push(file)
        }
        if (!files[0]) {
            this.props.createMessage('Image or video has been not uploaded')
            return
        }
        this.setState({
            content: {
                ...this.state.content,
                type: 'file',
                isLoading: true,
                files,
                filesType
            }
        })
        files.forEach(async (file) => {
            if (file.size > 2000000) {
                const blobUrl = await URL.createObjectURL(files[0])
                this.setState({
                    content: {
                        ...this.state.content,
                        isLoading: false,
                        thumbFiles: [
                            ...this.state.content.thumbFiles,
                            blobUrl
                        ]
                    }
                })

            } else {
                const reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onloadend = async () => {
                    this.setState({
                        content: {
                            ...this.state.content,
                            isLoading: false,
                            thumbFiles: [
                                ...this.state.content.thumbFiles,
                                reader.result
                            ]
                        }
                    })
                }
            }

        })

    }

    playFileHandler = () => {
        this.setState({
            content: {
                ...this.state.content,
                isVideoFilePlay: !this.state.content.isVideoFilePlay
            }
        })
    }

    removeFileHandler = index => {
        const files = this.state.content.files
        const thumbFiles = this.state.content.thumbFiles
        if (this.state.content.filesType === 'video') {
            URL.revokeObjectURL(thumbFiles[index])
        }
        thumbFiles.splice(index, 1)
        files.splice(index, 1)
        this.setState({
            content: {
                ...this.state.content,
                type: !files[0] ? 'text' : 'file',
                thumbFiles,
                files
            }
        })

    }


    addLinkHandler = async () => {
        const url = this.state.content.link
        if (!urlRegex({ exact: true }).test(url)) {
            this.props.createMessage('Not valid url')
            return
        }
        this.setState({
            content: {
                ...this.state.content,
                isLoading: true
            }
        })
        let linkType, linkEmbed, linkImg, parsedObj = {}
        const extname = path.extname(URI.parse(url).pathname)
        if (extname && extname !== '.html') {
            linkType = 'file'
            if (extname.match(/^(.jpeg|.jpg|.png)$/)) linkImg = url
        } else {
            linkType = 'page'
            const html = await getFetchedData(url)
            if (!html) {
                this.setState({
                    content: {
                        ...this.state.content,
                        type: 'text',
                        isLoading: false,
                        link: '',
                        linkType: 'page',
                    }
                })
                this.props.createMessage('Not reachable url')
                return
            }
            const options = {
                title: true,
                image: true,
                description: true
            }
            parsedObj = await Parser({ url, html, options })
            const { id, service } = getVideoId(url);
            if (id && service) {
                linkType = 'embed'
                switch (service) {
                    case 'youtube':
                        linkEmbed = `https://www.youtube.com/embed/${id}`
                        break;
                    case 'vimeo':
                        linkEmbed = `https://player.vimeo.com/video/${id}`
                        break;
                    case 'vine':
                        linkEmbed = `https://vine.co/v/${id}/embed/simple`
                        break;
                    case 'videopress':
                        linkEmbed = `https://videopress.com/embed/${id}`
                        break;
                    default:
                        break;
                }
            }
        }
        console.log(linkType, linkEmbed, linkImg)
        this.setState({
            content: {
                ...this.state.content,
                isLoading: false,
                type: 'link',
                linkType,
                linkSrc: URI.parse(url).hostname,
                linkImg: linkImg || parsedObj.image,
                linkTitle: parsedObj.title,
                linkDescription: parsedObj.description,
                linkEmbed
            }
        })
    }

    removeLinkHandler = () => {
        this.setState({
            content: {
                ...this.state.content,
                type: 'text',
                link: '',
                linkType: 'page',
                linkSrc: null,
                linkImg: null,
                linkTitle: null,
                linkDescription: null
            }
        })

    }

    changeContentLinkHandler = (val) => {
        this.setState({
            content: {
                ...this.state.content,
                link: val
            }
        })
    }


    addPollHandler = () => {
        this.setState({
            content: {
                ...this.state.content,
                isLoading: false,
                type: 'poll',
            }
        })
    }

    removePollHandler = () => {
        this.setState({
            content: {
                ...this.state.content,
                type: 'text',
                pollEndsAt: null,
                pollAnswers: [
                    {
                        text: '',
                        img: null,
                        thumb: null
                    },
                    {
                        text: '',
                        img: null,
                        thumb: null
                    }
                ]
            }
        })
    }

    addPollAnswerHandler = () => {
        this.setState({
            content: {
                ...this.state.content,
                pollAnswers: [
                    ...this.state.content.pollAnswers,
                    {
                        text: '',
                        img: null,
                        thumb: null
                    }
                ]
            }
        })
    }

    removePollAnswerHandler = index => {
        const pollAnswers = this.state.content.pollAnswers
        pollAnswers.splice(index, 1)
        this.setState({
            content: {
                ...this.state.content,
                pollAnswers
            }
        })
    }

    changePollAnswerTextHandler = (index, val) => {
        const pollAnswers = this.state.content.pollAnswers
        pollAnswers[index].text = val
        this.setState({
            content: {
                ...this.state.content,
                pollAnswers
            }
        })
    }

    changePollAnswerImgHandler = (index, e) => {
        const file = e.target.files[0]
        if (file.size > 5000000) {
            this.props.createMessage('Maximum file size is 10 mB')
            return
        }
        if (!file.type.match(/^image\//)) {
            this.props.createMessage('Image has been not uploaded')
            return
        }
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            const pollAnswers = this.state.content.pollAnswers
            pollAnswers[index].img = file
            pollAnswers[index].thumb = reader.result
            this.setState({
                content: {
                    ...this.state.content,
                    pollMode: 'img',
                    pollAnswers
                }
            })
        }
    }

    removePollAnswerImgHandler = (index) => {
        const pollAnswers = this.state.content.pollAnswers
        pollAnswers[index].img = null
        pollAnswers[index].thumb = null
        const pollAnswerWithImg = pollAnswers.filter(ans => ans.img !== null)
        this.setState({
            content: {
                ...this.state.content,
                pollMode: pollAnswerWithImg.length ? 'img' : 'text',
                pollAnswers
            }
        })
    }

    changePollEndDateHandler = (val) => {
        let newDate = val
        let date = moment.parseZone(val)
        let now = moment().parseZone()
        switch (true) {
            case (date.year() < now.year()):
                newDate = null
                break;
            case (date.month() < now.month()):
                newDate = null
                break;
            case (date.date() < now.date()):
                newDate = null
                break;
            default:
                break;
        }
        this.setState({
            content: {
                ...this.state.content,
                pollEndsAt: newDate
            }
        })
    }


    createPostHandler = async () => {
        this.setState({ isPublishing: true })
        const post = {
            commentable: this.state.commentable,
            archived: this.state.archived,
            description: this.state.description,
            authorId: this.props.userId,
            type: this.state.content.type
        }
        const formData = new FormData()
        if (this.state.availableCommunities.selected.id) {
            post.communityId = this.state.availableCommunities.selected.id
        }
        switch (this.state.content.type) {
            case 'file':
                post.filesType = this.state.content.filesType
                this.state.content.files.map((file, i) => formData.append(`file_${i}`, file))
                const res = await saveFileInStorage(formData)
                post.files = res.data
                break;
            case 'link':
                post.link = this.state.content.linkEmbed || this.state.content.link
                post.linkType = this.state.content.linkType
                post.linkSrc = this.state.content.linkSrc
                if (this.state.content.linkImg) {
                    post.linkImg = this.state.content.linkImg
                }
                if (this.state.content.linkTitle) {
                    post.linkTitle = this.state.content.linkTitle
                }
                if (this.state.content.linkDescription) {
                    post.linkDescription = this.state.content.linkDescription
                }
                break;
            case 'poll':
                post.pollAnswers = this.state.content.pollAnswers
                post.pollAnswers.forEach((ans) => ans.img)
                if (this.state.content.pollMode === 'img') {
                    post.pollAnswers.forEach((ans, i) => formData.append(`file_${i}`, ans.img))
                    const res = await saveFileInStorage(formData)
                    res.data.forEach((file, i) => {
                        post.pollAnswers[i].img = file.file
                        post.pollAnswers[i].thumb = file.thumb
                    })
                }
                if (this.state.content.pollEndsAt) {
                    post.pollEndsAt = this.state.content.pollEndsAt
                }
                break;
            case 'repost':
                post.repostedId = this.state.content.repost.id
                break;
            default:
                break;
        }
        console.log(post)
        const res = await createPost(post)
        this.setState({ isOpen: false })
        if (!res) {
            this.props.createMessage('Server error. Try later.')
            return
        }
        console.log(res)
    }

    render() {
        return (
            <NewPostForm
                {...this.state}
                isSlide={this.props.isSlide}
                username={this.props.username}
                avatar={this.props.userAvatar}
                close={this.props.close}
                toggleForm={this.toggleFormHandler}
                toggleContextDialog={this.toggleContextDialogHandler}
                setCommunity={this.setCommunityHandler}
                getProfileCommunities={this.getProfileCommunitiesHandler}

                toggleCommentable={this.toggleCommentableHandler}
                toggleArchived={this.toggleArchivedHandler}
                changeDescription={this.changeDescriptionHandler}
                addFile={this.addFileHandler}
                removeFile={this.removeFileHandler}
                playFile={this.playFileHandler}
                addLink={this.addLinkHandler}
                removeLink={this.removeLinkHandler}
                changeContentLink={this.changeContentLinkHandler}
                addPoll={this.addPollHandler}
                removePoll={this.removePollHandler}
                addPollAnswer={this.addPollAnswerHandler}
                removePollAnswer={this.removePollAnswerHandler}
                changePollAnswerText={this.changePollAnswerTextHandler}
                changePollAnswerImg={this.changePollAnswerImgHandler}
                removePollAnswerImg={this.removePollAnswerImgHandler}
                changePollEndDate={this.changePollEndDateHandler}

                createPost={this.createPostHandler}
            />
        )
    }
}

const mapStateToProps = (state, ownProps) => ({
    close: ownProps.history.goBack,
    repost: ownProps.location.state.repost || null,
    community: ownProps.location.state.community || null,
    isSlide: ownProps.location.state.isSlide || false,
    userId: state.authentication.id,
    username: state.authentication.username,
    userAvatar: state.authentication.avatar,
})

const mapDispatchToProps = dispatch => ({
    switchLoader: (mode) => dispatch(switchLoader(mode)),
    createMessage: (text) => dispatch(createFlashMessage(text))
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(NewPost))