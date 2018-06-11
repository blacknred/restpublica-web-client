import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import List from '@material-ui/core/List';
import Card from '@material-ui/core/Card';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import ListItem from '@material-ui/core/ListItem';
import GridList from '@material-ui/core/GridList';
import CardMedia from '@material-ui/core/CardMedia';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import ListItemText from '@material-ui/core/ListItemText';
import GridListTile from '@material-ui/core/GridListTile';
import ListSubheader from '@material-ui/core/ListSubheader';

const styles = {
    root: {
        maxWidth: '1000px',
        margin: '0 auto',
        '& a': {
            textDecoration: 'none'
        }
    },
    content: {
        alignItems: 'flex-start'
    },
    avatar: {
        height: '5em',
        width: '5em'
    },
    text: {
        maxWidth: '76%'
    },

    subheader: {
        display: 'flex',
        justifyContent: 'space-between'
    },
    communitiesAvatar: {
        width: '230px',
        height: '150px'
    },
    communitiesText: {
        height: '85px'
    }
}

const CommunityContent = () => {
    return (
        <List></List>
    )
}

CommunityContent.propTypes = {}

export default withStyles(styles)(CommunityContent);