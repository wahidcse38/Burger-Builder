
import * as actionType from './ActionTypes';
import axios from 'axios';


export const addIngredient = (ingredientType) => {
    return {
        type: actionType.ADD_INGREDIENT,
        payload: ingredientType
    }
}

export const removeIngredient = (ingredientType) => {
    return {
        type: actionType.REMOVE_INGREDIENT,
        payload: ingredientType
    }
}

export const updatePurchasable = () => {
    return {
        type: actionType.UPDATE_PURCHASABLE,
    }
}
export const resetIngredients = () => {
    return {
        type: actionType.RESET_INGREDIENT
    }
}

const loadOrders = (orders) => {
    return {
        type: actionType.LOAD_ORDERS,
        payload: orders,
    }
}
const loadOrdersFailed = () => {
    return {
        type: actionType.LOAD_ORDERS_FAILED
    }
}

export const fetchOrders = () => dispatch => {
    axios.get("https://burger-builder-b93bc-default-rtdb.firebaseio.com/order.json")
        .then(response => {
            dispatch(loadOrders(response.data))
        })
        .catch(err => {
            dispatch(loadOrdersFailed())
        })
}