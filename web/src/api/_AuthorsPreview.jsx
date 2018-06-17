// import PropTypes from 'prop-types';
// import { connect } from 'react-redux';
// import React, { Component } from 'react';

// import { 
//     getTrendingProfiles, 
//     createUserSubscription, 
//     removeUserSubscription 
// } from '../api'
// import { createFlashMessage } from '../actions'
// import AuthorsPreviewList from '../components/AuthorsPreviewList';

// class AuthorsPreview extends Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             authors: []
//         };
//     }
//     static propTypes = {
//         isAuthenticated: PropTypes.bool.isRequired,
//         isNightMode: PropTypes.bool.isRequired
//     }
//     getAuthorsDataHandler = async () => {
//         // let _res, res
//         // _res = await getTrendingProfiles()
//         // res = _res.data.data.users
//         // if (!res) return
//         // this.setState({ authors: res })
//     }
//     createSubscriptionHandler = async (id, name) => {
//         let _res, res, authors
//         _res = await createUserSubscription(id)
//         res = _res.data.data
//         if (!res) return
//         authors = this.state.authors
//         authors.forEach((u) => {
//             if (u.user_id === id) u.my_subscription_id = res
//         })
//         this.setState({ authors })
//         this.props.createFlashMessage(`You are reading ${name} from now`)
//     }
//     removeSubscriptionHandler = async (id, name) => {
//         let _res, res, authors
//         _res = await removeUserSubscription(id)
//         res = _res.data.data
//         if (!res) return
//         authors = this.state.authors
//         authors.forEach((u) => {
//             if (u.my_subscription_id === id) u.my_subscription_id = null
//         })
//         this.setState({ authors })
//         this.props.createFlashMessage(`You are not reading ${name} from now`)
//     }
//     componentDidMount() {
//         console.log('authorsblock is mounted')
//         this.getAuthorsDataHandler();
//     }

//     render() {
//         return (
//             <AuthorsPreviewList
//                 {...this.state}
//                 {...this.props}
//                 removeSubscription={this.removeSubscriptionHandler}
//                 createSubscription={this.createSubscriptionHandler}
//             />
//         )
//     }
// }
// const mapStateToProps = (state, ownProps) => ({
//     isAuthenticated: state.authentication.isAuthenticated,
//     isNightMode: state.uiSwitchers.isNightMode
// })
// const mapDispatchToProps = dispatch => ({
//     createFlashMessage: (message) => dispatch(createFlashMessage(message))
// })
// export default connect(mapStateToProps, mapDispatchToProps)(AuthorsPreview)
