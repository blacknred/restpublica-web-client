import React, { PureComponent } from 'react';
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { withRouter, Route, Switch } from 'react-router-dom'
import { CSSTransitionGroup } from 'react-transition-group'
import './App.css';
import PostEditor from './PostEditor';
import Dialog from 'material-ui/Dialog';
import Paper from 'material-ui/Paper';

const styles = {
    modal: {
        position: 'fixed',
        left: 0,
        right: 0,
        top: 0,
        height: '100vh',
        zIndex: '1303',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'transparent'
    },
    overlay: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        height: '100vh',
        zIndex: '1302',
        background: '#777',
    },
    content: {
        //backgroundColor: 'transparent',
        maxWidth: '530px',
        transform: 'none',
        //transform: 'translate(0px, -164px)',
        //transition: 'all 800ms',
        //width: '400px',
        // display: 'flex',
        // flexDirection: 'column',
        // justifyContent: 'center',
        // transform: null, 
        // // animation: 'fadeInUp 1s',
    }

}

const Modal = (PassedComp) => class Modal extends PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            open: true
        }
    }
    static propTypes = {
        history: PropTypes.any,
        location: PropTypes.any,
        close: PropTypes.func.isRequired
    }

    render() {
        return (
            // <Dialog
            //     modal={false}
            //     onRequestClose={() => {
            //         this.setState({ open: !this.state.open })
            //         this.props.history.goBack()
            //     }}
            //     open={true}
            //     overlayStyle={{
            //         backgroundColor: 'rgba(0, 0, 0, 0.3)',
            //         display: 'flex',
            //         justifyContent: 'center',
            //         alignItems: 'center'
            //     }}
            //     bodyStyle={{
            //         padding: '0px',
            //         // transform: null,
            //         // animation: null
            //     }}
            //     contentStyle={Object.assign(styles.content, !this.state.open ? { animation: 'fadeInUp 0.8s' } : { animation: 'fadeOutUp 0.8s' }
            //     )}
            // >
            //     {/* <CSSTransitionGroup
            //         transitionName='fadeInUp'
            //         transitionEnterTimeout={500}
            //         transitionLeaveTimeout={300} > */}
            //     {/* <div style={{ position: 'fixed' }}> */}
            //     <Switch location={this.props.location} key={this.props.location.key}>
            //         <Route exact path="/post" component={PostEditor} />
            //         <Route path="/community" component={() => (<h1>New community</h1>)} />
            //         <Route path="/p/:id" component={() => (<h1>Post</h1>)} />
            //     </Switch>
            //     {/* </div> */}
            //     {/* </CSSTransitionGroup> */}
            // </Dialog>
            /* 
                contentStyle={{}} */

            // <div style={styles.modal}>
                <span
                    style={{
                        ...styles.overlay,
                        animation: this.state.open ? 'fadeIn 0.3s' : 'fadeOut 0.3s'
                    }}
                    onClick={() => {
                        this.setState({ open: false });
                        this.props.close();
                    }}
                >
                <PassedComp />
                </span>
            //     <span style={{ animation: this.state.open ? 'fadeInUp 0.4s' : 'fadeOutUp 0.4s' }}>
            //         <Switch location={this.props.location}>
            //             <Route exact path="/post" component={PostEditor} />
            //             <Route exact path="/community" component={() => (<h1>New community</h1>)} />
            //             <Route exact path="/p/:id" component={() => (<h1>Post</h1>)} />
            //         </Switch>
            //     </span>
            // </div>

        )
    }
}

const mapStateToProps = (state, ownProps) => ({
    history: ownProps.history,
    location: ownProps.location,
    close: ownProps.close
})

export default withRouter(connect(mapStateToProps)(Modal))
