import React from 'react';
import './SingleOrder.css';

const SingleOrder = (props) => {
    //console.log(props);
    const ingreSummary = props.order.ingredients.map(item => {
        return (
            <span className="order2" key={item.type}>{item.type}: <span>{item.amount}</span></span>
        )
    })
    return (
        <div className="order">
            <p>Order Number : {props.order.id}</p>
            <p>Delivery Address : {props.order.customer.deliveryAddress} </p>
            <p>Phone : {props.order.customer.phone}</p>
            <hr />
            {ingreSummary}
            <hr />
            <p>Price : <strong>{props.order.price}</strong> TK </p>
            <p>Payment Type : {props.order.customer.paymentType} </p>
        </div>
    )
}
export default SingleOrder