/* eslint-disable no-undef */
import React, { Component } from 'react';

const styles = {
    postContainer: {
        background: '#eee'
    }
}

class Post extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        return (
            <div className='container' style={styles.postContainer}>
                Post
            </div>
        )
    }

}
export default Post  