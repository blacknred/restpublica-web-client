import React, { PureComponent } from 'react';
import { connect } from 'react-redux'
import PropTypes from 'prop-types';

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