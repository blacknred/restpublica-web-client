import React from 'react';
import PropTypes from 'prop-types';
import { TransitionGroup } from "react-transition-group";
import classNames from 'classnames';

import Slide from '@material-ui/core/Slide';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    frame: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        width: '100%',
        transition: 'padding-left 300ms',
        padding: `2% 0`,
    },
    left: {
        '@media (min-width: 960px)': {
            paddingLeft: '280px',
        }
    },
})

const Frame = ({ isDrawer, slideKey, isLoading, classes, children }) => {

    return (
        <TransitionGroup className={classNames(classes.frame, isDrawer ? classes.left : null)}>
            <Slide
                component={'div'}
                in={!isLoading}
                key={slideKey}
                direction='up'
                timeout={{ enter: 500, exit: 150 }}
            // mountOnEnter
            // unmountOnExit
            // transitionEnter={false}
            // transitionLeave={true}
            // transitionAppear={true}
            //onEnter={(e) => e.style.opacity = 0}
            // onExit={(e) => setTimeout(() => e.style.opacity = '0.01', 200)}
            // onEnter={(e) => setTimeout(() => e.style.opacity = 1, 250)}
            //style={{ transitionDelay: isLoading ? 2000 : 0 }}
            //onEntered={(e) => setTimeout(() => e.style.transform = 'none', 800)}
            >
                {children}
            </Slide>
        </TransitionGroup>
    )
}

Frame.propTypes = {
    isDrawer: PropTypes.bool.isRequired,
    slideKey: PropTypes.string,
    isLoading: PropTypes.bool.isRequired,
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Frame)
