import React, { PureComponent } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux'
import PropTypes from 'prop-types';

const styles = {
    container: {
        display: 'flex',
        minHeight: '10vh',
        alignItems: 'center',
        justifyContent: 'center'
    }
}


class Communities extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        return (
            <span>
                <div>
                    Communities
                </div>
                
            </span>
        )
    }

}

const mapStateToProps = (state, ownProps) => ({
    postable: ownProps.postable || null
})

const mapDispatchToProps = dispatch => ({

})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Communities))