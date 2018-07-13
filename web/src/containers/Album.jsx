import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import React, { PureComponent } from 'react';
import { withRouter } from 'react-router-dom';

import AlbumContent from '../components/AlbumContent';

class Album extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: true,
            showControls: true,
            index: this.props.currentIndex,
            files: this.props.files
        }
    };

    static propTypes = {
        close: PropTypes.func.isRequired,
        currentIndex: PropTypes.number.isRequired,
        files: PropTypes.arrayOf(PropTypes.object).isRequired,
        author: PropTypes.shape({
            username: PropTypes.string.isRequired,
            avatar: PropTypes.string.isRequired,
        }).isRequired,
        postStats: PropTypes.shape({
            likes_cnt: PropTypes.string.isRequired,
            comments_cnt: PropTypes.string.isRequired,
        }).isRequired,
    }

    closeDialogHandler = () => {
        this.setState({ isOpen: false })
    }

    changeSrcHandler = (e, direction) => {
        e.stopPropagation()
        this.setState({
            index: direction === 'right' ?
                this.state.index + 1 :
                this.state.index - 1
        })
    }

    toggleShowControlsHandler = () => {
        this.setState({ showControls: !this.state.showControls })
    }

    render() {
        return (
            <AlbumContent
                {...this.state}
                close={this.props.close}
                author={this.props.author}
                postStats={this.props.postStats}
                closeDialog={this.closeDialogHandler}
                changeSrc={this.changeSrcHandler}
                toggleShowControls={this.toggleShowControlsHandler}
            />
        )
    }
}

const mapStateToProps = (state, ownProps) => ({
    close: ownProps.history.goBack,
    currentIndex: ownProps.location.state.currentIndex,
    files: ownProps.location.state.files,
    author: ownProps.location.state.author,
    postStats: ownProps.location.state.postStats
})

const mapDispatchToProps = dispatch => ({
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Album))