import { Table, Button, ListGroup, Card, Container, Row, Col, Form } from 'react-bootstrap'; // Importing necessary components from react-bootstrap
import React from 'react'; // Importing React
import { Link } from 'react-router-dom'; // Importing Link for navigation

function Header() {
    return (
        <Container fluid> {/* Container that takes the full width of the viewport */}
            {/* Displays the main header title */}
            <Row className='mt-2'>
                <Col className='text-center'> {/* Centered column for the header title */}
                    <h1>Student Management</h1> {/* Main title of the header */}
                </Col>
            </Row>

            {/* Adds a centered search input field */}
            <Row className='mt-2'>
                <Col></Col> {/* Empty column for spacing */}
                <Col xs={8} className='text-center'> {/* Centered column for the search input */}
                    <Form.Control type="text" placeholder='Enter name student ..'></Form.Control> {/* Search input field for student names */}
                </Col>
                <Col></Col> {/* Empty column for spacing */}
            </Row>
        </Container>
    )
}

export default Header; // Exporting the Header component for use in other files
