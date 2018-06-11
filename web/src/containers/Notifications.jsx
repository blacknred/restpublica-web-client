import React, { Component } from 'react';

const styles = {
    container: {
        display: 'flex', minHeight: '10vh',
        alignItems: 'center', justifyContent: 'center'
    }
}


class Notifications extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        return (
            <div style={styles.container}>
                Notifications
            </div>
        )
    }

}

export default Notifications;