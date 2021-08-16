import React from 'react'
import { Component } from 'react'
import { Button, Modal, ModalBody } from 'reactstrap';
import { connect } from 'react-redux';
import './Checkout.css';
import Spinner from '../../Spinner/Spinner';
import { resetIngredients } from '../../../Redux/ActionCreators';

import axios from 'axios';

const mapStateToProps = (state) => {
    return {
        ingredients: state.ingredients,
        totalPrice: state.totalPrice,
        purchasable: state.purchasable
    }
}
const mapDispatchToProps = dispatch => {
    return {
        resetIngredients: () => dispatch(resetIngredients())
    }
}

class Checkout extends Component {

    state = {
        values: {
            deliveryAddress: "",
            phone: "",
            paymentType: "Cash on delivery"
        },
        isLoading: false,
        isModalOpen: false,
        modalMsg: "",
        msgColor: "",
    }

    goBack = () => {
        this.props.history.goBack("/");
    }

    inputChangeHandler = (event) => {
        this.setState({
            values: {
                ...this.state.values,
                [event.target.name]: event.target.value
            }
        })
    }

    submitHandler = () => {
        this.setState({
            isLoading: true
        })
        const order = {
            ingredients: this.props.ingredients,
            customer: this.state.values,
            price: this.props.totalPrice,
            orderTime: new Date()
        }
        axios.post("https://burger-builder-b93bc-default-rtdb.firebaseio.com/order.json", order)
            .then(response => {
                if (response.status === 200) {
                    this.setState({
                        isLoading: false,
                        isModalOpen: true,
                        modalMsg: "Order placed successfully!",
                        msgColor: "text-success",
                    })
                    this.props.resetIngredients()
                }
                else {
                    this.setState({
                        isLoading: false,
                        isModalOpen: true,
                        modalMsg: "Something went wrong! Please order again!",
                        msgColor: "text-danger",
                    })
                }
            })
            .catch(error => {
                this.setState({
                    isLoading: false,
                    isModalOpen: true,
                    modalMsg: "Something went wrong! Please order again!",
                    msgColor: "text-danger",
                })
            })
        //console.log(order)
    }

    render() {
        let showCheckoutForm = (
            <div>
                <h4 className="Payment">Payment : {this.props.totalPrice} BDT</h4>
                <form style={{
                    border: "1px solid grey",
                    boxShadow: "1px 1px #888888",
                    borderRadius: "5px",
                    padding: "20px"
                }}>
                    <textarea
                        name="deliveryAddress"
                        placeholder="Your Address"
                        className="form-control"
                        value={this.state.values.deliveryAddress}
                        onChange={(event) => this.inputChangeHandler(event)}
                    />
                    <br />
                    <input
                        name="phone"
                        placeholder="Your phone number"
                        className="form-control"
                        value={this.state.values.phone}
                        onChange={(event) => this.inputChangeHandler(event)}
                    />
                    <br />
                    <select
                        name="paymentType"
                        className="form-control"
                        value={this.state.values.paymentType}
                        onChange={(event) => this.inputChangeHandler(event)}
                    >
                        <option value="Cash on delivery">Cash on delivery</option>
                        <option value="Bkash">Bkash</option>
                    </select>
                    <br />
                    <Button className="btn me-auto text-light" style={{ backgroundColor: "#d70f64" }} onClick={this.submitHandler} disabled={!this.props.purchasable}>Place Order</Button>

                    <Button className="btn btn-secondary ms-3" onClick={this.goBack}>Cancle</Button>
                </form>
            </div>
        )
        return (
            <div className="container">
                {this.state.isLoading ? <Spinner /> : showCheckoutForm}
                <Modal isOpen={this.state.isModalOpen} onClick={this.goBack} >
                    <ModalBody className="text-center">
                        <p className={this.state.msgColor}>{this.state.modalMsg}</p>
                    </ModalBody>
                </Modal>
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);
