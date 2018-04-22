import React, { PureComponent } from 'react';
import { connect } from 'react-redux'
import PropTypes from 'prop-types';

import NewPostForm from '../components/NewPostForm'

class NewPost extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            open: true,
        }
    };

    static propTypes = {
        close: PropTypes.func.isRequired,
    }

    modalOpenHandler = (val) => {
        this.setState({ open: val });
        this.props.close()
    };

    render() {
        return (
            <NewPostForm
                {...this.state}
                modalOpen={this.modalOpenHandler}
            />
        )
    }
}

const mapStateToProps = (state, ownProps) => ({
    close: ownProps.close
})

const mapDispatchToProps = dispatch => ({
})

export default connect(mapStateToProps, mapDispatchToProps)(NewPost)