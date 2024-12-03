import { Table, Button, ListGroup, Card, Container, Row, Col, Form } from 'react-bootstrap'; // Importing necessary components from react-bootstrap
import React, { useState, useEffect } from 'react'; // Importing React and hooks
import axios from 'axios'; // Importing axios for API calls
import { Link, useParams } from 'react-router-dom'; // Importing Link for navigation and useParams to extract URL parameters

const Product = () => {
    // Extract product id from URL params
    const { id } = useParams(); // Getting the product ID from the URL

    // State to store product data and list of suppliers
    const [product, setProduct] = useState({}); // State to hold product details
    const [listSuppliers, setListSuppliers] = useState([]); // State to hold list of suppliers

    useEffect(() => {
        // Fetch product details and list of suppliers from the server
        const fetchData = async () => {
            const responseP = await axios.get(`http://localhost:9999/products/${id}`); // Fetching product details using the product ID
            setProduct(responseP.data); // Storing product data in state

            const responseS = await axios.get(`http://localhost:9999/suppliers`); // Fetching the list of suppliers
            setListSuppliers(responseS.data); // Storing suppliers in state
        };
        fetchData(); // Call the fetchData function to retrieve data
    }, [id]);  // Re-run when product ID changes

    return (
        <Container>
            <Row>
                <Col>
                    <h1 className='text-center'>Product Details</h1> {/* Header for product details */}
                </Col>
            </Row>
            <Row>
                {/* Link to navigate back to the Home page */}
                <Col>
                    <Link to={`/`}> {/* Link to Home page */}
                        <Button variant="success">Go to Home</Button> {/* Button to go back to Home */}
                    </Link>
                </Col>
            </Row>
            <Row>
                {/* Display product name */}
                <Col>
                    <h2>{product.name}</h2> {/* Product name displayed here */}
                </Col>
            </Row>
            <Row>
                <Col xs={5}>
                    {/* Display main product image and thumbnail images if available */}
                    {product.images && product.images.length > 0 ? ( // Check if product has images
                        <>
                            <Card>
                                <Card.Img src={`/assets/images/${product.images[0].name}`} /> {/* Display the first image */}
                            </Card>
                            <hr />
                            <Row>
                                {product.images.map((img) => ( // Map through thumbnail images
                                    <Col key={img.name}>
                                        <Card.Img
                                            src={`/assets/images/${img.name}`} // Display thumbnail image
                                            style={{ width: "5rem", border: "1px solid transparent" }} // Styling thumbnail images
                                            onMouseOver={(e) => e.currentTarget.style.border = "2px solid red"}  // Highlight on hover
                                            onMouseOut={(e) => e.currentTarget.style.border = "1px solid transparent"}  // Reset border on mouse out
                                        />
                                    </Col>
                                ))}
                            </Row>
                            <hr />
                        </>
                    ) : ""} {/* If no images, display nothing */}
                </Col>
                <Col>
                    {/* Display product price, supplier, and stock status */}
                    <h5>Price: {product?.price?.toLocaleString('it-IT', { style: 'currency', currency: 'VND' })}</h5> {/* Display product price in VND */}
                    <h5>Supplier: {listSuppliers?.filter(s => s?.id == product.supplier).map(s => s?.name)}</h5> {/* Display supplier name corresponding to the product */}
                    <h5>Status: {product?.status ? <span style={{ color: "green" }}>In stock</span> : <span style={{ color: "red" }}>Out of stock</span>}</h5> {/* Display stock status */}
                </Col>
            </Row>
        </Container>
    );
}

export default Product; // Exporting the Product component for use in other files
