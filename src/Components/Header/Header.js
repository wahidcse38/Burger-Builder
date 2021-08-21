import React from 'react';
import { Nav, Navbar, NavbarBrand, NavItem } from 'reactstrap';
import { NavLink } from 'react-router-dom';
import './Header.css';
import Logo from '../../assets/logo.png';

import { connect } from 'react-redux';

const mapStateToProps = state => {
    return {
        token: state.token
    }
}

const Header = (props) => {
    let links = null;
    if (props.token === null) {
        links = (
            <Nav style={{ padding: "0 30px" }} >
                <NavItem>
                    <NavLink exact to="/login" className="Navlink">Login</NavLink>
                </NavItem>
            </Nav>
        )
    } else {
        links = (
            <Nav style={{ padding: "0 30px" }} >
                <NavItem>
                    <NavLink exact to="/" className="Navlink">Burger-Builder</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink exact to="/orders" className="Navlink">Orders</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink exact to="/logout" className="Navlink">Logout</NavLink>
                </NavItem>
            </Nav>
        )
    }
    return (
        <div className="Navigation">
            <Navbar style={{
                backgroundColor: "#d70f64",
                height: "70px"
            }}>

                <NavbarBrand href="/" className="me-auto ml-md-5 Brand">
                    <img src={Logo} alt="Logo" width="80px" />
                </NavbarBrand>
                {links}
            </Navbar>
        </div>
    )
}
export default connect(mapStateToProps)(Header);