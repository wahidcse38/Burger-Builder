import React from 'react';
import Header from './Header/Header';
import BurgerBuilder from './BurgerBuilder/BurgerBuilder';
import Orders from './Orders/Orders';
import Checkout from './Orders/Checkout/Checkout';
import Login from './Autentication/Login';
import Logout from './Autentication/Logout/Logout';

import { Route, Switch, Redirect } from 'react-router-dom';

import { connect } from 'react-redux';
import { authCheck } from '../Redux/ActionCreators';
import { Component } from 'react';

const mapStateToProps = state => {
    return {
        token: state.token
    }
}

const mapDispatchToProps = dispatch => {
    return {
        authCheck: () => dispatch(authCheck()),
    }
}

class Main extends Component {
    componentDidMount() {
        this.props.authCheck()
    }
    render() {
        let routes = null;
        if (this.props.token === null) {
            routes = (
                <Switch>
                    <Route path="/login" component={Login} />
                    <Redirect to="/login" />
                </Switch>
            )
        } else {
            routes = (
                <Switch>
                    <Route path="/orders" component={Orders} />
                    <Route path="/checkout" component={Checkout} />
                    <Route path="/logout" component={Logout} />
                    <Route path="/" exact component={BurgerBuilder} />
                    <Redirect to="/" />
                </Switch>
            )
        }
        return (
            <div >
                <Header />
                <div className="container">
                    {routes}
                </div>
            </div>
        )
    }

}
export default connect(mapStateToProps, mapDispatchToProps)(Main);