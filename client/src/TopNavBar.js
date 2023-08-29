import { useState } from "react";
import { Collapse, Nav, NavItem, NavLink, Navbar, NavbarBrand, NavbarToggler } from "reactstrap"

export const TopNavBar = () => {
    const [collapsed, setCollapsed] = useState(true);

    const toggleNavbar = () => setCollapsed(!collapsed);
    
    return (
        <Navbar color="light" expand="md">
            <NavbarBrand href="/" className="me-auto">🐕‍🦺 🐩 DeShawn's Dog Walking</NavbarBrand>
            <NavbarToggler onClick={toggleNavbar} className="me-2" />
            <Collapse isOpen={!collapsed} navbar>
                <Nav navbar>
                    <NavItem>
                        <NavLink href="/">Dogs</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink href="/walkers">Walkers</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink href="/cities">Cities</NavLink>
                    </NavItem>
                </Nav>
            </Collapse>
        </Navbar>
    )
    
}