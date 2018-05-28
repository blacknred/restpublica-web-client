import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

import { 
    grey600, 
    red400 
} from '@material-ui/core/colors';

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

const AuthorTabs = ({ path, showActivity }) => {
    return (
        <div style={styles.tabs}>
            {
                !showActivity ? null :
                    <NavLink
                        to={path+'/activity'}
                        style={styles.tab}
                        activeStyle={styles.activeTab} >
                        ACTIVITY
                    </NavLink>
            }
            <NavLink
                to={path+'/posts'}
                style={styles.tab}
                activeStyle={styles.activeTab} >
                POSTS
            </NavLink>
            <NavLink
                to={path+'/followers'}
                style={styles.tab}
                activeStyle={styles.activeTab} >
                FOLLOWERS
            </NavLink>
            <NavLink
                to={path+'/followin'}
                style={styles.tab}
                activeStyle={styles.activeTab} >
                FOLLOWIN
            </NavLink>
        </div>
    )
}

AuthorTabs.propTypes = {
    path: PropTypes.string.isRequired,
    showActivity: PropTypes.bool.isRequired
}

export default AuthorTabs