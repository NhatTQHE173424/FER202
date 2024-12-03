import { Table, Button, ListGroup, Card, Container, Row, Col, Form } from 'react-bootstrap'; // Importing necessary components from react-bootstrap
import React, { useState, useEffect } from 'react'; // Importing React and hooks
import axios from 'axios'; // Importing axios for API calls
import { Link } from 'react-router-dom'; // Importing Link for navigation

const Home = () => {
    // State hooks for managing students, majors, and selected majors for filtering
    const [listStudents, setListStudents] = useState([]); // State to store list of students
    const [listMajors, setListMajors] = useState([]); // State to store list of majors
    const [listOption, setListOption] = useState([]); // State to store selected majors for filtering

    useEffect(() => {
        // Fetches data and sets available majors and student list, filtering by selected majors if applicable
        const fetchData = async () => {
            const responseS = await axios.get("http://localhost:9999/students"); // API call to fetch student data
            setListMajors([...new Set(responseS.data.map(s => s.major))]); // Extract unique majors

            // Filter students based on selected majors in listOption
            if (listOption.length > 0) {
                setListStudents(responseS.data.filter(s => listOption.includes(s.major))); // Set filtered list of students
            } else {
                setListStudents(responseS.data); // Set all students if no filter is applied
            }
        };
        fetchData(); // Call the fetchData function
    }, [listOption]); // Refetch data when listOption changes

    // Handles checkbox toggle to add or remove a major from the selected majors filter
    const handleChangeCheckbox = (e) => {
        const { value, checked } = e.target; // Get the value and checked status of the checkbox
        if (checked) {
            setListOption([...listOption, value]); // Add major to the listOption if checked
        } else {
            const updatedList = listOption.filter((o) => o !== value); // Remove major from listOption if unchecked
            setListOption(updatedList); // Update state with the new list
        }
    };

    return (
        <Container> {/* Main container for the component */}
            <Row>
                <Col><h1 className='text-center'>Student Management</h1></Col> {/* Title for the page */}
            </Row>
            <Row>
                <Col xs={3} className="d-none d-sm-block"> {/* Sidebar for majors, hidden on small screens */}
                    <h2>List Majors</h2> {/* Header for majors list */}
                    {[...new Set(listMajors)].map(m => ( // Render unique majors with checkboxes
                        <Form.Check
                            type="checkbox"
                            label={m}
                            onChange={handleChangeCheckbox} // Handle checkbox change
                            value={m}
                            key={m}
                        />
                    ))}
                </Col>
                <Col>
                    <Row>
                        {/* Display total number of students based on current filter */}
                        <Col className='text-end'>
                            <b>Total: <span style={{ color: "red" }}>{listStudents.length}</span> students</b> {/* Total count */}
                        </Col>
                    </Row>
                    <Row>
                        {/* Map through list of students and render each as a card */}
                        {listStudents.map(s => (
                            <Col xs={4} className='mt-2' key={s.code}> {/* Each student rendered as a card */}
                                <Card>
                                    <Card.Img style={{ height: "300px" }} variant="top" src={`images/${s.image}`} /> {/* Student image */}
                                    <Card.Body>
                                        <Card.Title>{s.fullName}</Card.Title> {/* Student full name */}
                                        <Card.Text>
                                            <hr />
                                            Code: {s.code} {/* Student code */}
                                            <hr />
                                            Major: {s.major} {/* Student major */}
                                            <hr />
                                            CPA: {s.cpa} {/* Student CPA */}
                                        </Card.Text>
                                        <Link to={`/student/${s.code}`}> {/* Link to student detail page */}
                                            <Button variant="danger">Detail</Button> {/* Button to view details */}
                                        </Link>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                </Col>
            </Row>
        </Container>
    );
};

export default Home; // Exporting the Home component for use in other files
