import { Table, Button, ListGroup, Card, Container, Row, Col, Form } from 'react-bootstrap'; // Importing necessary components from react-bootstrap
import React, { useState, useEffect } from 'react'; // Importing React and hooks
import axios from 'axios'; // Importing axios for API calls
import { Link, useLocation, useParams } from 'react-router-dom'; // Importing Link for navigation and URL handling

function Home() {
    // State to manage products, suppliers, selected supplier filters, and cart
    const [listProducts, setListProducts] = useState([]); // State to store list of products
    const [listSuppliers, setListSuppliers] = useState([]); // State to store list of suppliers
    const [listOption, setListOption] = useState([]); // State to manage selected suppliers for filtering products
    const [Cart, setCart] = useState([]); // State to manage cart items

    useEffect(() => {
        // Fetch products and suppliers, filter products if suppliers are selected
        const fetchData = async () => {
            try {
                const responseP = await axios.get("http://localhost:9999/products"); // Fetch products from API
                
                // Filter products based on selected suppliers
                if (listOption.length > 0) {
                    setListProducts(responseP.data.filter(p => listOption.includes(p.supplier))); // Set filtered products based on supplier
                } else {
                    setListProducts(responseP.data); // Set all products if no suppliers are selected
                }

                const responseS = await axios.get("http://localhost:9999/suppliers"); // Fetch suppliers from API
                setListSuppliers(responseS.data); // Set list of suppliers
            } catch (error) {
                console.error("Error fetching data:", error); // Log error if fetching fails
            }
        };
        fetchData(); // Call the fetchData function
    }, [listOption]); // Re-fetch when selected supplier list changes

    const handleAddtoCart = (e) => {
        // Add selected product to cart
        const productId = parseInt(e.target.value); // Get the product ID from the button's value
        const product = listProducts.find(p => p.id === productId); // Find the product in the list
        setCart([...Cart, product]); // Add the product to the cart state
    }

    const handleChangeCheckbox = (e) => {
        // Update selected suppliers based on checkbox state
        const { value, checked } = e.target; // Get the checkbox value and checked state
        if (checked) {
            setListOption([...listOption, parseInt(value)]); // Add supplier ID to listOption if checked
        } else {
            const updatedList = listOption.filter(o => o !== parseInt(value)); // Remove supplier ID from listOption if unchecked
            setListOption(updatedList); // Update state with new list of selected suppliers
        }
    };

    return (
        <Container>
            <Row>
                <Col><h1 className='text-center'>ABC SHOP</h1></Col> {/* Shop title */}
            </Row>
            <Row>
                {/* Display list of suppliers with checkboxes for filtering */}
                <Col xs={3} className="d-none d-sm-block">
                    <h2>List Suppliers</h2>
                    {listSuppliers.map(s => ( // Map through suppliers and create a checkbox for each
                        <Form.Check
                            key={s.id}
                            type='checkbox'
                            label={s.name} // Display supplier name
                            onChange={handleChangeCheckbox} // Handle checkbox change
                            value={s.id} // Set the value to supplier ID
                        />
                    ))}
                </Col>
                <Col>
                    {/* Link to Cart page */}
                    <Row>
                        <Link to={`/cart`} className='text-end'>
                            <b>Cart []</b> {/* Display cart link */}
                        </Link>
                    </Row>
                    <Row>
                        {/* Display filtered list of products with details */}
                        {listProducts.map(p => ( // Map through filtered products
                            <Col xs={3} className='mt-2' key={p.id}>
                                <Card>
                                    <Card.Img style={{ height: "150px" }} variant="top" src={`assets/images/${p.images[0]?.name}`} /> {/* Display product image */}
                                    <Card.Body>
                                        <Card.Title>{p.name}</Card.Title> {/* Display product name */}
                                        <Card.Text>
                                            <hr />
                                            Price: {p.price.toLocaleString('it-IT', { style: 'currency', currency: 'VND' })} {/* Display product price in VND */}
                                            <hr />
                                            Supplier: {listSuppliers.filter(s => s.id === p.supplier).map(s => s.name)} {/* Display product supplier's name */}
                                            <hr />
                                            Status: {p.status ? ( // Display product stock status
                                                <span style={{ color: "green" }}>In stock</span> // Green text for in stock
                                            ) : (
                                                <span style={{ color: "red" }}>Out of stock</span> // Red text for out of stock
                                            )}
                                        </Card.Text>
                                        <Link to={`/product/${p.id}`}> {/* Link to product details page */}
                                            <Button variant="danger" className='mx-1'>Details</Button> {/* Button to view product details */}
                                        </Link>
                                        {/* Add to Cart button */}
                                        <Button variant="success" onClick={handleAddtoCart} value={p.id}>Add to Cart</Button> {/* Button to add product to cart */}
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                </Col>
            </Row>
        </Container>
    );
}

export default Home; // Exporting the Home component for use in other files
