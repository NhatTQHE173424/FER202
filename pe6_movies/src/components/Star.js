import { Table, Button, ListGroup, Card, Container, Row, Col, Form } from 'react-bootstrap'; // Importing necessary components from react-bootstrap
import React, { useState, useEffect } from 'react'; // Importing React and hooks
import axios from 'axios'; // Importing axios for API calls
import { Link, useLocation, useParams, useNavigate } from 'react-router-dom'; // Importing routing hooks

function Star() {
    const { id } = useParams(); // Get the movie ID from URL parameters
    const [movie, setMovie] = useState({}); // Store movie data
    const [listStarOptions, setListStarOptions] = useState([]); // Store selected stars for this movie
    const [listStars, setListStars] = useState([]); // Store all available stars from API
    const navigate = useNavigate(); // Used for navigation after form submission

    useEffect(() => {
        const fetchData = async () => {
            // Fetch movie data by ID and set `movie` and initial `listStarOptions`
            const responseM = await axios.get(`http://localhost:9999/movies/${id}`); // Fetching movie details
            setMovie(responseM.data); // Setting movie data in state
            setListStarOptions(responseM.data.stars); // Setting initial selected stars from movie data

            // Fetch all stars data for checkboxes
            const responseS = await axios.get(`http://localhost:9999/stars`); // Fetching all stars
            setListStars(responseS.data); // Storing stars data in state
        };

        fetchData(); // Call fetchData function to retrieve movie and stars data
    }, []); // Empty dependency array means this effect runs once when the component mounts

    // Update star selection based on checkbox changes
    const handleChangeCheckbox = (e) => {
        const { value, checked } = e.target; // Destructure value and checked status from the event target
        const starId = parseInt(value); // Convert star ID to an integer
        if (checked) {
            // If checkbox is checked, add selected star to list
            setListStarOptions([...listStarOptions, starId]); // Update state with new star ID
        } else {
            // If checkbox is unchecked, remove unselected star from list
            setListStarOptions(listStarOptions.filter((o) => o !== starId)); // Filter out the star ID from state
        }
    };

    // Submit form and update movie stars via API
    const handelSubmit = async (e) => {
        e.preventDefault(); // Prevent default form submission behavior
        const movieUpdate = { ...movie, stars: listStarOptions }; // Create a new movie object with updated stars
        await axios.put(`http://localhost:9999/movies/${id}`, movieUpdate); // Send updated movie data to the server
        alert("success"); // Alert user of successful update
        navigate("/movie"); // Redirect to movies page after submission
    };

    return (
        <Container>
            <Row>
            </Row>
            <Row className='mt-5'>
                <Form onSubmit={handelSubmit}> {/* Form for adding stars to the movie */}
                    <Col>
                        <Row>
                            <b>Movie Title</b>
                            {/* Display the movie title, disabled to prevent editing */}
                            <Form.Control
                                type='text'
                                name="title"
                                value={movie.title} // Display the title of the movie
                                disabled // Make the input read-only
                            />
                        </Row>
                        <Row>
                            <b>Star</b>
                            {/* Display checkboxes for each star */}
                            {listStars.map(s => ( // Mapping through the list of stars
                                <Col key={s.id}>
                                    <Form.Check
                                        type='checkbox' // Checkbox input type
                                        label={s.fullname} // Display the full name of the star
                                        inline // Display checkboxes inline
                                        onChange={handleChangeCheckbox} // Handle checkbox state changes
                                        value={s.id} // Set value to star's ID
                                        checked={listStarOptions.includes(parseInt(s.id))} // Check if this star is selected
                                    />
                                </Col>
                            ))}
                        </Row>
                        <Row>
                            <Col>
                                {/* Submit button for form */}
                                <Button variant='success' type='submit'>Add</Button> {/* Button to submit the form */}
                            </Col>
                        </Row>
                    </Col>
                </Form>
            </Row>
        </Container>
    );
}

export default Star; // Exporting the Star component for use in other files
