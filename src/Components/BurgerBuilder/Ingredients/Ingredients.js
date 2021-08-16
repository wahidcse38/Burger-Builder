import React from 'react';
import BreadTop from '../../../assets/images/top.png';
import BreadBottom from '../../../assets/images/bottom.png';
import Cheese from '../../../assets/images/cheese.png';
import Meat from '../../../assets/images/meat.png';
import Salad from '../../../assets/images/salad.png';
import './Ingredients.css';

const Ingredients = (props) => {
    let ingredient = null;
    switch (props.type) {
        case "bread-top":
            ingredient = <div><img src={BreadTop} alt="bread-top" /></div>
            break;
        case "bread-bottom":
            ingredient = <div><img src={BreadBottom} alt="bread-bottom" /></div>
            break;
        case "meat":
            ingredient = <div><img src={Meat} alt="meat" /></div>
            break;
        case "cheese":
            ingredient = <div><img src={Cheese} alt="cheese" /></div>
            break;
        case "salad":
            ingredient = <div><img src={Salad} alt="salad" /></div>
            break;
        default:
            ingredient = null;
    }
    return (
        <div className="Ingredients">
            {ingredient}
        </div>
    )
}
export default Ingredients;