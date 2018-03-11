import React from 'react';
import PropTypes from 'prop-types';
import { GridList } from 'material-ui/GridList';
import CircularProgress from 'material-ui/CircularProgress';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import NavigationChevronRightIcon from 'material-ui/svg-icons/navigation/chevron-right';
import { grey100 } from 'material-ui/styles/colors';

import AuthorPreviewItem from './AuthorPreviewItem';

const AuthorsPreviewList = ({ authors, isNightMode, isAuthenticated, createSubscription, removeSubscription }) => {
    const styles = {
        container: {
            whiteSpace: 'nowrap',
            overflow: 'hidden'
        },
        gridList: {
            flexWrap: 'no-wrap',
            alignItems: 'center'
        },
        showMore: {
            background: isNightMode ?
                `linear-gradient(to left, rgb(48, 48, 48), rgba(48, 48, 48, 0.02))` :
                `linear-gradient(to left, ${grey100}, rgba(245, 245, 245, 0.3))`,
            right: '0px',
            display: 'flex',
            justifyContent: 'flex-end',
            alignItems: 'center',
            paddingRight: '5px',
            position: 'absolute',
            top: 0,
            bottom: 0,
            width: '150px'
        },
        loader: {
            textAlign: 'center',
            display: 'block',
            width: '100%'
        }
    }

    return (
        <div className='container' style={styles.container}>
            {
                authors.length === 0 ?
                    <CircularProgress style={styles.loader} /> :
                    <GridList
                        style={styles.gridList}
                        cellHeight={190}
                        cols={6}
                        padding={12}>
                        {
                            authors.map((author, index) => (
                                <AuthorPreviewItem
                                    key={author.user_id}
                                    author={author}
                                    isSubscriptionAllowed={isAuthenticated}
                                    removeSubscription={removeSubscription}
                                    createSubscription={createSubscription}
                                />
                            ))
                        }
                    </GridList>
            }
            <div style={styles.showMore}>
                <FloatingActionButton
                    mini={true}
                    backgroundColor={grey100}>
                    <NavigationChevronRightIcon/>
                </FloatingActionButton>
            </div>
        </div>
    )
}

AuthorsPreviewList.propTypes = {
    isNightMode: PropTypes.bool.isRequired,
    isAuthenticated: PropTypes.bool.isRequired,
    authors: PropTypes.arrayOf(PropTypes.object).isRequired,
    removeSubscription: PropTypes.func.isRequired,
    createSubscription: PropTypes.func.isRequired
}

export default AuthorsPreviewList