import * as actionType from './ActionTypes';

const ingredientsPrice = {
    salad: 20,
    cheese: 30,
    meat: 50
}
const Initial_State = {
    ingredients: [
        { type: "salad", amount: 0 },
        { type: "cheese", amount: 0 },
        { type: "meat", amount: 0 },
    ],
    totalPrice: 80,
    purchasable: false,
    orders: [],
    orderLoading: true,
    orderErr: false,
}
export const Reducers = (state = Initial_State, action) => {
    const ingredientsCopy = [...state.ingredients];
    switch (action.type) {
        case actionType.ADD_INGREDIENT:
            for (let item of ingredientsCopy) {
                if (item.type === action.payload) {
                    item.amount++;
                }
            }
            return {
                ...state,
                ingredients: ingredientsCopy,
                totalPrice: state.totalPrice + ingredientsPrice[action.payload]
            }
        case actionType.REMOVE_INGREDIENT:
            for (let item of ingredientsCopy) {
                if (item.type === action.payload) {
                    if (item.amount <= 0)
                        return state;
                    item.amount--;
                }
            }
            return {
                ...state,
                ingredients: ingredientsCopy,
                totalPrice: state.totalPrice - ingredientsPrice[action.payload]
            }
        case actionType.UPDATE_PURCHASABLE:
            const sum = state.ingredients.reduce((sum, element) => {
                return sum + element.amount;
            }, 0)
            return {
                ...state,
                purchasable: sum > 0
            }
        case actionType.RESET_INGREDIENT:
            return {
                ...state,
                ingredients: [
                    { type: "salad", amount: 0 },
                    { type: "cheese", amount: 0 },
                    { type: "meat", amount: 0 },
                ],
                totalPrice: 80,
                purchasable: false,
            }
        case actionType.LOAD_ORDERS:
            let orders = [];
            for (let key in action.payload) {
                orders.push({
                    ...action.payload[key],
                    id: key,
                })
            }
            //console.log(orders);
            return {
                ...state,
                orders: orders,
                orderLoading: false,
            }
        case actionType.LOAD_ORDERS_FAILED:
            return {
                ...state,
                orderErr: true,
                orderLoading: false,
            }
        default:
            return state;
    }
}
