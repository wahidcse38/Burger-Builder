import React, { useState } from 'react';
import { Nav, Navbar, NavbarBrand, NavItem, Collapse, NavbarToggler } from 'reactstrap';
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
    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => setIsOpen(!isOpen);

    let links = null;
    if (props.token === null) {
        links = (
            <Nav className="ms-auto" navbar style={{ padding: "0 10px" }} >
                <NavItem>
                    <NavLink exact to="/login" className="Navlink">Login</NavLink>
                </NavItem>
            </Nav>
        )
    } else {
        links = (
            <Nav className="ms-auto" navbar style={{ padding: "0 5px" }}>

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
            <Navbar light expand="md" style={{
                backgroundColor: "#d70f64",
                padding: "0"
            }} >
                <div className="container">
                    <NavbarBrand href="/" className="me-auto Brand">
                        <img src={Logo} alt="Logo" width="80px" />
                    </NavbarBrand>

                    <NavbarToggler onClick={toggle} />
                    <Collapse isOpen={isOpen} navbar>
                        {links}
                    </Collapse>
                </div>
            </Navbar>
        </div>
    )
}
export default connect(mapStateToProps)(Header);