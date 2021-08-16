import React from 'react';
import { Card, CardBody, CardFooter, CardHeader, Button } from 'reactstrap';

//Controls Array
const controlsArr = [
    { label: "Salad", type: "salad" },
    { label: "Cheese", type: "cheese" },
    { label: "Meat", type: "meat" }
]

const BuildControl = props => {
    return (
        <div className="d-flex">
            <div className="me-auto my-auto ms-5 fw-bold text-secondary fs-5" >{props.label}</div>
            <button className="btn btn-danger btn-sm m-1" onClick={props.removed}>Less</button>
            <button className="btn btn-success btn-sm m-1" onClick={props.added} >More</button>
        </div>
    )
}

const Controls = (props) => {
    return (
        <div className="container ms-md-2 text-center" >
            <Card className="my-2 text-center">
                <CardHeader tag="h2" style={{ backgroundColor: "#d70f64", color: "white" }}>
                    Add Ingredients
                </CardHeader>
                <CardBody>
                    {
                        controlsArr.map(item => {
                            return (
                                <BuildControl
                                    label={item.label}
                                    type={item.type}
                                    key={Math.random()}
                                    added={() => props.ingredientsAdded(item.type)}
                                    removed={() => props.ingredientsRemoved(item.type)}
                                />
                            )
                        })
                    }
                </CardBody>
                <CardFooter tag="h6">
                    Price :<strong>{props.price}</strong> BDT
                </CardFooter>
                <Button style={{ backgroundColor: "#d70f64" }} onClick={props.toggleModal} disabled={!props.purchasable}>Order Now</Button>
            </Card>
        </div>
    )
}
export default Controls;