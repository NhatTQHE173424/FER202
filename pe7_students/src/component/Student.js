import { Table, Button, Container, Row, Col, Form } from 'react-bootstrap'; // Importing necessary components from react-bootstrap
import React, { useState, useEffect } from 'react'; // Importing React and hooks
import axios from 'axios'; // Importing axios for API calls
import { Link, useParams } from 'react-router-dom'; // Importing routing hooks

function Student() {
    // Extracts the student ID from the URL parameters
    const { studentid } = useParams();

    // State variables for subjects, students, specific student, evaluations, and form data
    const [listSubjects, setListSubjects] = useState([]); // List of subjects
    const [listStudents, setListStudents] = useState([]); // List of all students
    const [student, setStudent] = useState([]); // Specific student details
    const [evaluation, setEvaluation] = useState([]); // Evaluations for the student
    const [formData, setFormData] = useState({ // Form data for adding new evaluations
        grade: "",
        additionalExplanation: "",
        studentId: studentid // Set the student ID from URL
    });

    // Updates form data state on input change
    const handelChange = (e) => {
        const { name, value } = e.target; // Destructure name and value from event target
        setFormData({ // Update formData state
            ...formData,
            [name]: value, // Update specific field based on input name
        });
    }

    // Submits new evaluation to the server
    const handleSubmit = () => {
        const { grade, additionalExplanation } = formData; // Destructure fields from formData
        if (!grade || !additionalExplanation) { // Check if fields are empty
            alert("This is empty for grade or Explain"); // Alert if empty
        } else {
            axios.post("http://localhost:9999/evaluations", formData); // Post new evaluation to server
            alert("successful!"); // Alert on successful submission
        }
    }

    // Fetches data for subjects, student details, and evaluations on component mount
    useEffect(() => {
        const fetchData = async () => {
            const responseS = await axios.get("http://localhost:9999/subjects"); // API call to fetch subjects
            setListSubjects(responseS.data); // Store subjects in state

            const responseStD = await axios.get(`http://localhost:9999/students?studentId=${studentid}`); // Fetch specific student details
            setStudent(responseStD.data); // Store the student data in state

            const responseStD1 = await axios.get("http://localhost:9999/students"); // Fetch all students
            setListStudents(responseStD1.data); // Store all students in state

            const responseEva = await axios.get("http://localhost:9999/evaluations"); // Fetch evaluations
            setEvaluation(responseEva.data); // Store evaluations in state
        };

        fetchData(); // Call fetchData function to retrieve initial data
    }, []); // Empty dependency array means this effect runs once when the component mounts

    return (
        <Container fluid>
            {/* Header for the student management page */}
            <Row className='mt-2'>
                <Col className='text-center'>
                    <h1>Student Management</h1> {/* Main title of the page */}
                </Col>
            </Row>

            {/* Search input for students */}
            <Row className='mt-2'>
                <Col></Col>
                <Col xs={8} className='text-center'>
                    <Form.Control type="text" placeholder='Enter name student ..'></Form.Control> {/* Search input field */}
                </Col>
                <Col></Col>
            </Row>

            <Row className='mt-3'>
                {/* Subject list on the left side */}
                <Col xs={3}>
                    <h2>Subjects</h2>
                    <ul>
                        {listSubjects.map(s => ( // Map through subjects to create a list
                            <div key={s.subjectId}><a href="">{s.name}</a></div> // Display subject name as a link
                        ))}
                    </ul>
                </Col>

                {/* Main content area for student grades and evaluations */}
                <Col>
                    <Row>
                        <Col>
                            <Link to="/"> {/* Link to go back to the home page */}
                                <Button variant='success'> Back to Home</Button>
                            </Link>
                        </Col>
                    </Row>

                    {/* Displaying selected student's grade details */}
                    <Row>
                        <Col className='text-center mt-2'>
                            <h3>
                                {
                                    student.map(s => (
                                        <div>
                                            {`${s.name}'s Grade Details:`}
                                        </div>
                                    ))}
                            </h3> {/* Display selected student's name */}
                        </Col>
                    </Row>

                    {/* Form to add a new grade for the student */}
                    <Row>
                        <h4>Add a new Grade</h4>
                    </Row>

                    <Form onSubmit={handleSubmit}> {/* Form submission to handle adding grades */}
                        <Row>
                            <Col xs={3}>
                                <Form.Control
                                    type='text'
                                    placeholder='Enter grade'
                                    name='grade' // Input name for grade
                                    value={formData.grade} // Controlled input for grade
                                    onChange={handelChange} // Update formData on change
                                />
                            </Col>
                            <Col xs={3}>
                                <Form.Control
                                    type='text'
                                    placeholder='Enter additional explanation'
                                    name='additionalExplanation' // Input name for explanation
                                    value={formData.additionalExplanation} // Controlled input for explanation
                                    onChange={handelChange} // Update formData on change
                                />
                            </Col>
                            <Col xs={2}>
                                <Button variant='primary' type='submit' style={{ width: '100%' }}> {/* Make button full width */}
                                    Add to
                                </Button> {/* Submit button to add grade */}
                            </Col>
                        </Row>
                    </Form>


                    {/* Table displaying evaluations for the selected student */}
                    <Row className='mt-2'>
                        <Col>
                            <Table striped bordered hover size="xs"> {/* Table to display evaluations */}
                                <thead>
                                    <tr>
                                        <th>Grade</th> {/* Table header for grade */}
                                        <th>Explanation</th> {/* Table header for explanation */}
                                    </tr>
                                </thead>
                                <tbody>
                                    {evaluation.filter((s) => s.studentId == studentid).map((e) => ( // Filter evaluations for the specific student
                                        <tr key={e.id}> {/* Use a unique key for each row */}
                                            <td>{e.grade}</td> {/* Display grade */}
                                            <td>{e.additionalExplanation}</td> {/* Display explanation */}
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Container>
    )
}

export default Student; // Exporting the Student component for use in other files
