import React from 'react';
import ScrollToTop from 'react-scroll-up';
import NavidationArrowUpwardIcon from 'material-ui/svg-icons/navigation/arrow-upward';
import IconButton from 'material-ui/IconButton';

const styles = {
    optionsRightPanel: {
        position: 'fixed',
        marginLeft: '3em',
        display: 'flex',
        flexDirection: 'column',
    },
    backToTop: {
        position: 'static'
    }
}

const ListRightPanel = () => {
    return (
        <span style={styles.optionsRightPanel} >
            <ScrollToTop
                showUnder={460}
                style={styles.backToTop}>
                <IconButton>
                    <NavidationArrowUpwardIcon />
                </IconButton>
            </ScrollToTop>
        </span>
    )
}

export default ListRightPanel