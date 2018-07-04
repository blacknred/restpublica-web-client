import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
    root: {}
})

const CommunityModerationContent = ({ classes }) =>
    <Typography
        variant='title'
        paragraph
        className={classes.root}
    >
        Moderation in dev
    </Typography>

CommunityModerationContent.propTypes = {
    classes: PropTypes.object.isRequired
}

export default withStyles(styles)(CommunityModerationContent)