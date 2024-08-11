import { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { NavLink } from 'react-router-dom';
import { useStore } from '../stores/store';
import { NavDropdown } from 'react-bootstrap';
import { observer } from 'mobx-react-lite';

function NavBar() {
    const { userStore: { user, logout } } = useStore()
    return (
        <Navbar expand="lg" className="bg-body-tertiary">

            <Container>
                <Navbar.Brand >
                    <NavLink className="btn btn-outline" to='/' >Project</NavLink>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <NavLink className="btn btn-success mx-4" to='/activities'>Activities</NavLink>
                        <NavLink className="btn btn-success mx-4" to='/createActivity'>Create Activity</NavLink>
                        <NavLink className="btn btn-success" to='/error'>Error</NavLink>
                        {/* <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                            <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.2">
                                Another action
                            </NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="#action/3.4">
                                Separated link
                            </NavDropdown.Item>
                        </NavDropdown> */}
                    </Nav>
                </Navbar.Collapse>
                <NavDropdown title={`${user?.username ?? 'user'}`}>
                    <NavDropdown.Item href={`profile${user?.username}`}>My Profile</NavDropdown.Item>
                    <NavDropdown.Item onClick={logout}>logout</NavDropdown.Item>
                </NavDropdown>

            </Container>
        </Navbar>
    );
}

export default observer(NavBar);