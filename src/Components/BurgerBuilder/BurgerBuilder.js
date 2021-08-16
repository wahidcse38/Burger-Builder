import React, { Component } from 'react';
import Burger from './Burger/Burger';
import Controls from './Controls/Controls';
import { Modal, ModalBody, ModalFooter, ModalHeader, Button } from 'reactstrap';
import Summary from './Summary/Summary';
import { connect } from 'react-redux';
import { addIngredient, removeIngredient, updatePurchasable } from '../../Redux/ActionCreators';

const mapStateToProps = (state) => {
    return {
        ingredients: state.ingredients,
        totalPrice: state.totalPrice,
        purchasable: state.purchasable
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addIngredient: (ingredientType) => dispatch(addIngredient(ingredientType)),
        removeIngredient: (ingredientType) => dispatch(removeIngredient(ingredientType)),
        updatePurchasable: () => dispatch(updatePurchasable())
    }
}

class BurgerBuilder extends Component {
    state = {
        isModalOpen: false,
    }

    // Adding Ingredients
    addIngredientHandle = (type) => {
        this.props.addIngredient(type);
        this.props.updatePurchasable();
    }
    // Removing Ingredients
    removeIngredientHandle = (type) => {
        this.props.removeIngredient(type)
        this.props.updatePurchasable();
    };

    //Modal
    toggleModal = () => {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        })
    }

    // Checkout Component Handler
    handleCheckout = () => {
        this.props.history.push("/checkout")
    }

    // componentDidMount() {
    //     console.log(this.props)
    // }
    render() {
        return (
            <div>
                <div className="d-flex flex-md-row flex-column">
                    <Burger ingredients={this.props.ingredients} />
                    <Controls
                        ingredientsAdded={this.addIngredientHandle}
                        ingredientsRemoved={this.removeIngredientHandle}
                        price={this.props.totalPrice}
                        toggleModal={this.toggleModal}
                        purchasable={this.props.purchasable}
                    />
                </div >
                <Modal isOpen={this.state.isModalOpen} >
                    <ModalHeader>Your Order Summary</ModalHeader>
                    <ModalBody>
                        <h5>Total price : {this.props.totalPrice.toFixed(0)} BDT</h5>
                        <Summary ingredients={this.props.ingredients} />
                    </ModalBody>
                    <ModalFooter>
                        <Button style={{ backgroundColor: "#d70f64" }} onClick={this.handleCheckout}>Continue to Checkout</Button>
                        <Button color="secondary" onClick={this.toggleModal}>Cancel</Button>
                    </ModalFooter>
                </Modal>
            </div>
        )
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(BurgerBuilder);