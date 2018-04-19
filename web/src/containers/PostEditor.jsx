/* eslint-disable no-undef */
import React, { Component } from 'react';

import Paper from 'material-ui/Paper';

const styles = {
    postEditorContainer: {
        width: '530px',
        height: '400px',
    }
}

class PostEditor extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        return (
            <Paper style={styles.postEditorContainer}>
                New Post
            </Paper>
        )
    }

}
export default PostEditor 