import React, { PureComponent } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import { logout } from '../../../Redux/ActionCreators'

const mapDispatchToProps = dispatch => {
    return {
        logout: () => dispatch(logout())
    }
}

class Logout extends PureComponent {
    componentDidMount() {
        this.props.logout();
    }
    render() {
        return (
            <div>
                <Redirect to="/" />
            </div>
        )
    }
}

export default connect(null, mapDispatchToProps)(Logout);