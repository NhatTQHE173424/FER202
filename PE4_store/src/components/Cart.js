import { Table, Button, ListGroup, Card, Container, Row, Col, Form } from 'react-bootstrap';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';

const Cart = () => {
    return (
        <Container>
            <Row>
                <Col>
                    <h1 className='text-center'>ShOPPING CART</h1>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Link to={`/`}>
                        <Button variant="success">Go to Home</Button>
                    </Link>

                </Col>
            </Row>
            <Row>
                <Col>
                    <div className='text-end'>
                        <a href="/">Clear cart</a>
                    </div>

                </Col>
            </Row>
            <Row>
                <Table>

                </Table>
            </Row>

        </Container>
    )
}

export default Cart
