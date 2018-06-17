import React from 'react';
import PropTypes from 'prop-types';

import Button from '@material-ui/core/Button';
import { grey100 } from '@material-ui/core/colors';
import GridList from '@material-ui/core/GridList';
import CircularProgress from '@material-ui/core/CircularProgress';
import NavigationChevronRightIcon from '@material-ui/icons/ChevronRight';

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
                <Button
                    mini={true}
                    backgroundColor={grey100}>
                    <NavigationChevronRightIcon/>
                </Button>
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