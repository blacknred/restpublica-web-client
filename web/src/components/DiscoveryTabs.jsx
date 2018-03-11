import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { grey600, red400 } from 'material-ui/styles/colors';
// import { Tabs, Tab } from 'material-ui/Tabs';

// const styles = {
//     tabs: {
//         width: '30%',
//         backgroundColor: 'transparent'
//     },
//     tab: {
//         color: '#888',
//         width: '50%',
//         fontWeight: 700
//     }
// }
const styles = {
    tabs: {
        height: '50px',
        lineHeight: '50px'
    },
    tab: {
        padding: '15px',
        fontSize: '0.9em',
        fontWeight: 700,
        color: grey600
    },
    activeTab: {
        borderBottom: `2px solid ${red400}`,
        transition: 'all 1s'
    }
}

const AuthorTabs = ({ match }) => {
    const url = match.url.substring(0, match.url.lastIndexOf('/'))
    return (
        // <Tabs tabItemContainerStyle={styles.tabs}>
        //     {
        //         !showActivity ? null :
        //             <Tab
        //                 label='activity'
        //                 style={styles.tab}
        //                 onActive={() => redirect(`${basePath}activity`)}
        //             />
        //     }
        //     <Tab
        //         label='posts'
        //         style={styles.tab}
        //         onActive={() => redirect(`${basePath}posts`)}
        //     />
        //     <Tab
        //         label='followers'
        //         style={styles.tab}
        //         onActive={() => redirect(`${basePath}followers`)}
        //     />
        //     <Tab
        //         label='followin'
        //         style={styles.tab}
        //         onActive={() => redirect(`${basePath}followin`)}
        //     />
        // </Tabs>


        <div style={styles.tabs}>
            <NavLink
                to={url + `/`}
                style={styles.tab}
                activeStyle={styles.activeTab} >
                ALL
            </NavLink>
            <NavLink
                to={url + `/posts`}
                style={styles.tab}
                activeStyle={styles.activeTab} >
                POSTS
            </NavLink>
            <NavLink
                to={url + `/authors`}
                style={styles.tab}
                activeStyle={styles.activeTab} >
                AUTHORS
            </NavLink>
            <NavLink
                to={url + `/tags`}
                style={styles.tab}
                activeStyle={styles.activeTab} >
                TAGS
            </NavLink>
            <NavLink
                to={url + `/communities`}
                style={styles.tab}
                activeStyle={styles.activeTab} >
                COMMUNITIES
            </NavLink>
        </div>
    )
}

AuthorTabs.propTypes = {
    match: PropTypes.object.isRequired
}

export default AuthorTabs