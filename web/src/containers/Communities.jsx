import React, { Component } from 'react';

const styles = {
    container: {
        display: 'flex', minHeight: '10vh',
        alignItems: 'center', justifyContent: 'center'
    }
}


class Communities extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        return (
            <div style={styles.container}>
                Communities
            </div>
        )
    }

}

export default Communities;