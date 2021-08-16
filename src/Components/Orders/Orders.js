import React from 'react'
import { Component } from 'react';
import { connect } from 'react-redux';
import { fetchOrders } from '../../Redux/ActionCreators';
import SingleOrder from './SingleOrder/SingleOrder';
import Spinner from '../Spinner/Spinner';
import './SingleOrder/SingleOrder.css'


const mapStateToProps = state => {
    return {
        orders: state.orders,
        orderLoading: state.orderLoading,
        orderErr: state.orderErr,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchOrders: () => dispatch(fetchOrders()),
    }
}

class Orders extends Component {
    componentDidMount() {
        this.props.fetchOrders()
    }
    componentDidUpdate() {
        //console.log(this.props);
    }
    render() {
        let orders = null;
        if (this.props.orderErr) {
            orders = <p className="order text-danger text-center">Sorry failed to load orders!</p>
        }
        else {
            if (this.props.orders.length === 0) {
                orders = <p className="order text-primary text-center">You have no orders!</p>
            }
            else {
                orders = this.props.orders.map(order => {
                    return (
                        <SingleOrder order={order} key={order.id} />
                    )
                })
            }
        }

        return (
            <div>
                {this.props.orderLoading ? <Spinner /> : orders}
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Orders);
