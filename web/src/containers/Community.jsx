import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import React, { Component } from 'react';

import { 
    getTrendingProfiles, 
    createUserSubscription, 
    removeUserSubscription 
} from '../api'
import { createFlashMessage } from '../actions'
import CommunityContent from '../components/CommunityContent';

class Community extends Component {
    constructor(props) {
        super(props);
        this.state = { };
    }
    static propTypes = {
        
    }
    
    componentDidMount() {
        // console.log(`${this.props.author} page is mounted`)
        // this.getUserDataHandler();
    }

    render() {
        return (
            <CommunityContent
                {...this.state}
                {...this.props}
                removeSubscription={this.removeSubscriptionHandler}
                createSubscription={this.createSubscriptionHandler}
            />
        )
    }
}
const mapStateToProps = (state, ownProps) => ({
})
const mapDispatchToProps = dispatch => ({
    createFlashMessage: (message) => dispatch(createFlashMessage(message))
})
export default connect(mapStateToProps, mapDispatchToProps)(Community)
