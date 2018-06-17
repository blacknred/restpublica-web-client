import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import {
    switchNotFound,
    switchNightMode,
    switchDrawer,
    switchNotify,
    logoutUser,
    createFlashMessage
} from '../actions'
import HeaderContent from '../components/HeaderContent'

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isUserMenuOpen: false,
            isTrendingMenuOpen: false,
            query: '',
            trendingTags: []
        }
    }

    static propTypes = {
        isDrawer: PropTypes.bool.isRequired,
        isAuthenticated: PropTypes.bool.isRequired,
        isNotify: PropTypes.bool.isRequired,
        isNightMode: PropTypes.bool.isRequired,
        notifications: PropTypes.arrayOf(
            PropTypes.shape({
                date: PropTypes.number.isRequired,
                text: PropTypes.string.isRequired
            })
        ).isRequired,
        avatar: PropTypes.string,
        path: PropTypes.array.isRequired,
        updateHistory: PropTypes.func.isRequired,
        switchNightMode: PropTypes.func.isRequired,
        switchDrawer: PropTypes.func.isRequired,
        switchNotify: PropTypes.func.isRequired,
        createFlashMessage: PropTypes.func.isRequired,
        logoutUser: PropTypes.func.isRequired,
        goBack: PropTypes.func.isRequired,
    }

    toggleMenuOpenHandler = (target) => {
        this.setState({ [target]: !this.state[target] })
        //setTimeout(() => this.setState({ [target]: !this.state[target] }), 150)
    }

    searchRedirectHandler = (e) => {
        //e.preventDefault();
        if (e.key === 'Enter') {
            const { query } = this.state
            const formatedQuery = query.replace(/[^\d\w]+/gu, '')//[^\p{L}\d]+
            if (formatedQuery) {
                this.props.updateHistory(`/search/${formatedQuery}/posts`)
            }
            this.setState({ isTrendingMenuOpen: false })
        }
    }

    changeSearchQueryHandler = (e) => {
        this.setState({ query: e.target.value })
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.path !== this.props.path) {
            const { path } = nextProps
            const query = path[1] === 'search' ? path[2] : ''
            this.setState({ query })
        }
    }

    componentDidMount() {
        const { path } = this.props
        const query = path[1] === 'search' ? path[2] : ''
        this.setState({ query })
    }

    render() {
        return (
            <HeaderContent
                {...this.props}
                {...this.state}
                searchRedirect={this.searchRedirectHandler}
                toggleMenuOpen={this.toggleMenuOpenHandler}
                changeSearchQuery={this.changeSearchQueryHandler}
            />
        )
    }
}

const mapStateToProps = (state, ownProps) => ({
    isDrawer: state.uiSwitchers.isDrawer,
    isAuthenticated: state.authentication.isAuthenticated,
    isNotify: state.notifications.isNotify,
    isNightMode: state.uiSwitchers.isNightMode,
    notifications: state.notifications.notificationsList,
    username: state.authentication.username,
    avatar: state.authentication.avatar,
    path: ownProps.location.pathname.split('/'),
    updateHistory: ownProps.history.push,
    goBack: ownProps.history.goBack
})

const mapDispatchToProps = dispatch => {
    return {
        switchNightMode: (mode) => dispatch(switchNightMode(mode)),
        switchDrawer: (mode) => dispatch(switchDrawer(mode)),
        switchNotify: (mode) => dispatch(switchNotify(mode)),
        createFlashMessage: (text) => dispatch(createFlashMessage(text)),
        logoutUser: () => dispatch(logoutUser())
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header))