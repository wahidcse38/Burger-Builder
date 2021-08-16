import React from 'react';
import Ingredients from '../Ingredients/Ingredients';
import './Burger.css';

const Burger = (props) => {
    let ingredientArray = props.ingredients.map(item => {
        let amountArr = [...Array(item.amount).keys()]
        return (
            amountArr.map(() => {
                return (
                    <Ingredients type={item.type} key={Math.random()} />
                )
            })
        )
    })
    // console.log(ingredientArray) {//Its return one array consists of 3 array}
    // Combine 3 array into One
    let combineArray = ingredientArray.reduce((arr, element) => {
        return arr.concat(element)
    }, [])

    // console.log(combineArray)

    if (combineArray.length === 0) {
        ingredientArray = <p>Please add some Ingredients</p>
    }
    return (
        <div className="Burger">
            <Ingredients type="bread-top" />
            {ingredientArray}
            <Ingredients type="bread-bottom" />
        </div>
    )
}
export default Burger;