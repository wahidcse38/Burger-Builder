import React from 'react';
import { Component } from 'react';
import { Formik } from 'formik';
import { Alert } from 'reactstrap';
import '../Orders/SingleOrder/SingleOrder.css'
import './Login.css';

import { connect } from 'react-redux';
import { auth } from '../../Redux/ActionCreators';

import Spinner from '../Spinner/Spinner';

const mapDispatchToProps = (dispatch) => {
    return {
        auth: (email, password, mode) => dispatch(auth(email, password, mode))
    }
}

const mapStateToProps = state => {
    return {
        authLoading: state.authLoading,
        authFailedMsg: state.authFailedMsg,
    }
}

class Login extends Component {
    state = {
        mode: "Sign Up",
    }

    switchModeHandler = () => {
        this.setState({
            mode: this.state.mode === "Sign Up" ? "Login" : "Sign Up",
        })
    }

    render() {
        let errMsg = null;
        if (this.props.authFailedMsg !== null) {
            errMsg = <Alert className="text-danger text-center">{this.props.authFailedMsg}</Alert>
        }

        let form = null;
        if (this.props.authLoading) {
            form = <Spinner />
        }
        else {
            form = (
                <Formik
                    initialValues={{
                        email: "",
                        password: "",
                        confirmPassword: "",
                    }}
                    onSubmit={
                        (values) => {
                            this.props.auth(values.email, values.password, this.state.mode)
                        }
                    }
                    validate={(values) => {
                        const errors = {};

                        if (!values.email) {
                            errors.email = "Required";
                        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                            errors.email = "Invalid Email";
                        }

                        if (!values.password) {
                            errors.password = "Required";
                        } else if (values.password.length < 6) {
                            errors.password = "Must be atleast 6 caracters";
                        }

                        if (this.state.mode === "Sign Up") {
                            if (!values.confirmPassword) {
                                errors.confirmPassword = "Required";
                            } else if (values.confirmPassword !== values.password) {
                                errors.confirmPassword = "Password doesn't match"
                            }
                        }

                        //console.log("Errors :", errors)
                        return errors;
                    }} >

                    {({ values, handleChange, handleSubmit, errors }) => (
                        <div className="order">
                            <button className="switchBtn " onClick={this.switchModeHandler} >Switch to {this.state.mode === "Sign Up" ? "Login" : "Sign Up"}</button>
                            <form onSubmit={handleSubmit} >
                                <input
                                    name="email"
                                    placeholder="Enter your email"
                                    className="form-control"
                                    value={values.email}
                                    onChange={handleChange} />
                                <span className="text-danger">{errors.email}</span>
                                <br />
                                <input
                                    name="password"
                                    placeholder="Enter your password"
                                    className="form-control"
                                    value={values.password}
                                    onChange={handleChange} />
                                <span className="text-danger">{errors.password}</span>
                                <br />
                                {this.state.mode === "Sign Up" ? <div>
                                    <input
                                        name="confirmPassword"
                                        placeholder="Confirm password"
                                        className="form-control"
                                        value={values.confirmPassword}
                                        onChange={handleChange} />
                                    <span className="text-danger">{errors.confirmPassword}</span>
                                    <br />
                                </div> : null}

                                <button type="submit" className="btn btn-success d-grid gap-2 col-6 mx-auto my-3">{this.state.mode === "Sign Up" ? "Sign Up" : "Login"}</button>
                            </form>
                        </div>
                    )}
                </Formik>
            )
        }
        return (
            <div>
                {errMsg}
                {form}
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);