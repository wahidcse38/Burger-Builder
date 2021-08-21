
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

export const fetchOrders = (token, userId) => dispatch => {
    const query = '&orderBy="userId"&equalTo="' + userId + '"';
    axios.get('https://burger-builder-b93bc-default-rtdb.firebaseio.com/order.json?auth=' + token + query)
        .then(response => {
            dispatch(loadOrders(response.data))
        })
        .catch(err => {
            dispatch(loadOrdersFailed())
        })
}

// Authentication
//Success
export const authSuccess = (token, userId) => {
    return {
        type: actionType.AUTH_SUCCESS,
        payload: {
            token: token,
            userId: userId,
        }
    }
}

// Loading Spinner
export const authLoading = isLoading => {
    return {
        type: actionType.AUTH_LOADING,
        payload: isLoading,
    }
}

//Error Handling
export const authFailed = errMsg => {
    return {
        type: actionType.AUTH_FAILED,
        payload: errMsg,
    }
}

export const auth = (email, password, mode) => {
    return dispatch => {
        dispatch(authLoading(true))
        const authData = {
            email: email,
            password: password,
            returnSecureToken: true,
        }
        let authUrl = null;
        if (mode === "Sign Up") {
            authUrl = "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=";
        } else {
            authUrl = "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key="
        }
        const API_KEY = "AIzaSyBPrI_kCUnikT8dqqmjDrqk5Yfz2QVHWYk";
        axios.post(authUrl + API_KEY, authData)
            .then(response => {
                dispatch(authLoading(false))
                // console.log(response.data)
                localStorage.setItem("token", response.data.idToken);
                localStorage.setItem("userId", response.data.localId);
                const expirationTime = new Date(new Date().getTime() + response.data.expiresIn * 1000);
                localStorage.setItem("expirationTime", expirationTime);
                //console.log(expirationTime);
                dispatch(authSuccess(response.data.idToken, response.data.localId))
            })
            .catch(err => {
                dispatch(authLoading(false))
                //console.log(err.response.data.error.message)
                dispatch(authFailed(err.response.data.error.message))
            })
    }
}

//Automatic Logout
export const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("expirationTime");
    return {
        type: actionType.AUTH_LOGOUT,
    }
}

//Checking Token in Local Storage

export const authCheck = () => {
    return (
        dispatch => {
            const token = localStorage.getItem("token");
            if (!token) {
                //Logout
                dispatch(logout());
            }
            else {
                const expirationTime = new Date(localStorage.getItem("expirationTime"));
                if (expirationTime <= new Date()) {
                    //Logout
                    dispatch(logout());
                }
                else {
                    const userId = localStorage.getItem("userId");
                    dispatch(authSuccess(token, userId));
                }
            }
        }
    )
}