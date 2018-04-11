import React from 'react';
import FlatButton from 'material-ui/FlatButton';
import SocialSentimentDissatisfiedIcon from 'material-ui/svg-icons/social/sentiment-dissatisfied';

const styles = {
    container: {
        color: '#747474',
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        position: 'fixed',
        left: 0,
        top: '30%',
        right: 0
    },
    icon: {
        width: '7em',
        height: '7em',
        color: 'rgb(228, 228, 228)'
    }
}

const NotFound = () => (
    <div style={styles.container}>
        <SocialSentimentDissatisfiedIcon style={styles.icon} />
        <h1>
            <span>404 Page Not Found</span>
        </h1>
        <p>
            There is something wrong with your url.
        </p>
        <FlatButton
            secondary={true}
            label={<a href='/'>Return Home</a>}
        />
    </div>
)

export default NotFound
