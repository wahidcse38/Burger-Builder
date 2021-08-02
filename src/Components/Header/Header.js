import React from 'react';
import { Nav, Navbar, NavbarBrand, NavLink, NavItem } from 'reactstrap';
import './Header.css';
import Logo from '../../assets/logo.png';

const Header = () => {
    return (
        <div className="Navigation">
            <Navbar style={{
                backgroundColor: "#d70f64",
                height: "70px"
            }}>

                <NavbarBrand href="/" className="mr-auto ml-md-5 Brand">
                    <img src={Logo} alt="Logo" width="80px" />
                </NavbarBrand>
                <Nav className="me-md-5">
                    <NavItem>
                        <NavLink className="Navlink text-light" href="#">Something</NavLink>
                    </NavItem>
                </Nav>
            </Navbar>



            {/* <Navbar style={{ background: "#d70f64", height: "70px" }}>
                <div className="container">
                    <NavbarBrand className="brand" href="/">
                        <img src={Logo} alt="Logo" width="80px" />
                    </NavbarBrand>
                    <Nav className="mr-auto" navbar>
                        <NavItem >
                            <NavLink href="#" color="white" >Something</NavLink>
                        </NavItem>
                    </Nav>
                </div>
            </Navbar> */}
        </div>
    )
}
export default Header;