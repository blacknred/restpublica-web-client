import React from 'react';
import ScrollToTop from 'react-scroll-up';
import NavidationArrowUpwardIcon from 'material-ui/svg-icons/navigation/arrow-upward';
import IconButton from 'material-ui/IconButton';

const styles = {
    optionsRightPanel: {
        position: 'fixed', display: 'flex', flexDirection: 'column',
        transition: 'right 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms'
    },
    backToTop: { position: 'static' }
}

const ListRightPanel = () => {
    return (
        <div style={styles.optionsRightPanel} >
            <ScrollToTop
                showUnder={460}
                style={styles.backToTop}>
                <IconButton>
                    <NavidationArrowUpwardIcon />
                </IconButton>
            </ScrollToTop>
        </div>
    )
}

export default ListRightPanel