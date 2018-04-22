import React, { PureComponent } from 'react';
import { connect } from 'react-redux'
import PropTypes from 'prop-types';
import { withRouter, Link } from 'react-router-dom';

import NewCommunityButton from '../components/NewCommunityButton'

const styles = {
    container: {
        display: 'flex',
        minHeight: '10vh',
        alignItems: 'center',
        justifyContent: 'center'
    }
}


class Communities extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        return (
            <span>
                <NewCommunityButton />
                <div className='container'>
                    Communities
                </div>
            </span>
        )
    }

}

const mapStateToProps = (state, ownProps) => ({
    postable: ownProps.postable || null
})

const mapDispatchToProps = dispatch => ({

})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Communities))