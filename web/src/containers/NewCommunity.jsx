import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import React, { PureComponent } from 'react';

import { createFlashMessage, } from '../actions'

import NewCommunityForm from '../components/NewCommunityForm'

class NewCommunity extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: true,
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
            <NewCommunityForm
                {...this.state}
                modalOpen={this.modalOpenHandler}
                close={this.props.close}
            />
        )
    }
}

const mapStateToProps = (state, ownProps) => ({
    close: ownProps.history.goBack,
})

const mapDispatchToProps = dispatch => ({
    createMessage: (message) => dispatch(createFlashMessage(message))
})

export default connect(mapStateToProps, mapDispatchToProps)(NewCommunity)