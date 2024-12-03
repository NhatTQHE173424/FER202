import { Table, Button, ListGroup, Card, Container, Row, Col, Form } from 'react-bootstrap'; // Importing necessary components from react-bootstrap
import React, { useState, useEffect } from 'react'; // Importing React and hooks
import axios from 'axios'; // Importing axios for API calls
import { Link, useLocation, useParams } from 'react-router-dom'; // Importing Link for navigation and useLocation for URL tracking

function Movie() {
    // State to hold producers, directors, stars, and movies data
    const [listProducers, setListProducers] = useState([]); // State to store list of producers
    const [listDirectors, setListDirectors] = useState([]); // State to store list of directors
    const [listStars, setListStars] = useState([]); // State to store list of stars
    const [listMovies, setListMovies] = useState([]); // State to store list of movies
    const location = useLocation();  // Track current URL for filtering movies based on genre or producer

    useEffect(() => {
        const fetchData = async () => {
            // Fetch data for producers, movies, directors, and stars
            const responseP = await axios.get("http://localhost:9999/producers"); // Fetching list of producers
            setListProducers(responseP.data); // Storing producers in state

            const responseM = await axios.get("http://localhost:9999/movies"); // Fetching list of movies
            const urlParams = new URLSearchParams(window.location.search); // Parsing URL parameters
            const genre = urlParams.get('genres'); // Getting selected genre from URL
            const producerId = urlParams.get('producer-id'); // Getting selected producer ID from URL

            // Filter movies based on selected genre or producer ID
            if (genre != null) { // If a genre is selected
                setListMovies(responseM.data.filter(m => m.genres.includes(genre))); // Filter movies by genre
            } else if (producerId != null) { // If a producer ID is selected
                setListMovies(responseM.data.filter(m => m.producer == producerId)); // Filter movies by producer
            } else {
                setListMovies(responseM.data); // If no filters, display all movies
            }

            const responseD = await axios.get("http://localhost:9999/directors"); // Fetching list of directors
            setListDirectors(responseD.data); // Storing directors in state

            const responseS = await axios.get("http://localhost:9999/stars"); // Fetching list of stars
            setListStars(responseS.data); // Storing stars in state
        };

        fetchData(); // Call the fetchData function to retrieve data
    }, [location]);  // Re-run when URL changes, ensuring that the displayed movies are updated based on the selected genre or producer

    return (
        <Container fluid>
            {/* Header and genre navigation */}
            <Row className='mx-2'>
                <Col className='text-center mt-2 mb-2 mx-2'><h2>React Application</h2></Col> {/* Title of the application */}
            </Row>
            <Row>
                <Col className='text-center'>
                    <hr />
                    {/* Links for filtering movies by genre */}
                    <a href='/movie/?genres=Comedy' className='mx-2' style={{ textDecoration: 'underline' }}>COMEDY</a>
                    <a href='/movie/?genres=Action' className='mx-2' style={{ textDecoration: 'underline' }}>ACTION</a>
                    <a href='/movie/?genres=Cartoon' className='mx-2' style={{ textDecoration: 'underline' }}>CARTOON</a>
                    <a href='/movie/?genres=Drama' className='mx-2' style={{ textDecoration: 'underline' }}>DRAMA</a>
                    <hr />
                </Col>
            </Row>

            <Row>
                {/* Producer filter sidebar */}
                <Col xs={2}>
                    <h3>Producers</h3>
                    <ul>
                        {listProducers.map(p => (
                            <li key={p.id}><a href={`/movie/?producer-id=${p.id}`}>{p.name}</a></li> // Links to filter movies by producer
                        ))}
                    </ul>
                </Col>

                {/* Movies list table */}
                <Col>
                    <Row>
                        <Link to={``} style={{ textDecoration: 'underline' }}> Show all movies </Link> {/* Link to show all movies */}
                    </Row>
                    <h3>List of Movies</h3>
                    <Table striped bordered hover size="xs"> {/* Table to display list of movies */}
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Title</th>
                                <th>Release</th>
                                <th>Description</th>
                                <th>Producers</th>
                                <th>Directors</th>
                                <th>Genres</th>
                                <th>Stars</th>
                            </tr>
                        </thead>
                        <tbody>
                            {listMovies.map(m => ( // Mapping through the filtered list of movies to display them in rows
                                <tr key={m.id}>
                                    <td>{m.id}</td>
                                    <td>{m.title}</td>
                                    <td>{new Date(m.release).toLocaleDateString()}</td> {/* Formatting release date */}
                                    <td>{m.description}</td>
                                    <td>
                                        {listProducers.find(p => p.id == m.producer)?.name} {/* Displaying producer name */}
                                    </td>
                                    <td>
                                        {listDirectors.find(d => d.id == m.director)?.fullname} {/* Displaying director name */}
                                    </td>
                                    <td>
                                        {m.genres.map(g => <div key={g}>{g}</div>) /* Displaying movie genres */}
                                    </td>
                                    <td>
                                        <ol>
                                            {listStars.filter(s => m.stars.includes(parseInt(s.id))).map(s => ( // Filtering and displaying stars associated with the movie
                                                <li key={s.id}>{s.fullname}</li>
                                            ))}
                                        </ol>
                                        <div style={{ textAlign: 'right' }}>
                                            <br />
                                            <a href={`/movie/${m.id}/add-star`} style={{ textDecoration: 'underline' }}>Add Stars</a> {/* Link to add stars to the movie */}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </Col>
            </Row>
        </Container>
    );
}

export default Movie; // Exporting the Movie component for use in other files
