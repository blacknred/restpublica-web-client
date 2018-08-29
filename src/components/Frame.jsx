import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { TransitionGroup, CSSTransition } from "react-transition-group";

import { withStyles } from '@material-ui/core/styles';

const styles = {
    content: {
        position: 'relative',
        transition: 'padding-left 600ms',
        margin: '15px auto',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        '@media (min-width: 960px)': {
            width: '93%'
        },
    },
    left: {
        '@media (min-width: 960px)': {
            paddingLeft: '220px',
        }
    },
    // animation
    cntntEnter: {
        opacity: '0.01',
        transform: 'translate(0px, 300px)',
    },
    cntntEnterActive: {
        opacity: 1,
        transform: 'translate(0px, 0px)',
        transition: 'all 300ms cubic-bezier(0, 0, 0.2, 1) 500ms'
    },
    cntntExit: {
        opacity: 1,
        transform: 'translate(0px, 0px)',
    },
    cntntExitActive: {
        opacity: '0.01',
        transform: 'translate(0px, 300px)',
        transition: 'all 300ms cubic-bezier(0, 0, 0.2, 1) 0ms'
    }
}

const Frame = ({ isDrawer, slideKey, isLoading, classes, children }) => {
    return (
        <TransitionGroup>
            <CSSTransition
                in={!isLoading}
                key={slideKey}
                classNames={{
                    appear: classes.cntntEnter,
                    appearActive: classes.cntntEnterActive,
                    enter: classes.cntntEnter,
                    enterActive: classes.cntntEnterActive,
                    exit: classes.cntntExit,
                    exitActive: classes.cntntExitActive,
                }}
                timeout={{ enter: 800, exit: 300 }}
                onEntered={() => {
                    document.body.scrollTop = 0; // For Safari
                    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
                }}
                unmountOnExit
                mountOnEnter
            >
                <div className={classNames(classes.content, isDrawer ? classes.left : null)}>
                    {children}
                </div>
            </CSSTransition>
        </TransitionGroup >
    )
}

Frame.propTypes = {
    isDrawer: PropTypes.bool.isRequired,
    slideKey: PropTypes.string,
    isLoading: PropTypes.bool.isRequired,
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Frame)
