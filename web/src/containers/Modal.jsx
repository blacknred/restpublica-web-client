import React from 'react';
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { withRouter, Route, Switch } from 'react-router-dom'

import PostEditor from './PostEditor';
import Dialog from 'material-ui/Dialog';

const Modal = (props) => {
    return (
        <Dialog
            modal={false}
            onRequestClose={() => props.history.goBack()}
            open={true}
            overlayStyle={{
                backgroundColor: 'rgba(0, 0, 0, 0.2)'
            }}
            //contentStyle={{ transform: null }}
        >
            {/* bodyStyle={{}}
            contentStyle={{}} */}
            <Switch>
                <Route path="/newpost" component={PostEditor} />
                <Route path="/newcommunity" component={() => (<h1>New community</h1>)} />
                <Route path="/p/:id" component={() => (<h1>Post</h1>)} />
            </Switch>
        </Dialog>
    )
}

Modal.propTypes = {
    history: PropTypes.any
}
const mapStateToProps = (state, ownProps) => ({
    history: ownProps.history
})

export default withRouter(connect(mapStateToProps)(Modal))
