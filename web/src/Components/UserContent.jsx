import React from 'react';
import PropTypes from 'prop-types';
import { Route, Switch, Redirect } from 'react-router-dom';

import Activity from '../containers/Activity';
import Posts from './Posts';
import Subscriptions from './Subscriptions';

const UserContent = ({ name, id, isMine, createSubscription, removeSubscription }) => {
    const basePath = isMine ? `/me/` : `/u/${name}/`
    return (
        <Switch>
            {
                isMine ? null :
                    <Route path={`${basePath}activity`} component={Activity} />
            }
            <Route path={`${basePath}posts`} component={Posts} />
            {
                !isAuthenticated ? null :
                    <Route path={`${basePath}:mode(followers|followin)`} render={({ match }) => (
                        <Subscriptions
                            key={match.params.mode}
                            mode={match.params.mode}
                            userId={id}
                            createSubscription={createSubscription}
                            removeSubscription={removeSubscription}
                        />
                    )} />
            }
            <Route render={() => (<Redirect to={`${basePath}posts`} />)} />
        </Switch>
    )
}

UserContent.propTypes = {
    name: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    isMine: PropTypes.bool.isRequired,
    removeSubscription: PropTypes.func.isRequired,
    createSubscription: PropTypes.func.isRequired
}

export default UserContent