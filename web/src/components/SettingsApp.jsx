/*eslint-disable no-undef */
import React from 'react';
import Paper from 'material-ui/Paper';

const styles = {
    app: {
        padding: '1em',
        width: '500px'
    },
}
const SettingsApp = () => {
    return (
        <div className='container'>
            <Paper style={styles.app}>
                <br /><br />
                <h4>App settings</h4>
                <br /><br />
            </Paper>
        </div>
    );
}

export default SettingsApp