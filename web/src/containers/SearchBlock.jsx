import PropTypes from 'prop-types';
import React, { Component } from 'react';

import { getTrendingTags } from '../api'
import SearchBlockContent from '../components/SearchBlockContent';

class SearchBlock extends Component {
    constructor(props) {
        super(props);
        this.state = {
            trendingTags: []
        }
    }

    static propTypes = {}

    getTrendingTagsHandler = async () => {
        const res = await getTrendingTags()
        if (!res) return
        this.setState({ trendingTags: res.data })
    }

    componentDidMount() {
        this.getTrendingTagsHandler();
    }

    render() {
        return (
            <SearchBlockContent {...this.state}/>
        )
    }

}

export default SearchBlock;