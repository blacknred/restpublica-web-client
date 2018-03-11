/* eslint-disable no-undef */
import React, { Component } from 'react';

const styles = {
    postEditorContainer: {
        background: '#eee', margin: '0 auto', width: '500px'
    }
}

class PostEditor extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        return (
            <div style={styles.postEditorContainer}>
                New Post
            </div>
        )
    }

}
export default PostEditor 