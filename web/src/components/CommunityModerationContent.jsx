import React from 'react';
import PropTypes from 'prop-types';

import Typography from '@material-ui/core/Typography';

const styles = theme => ({})

const CommunityModerationContent = ({ classes }) =>
    <Typography>
        Moderation
    </Typography>

CommunityModerationContent.propTypes = {}

export default withStyles(styles)(CommunityModerationContent)