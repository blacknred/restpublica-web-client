import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import {
    getTrendingTags,
    getSearchedTags
} from '../api'
import TagsContent from '../components/TagsContent';
import TagsSearchContent from '../components/TagsSearchContent';

class Tags extends Component {
    constructor(props) {
        super(props);
        this.state = {
            trendingTags: []
        }
    }

    static propTypes = {
        location: PropTypes.object.isRequired
    }

    getTrendingTagsHandler = async () => {
        const { location } = this.props
        const path = location.pathname.split('/')
        const mode = path[1]
        const query = path[2]
        let res
        if (mode === 'search') res = await getSearchedTags({ query })
        else res = await getTrendingTags()
        if (!res) return
        this.setState({ trendingTags: res.data })
    }

    componentDidMount() {
        this.getTrendingTagsHandler();
    }

    render() {
        const { isHeader } = this.props
        return (
            isHeader ?
                <TagsSearchContent {...this.state} /> :
                <TagsContent {...this.state} />
        )
    }
}

export default withRouter(Tags);