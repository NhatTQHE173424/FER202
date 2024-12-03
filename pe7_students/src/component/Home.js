import { Table, Button, ListGroup, Card, Container, Row, Col, Form } from 'react-bootstrap'; // Importing necessary components from react-bootstrap
import React, { useState, useEffect } from 'react'; // Importing React and hooks
import axios from 'axios'; // Importing axios for API calls
import { Link, useLocation } from 'react-router-dom'; // Importing routing hooks

function Home() {
    const [listSubjects, setListSubjects] = useState([]); // Holds list of subjects
    const [listStudents, setListStudents] = useState([]); // Holds filtered list of students
    const [listStudentDetails, setListStudentDetails] = useState([]); // Holds additional student details

    const [textSearch, setTextSearch] = useState("null"); // Search text for student filtering
    const location = useLocation(); // Tracks current URL for updating data when URL changes

    useEffect(() => {
        const fetchData = async () => {
            // Fetch subjects
            const responseS = await axios.get("http://localhost:9999/subjects"); // API call to fetch subjects
            setListSubjects(responseS.data); // Store the subjects in state

            // Fetch student-subject relationships and students data
            const responseStSj = await axios.get("http://localhost:9999/students_subjetcs"); // API call for student-subject mapping
            const responseSt = await axios.get("http://localhost:9999/students"); // API call to fetch students

            // Filter students by name if search text is provided
            if (textSearch !== "null") {
                setListStudents(responseSt.data.filter(s => s.name.toLowerCase().startsWith(textSearch.toLowerCase()))); // Filter students based on search text
            } else {
                setListStudents(responseSt.data); // If no search text, set all students
            }

            // Filter students based on selected subject from URL
            const urlParams = new URLSearchParams(window.location.search); // Parse URL parameters
            const subjectId = urlParams.get('subject'); // Get subject ID from URL
            if (subjectId != null) {
                const listStudentIdBySubject = responseStSj.data.filter(st => st.subjectId == subjectId).map(st => st.studentId); // Get student IDs for the selected subject
                const lstStd = responseSt.data.filter(st => listStudentIdBySubject.includes(st.studentId)); // Filter students by the retrieved IDs
                setListStudents(lstStd); // Set filtered students based on selected subject

                // Further filter students by name within the selected subject
                if (textSearch !== "null") {
                    setListStudents(lstStd.filter(s => s.name.toLowerCase().startsWith(textSearch.toLowerCase()))); // Filter again by name
                }
            }

            // Fetch additional details for each student
            const responseStD = await axios.get("http://localhost:9999/student_details"); // API call to fetch student details
            setListStudentDetails(responseStD.data); // Store additional details in state
        };

        fetchData(); // Call fetchData function to retrieve subjects, students, and details
    }, [textSearch, location]); // Re-fetch data when search text or URL changes

    // Updates the `textSearch` state when the search input changes
    const searchByName = (event) => {
        setTextSearch(event.target.value); // Update search text state based on input
    };

    return (
        <Container fluid>
            <Row className='mt-2'>
                <Col className='text-center'>
                    <h1>Student Management</h1> {/* Header for the page */}
                </Col>
            </Row>
            <Row className='mt-2'>
                <Col></Col>
                <Col xs={8} className='text-center'>
                    <Form.Control onChange={searchByName} type="text" placeholder='Enter name student ..' /> {/* Input for searching students by name */}
                </Col>
                <Col></Col>
            </Row>
            <Row className='mt-3'>
                {/* Display list of subjects as navigation links */}
                <Col xs={3}>
                    <h2>Subjects</h2>
                    <ul>
                        {listSubjects.map(s => ( // Map through subjects to create links
                            <div key={s.subjectId}> <a href={`/student?subject=${s.subjectId}`}>{s.name}</a></div>
                        ))}
                    </ul>
                </Col>
                <Col>
                    {/* Display table of students with their details */}
                    <Table striped bordered hover size="sm"> {/* Table for displaying student data */}
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Name</th>
                                <th>Age</th>
                                <th>Street</th>
                                <th>City</th>
                                <th>IsRegular</th>
                                <th>Grade</th>
                            </tr>
                        </thead>
                        <tbody>
                            {listStudents.map(s => ( // Map through filtered list of students
                                <tr key={s.studentId}>
                                    <td>{s.studentId}</td>
                                    <td>{s.name}</td>
                                    <td>{s.age}</td>
                                    {/* Display additional address details for each student */}
                                    {listStudentDetails.filter(sd => sd.studentId === s.studentId).map((sd) => (
                                        <React.Fragment key={sd.studentId}>
                                            <td>{sd.address.street}</td> {/* Display street from additional details */}
                                            <td>{sd.address.city}</td> {/* Display city from additional details */}
                                        </React.Fragment>
                                    ))}
                                    {/* Determine if the student is regular or an applicant = toan tu 3 ngoi */}
                                    <td>{s.isRegularStudent ? "Fulltime" : "Applicant"}</td>
                                    <td><Link to={`/student/${s.studentId}`}>Grades</Link></td> {/* Link to grades for the student */}
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </Col>
            </Row>
        </Container>
    );
}

export default Home; // Exporting the Home component for use in other files
