import { Table, Button, ListGroup, Card, Container, Row, Col, Form } from 'react-bootstrap'; // Importing necessary components from react-bootstrap
import React, { useState, useEffect } from 'react'; // Importing React and hooks
import axios from 'axios'; // Importing axios for API calls
import { Link, useLocation, useParams } from 'react-router-dom'; // Importing Link for navigation and useParams to get URL parameters

function Detail() {
    // State hooks for managing student details, subject details, and search/filter inputs
    const [student, setStudent] = useState({}); // State to store student details
    const [studentSubjectDetail, setStudentSubjectDetail] = useState([]); // State for student subject details (not used in current code)
    const [listSubjects, setListSubject] = useState([]); // State to store subjects related to the student
    const [textSearch, setTextSearch] = useState("all"); // State for search/filter input
    const { code } = useParams(); // Get student code from URL parameters
    const [formData, setFormData] = useState({ // State for form data to add new subject
        subjectCode: '',
        subjectName: '',
    });

    useEffect(() => {
        // Fetch student data, student's subject details, and filter subjects based on search text
        const fetchData = async () => {
            const responseS = await axios.get(`http://localhost:9999/students?code=${code}`); // API call to fetch student data
            setStudent(responseS.data[0]); // Set student details

            const responseSD = await axios.get(`http://localhost:9999/student_details?studentCode=${code}`); // API call to fetch student subject details
            const listSubjectStudent = responseSD.data[0].subjects; // Get list of subjects for the student
            console.log(listSubjectStudent); // Log list of subjects for debugging

            const responseSub = await axios.get(`http://localhost:9999/subjects`); // API call to fetch all subjects
            // Filter subjects based on search text or display all subjects if "all" or empty
            if (textSearch === "all" || textSearch === "") {
                setListSubject(responseSub.data.filter(sub => listSubjectStudent.includes(sub.subjectCode))); // Set filtered subjects
            } else {
                setListSubject(responseSub.data
                    .filter(sub => listSubjectStudent.includes(sub.subjectCode)) // Filter subjects that the student is enrolled in
                    .filter(sub => sub.subjectName.toLowerCase().startsWith(textSearch.toLowerCase())); // Further filter by search text
            }
        };

        fetchData(); // Call the fetchData function
    }, [textSearch]); // Refetch data when search text changes

    // Handle changes to form input for adding a new subject
    const handleChange = (e) => {
        const { name, value } = e.target; // Get name and value of the input
        setFormData({
            ...formData,
            [name]: value, // Update formData state
        });
    };

    // Submit handler for adding a new subject; checks if form fields are filled
    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent default form submission behavior
        const { subjectCode, subjectName } = formData; // Destructure subjectCode and subjectName from formData

        if (!subjectCode || !subjectName) {
            alert("Empty!"); // Alert if fields are empty
            return;
        } else {
            await axios.post("http://localhost:9999/subjects", formData); // POST request to add new subject
            alert("Add successful"); // Alert on successful addition
        }
    };

    // Update search text for filtering subjects
    const handleChangeSearch = (e) => {
        const text = e.target.value; // Get the value of the search input
        setTextSearch(text); // Update search text state
    };

    return (
        <Container>
            <Row>
                <Col><h1 className='text-center'>{student.fullName}'s Details</h1></Col> {/* Display student's full name */}
            </Row>
            <Row>
                <Link to={`/`} className='mt-2'> {/* Link to go back to home */}
                    <Button variant="success">Go to home</Button>
                </Link>
            </Row>
            <Row className='mt-3'>
                {/* Search bar for filtering subjects */}
                <Form.Control type='text' placeholder='Enter name subject'
                    onChange={handleChangeSearch} // Handle search input change
                ></Form.Control>
            </Row>
            <Row className='mt-3'>
                <Col xs={3}>
                    {/* Form for adding a new subject */}
                    <h3>Add New Subject</h3>
                    <Form onSubmit={handleSubmit}> {/* Form submission handling */}
                        <Row>
                            SubjectCode
                            <Form.Control type='text' placeholder='Enter subjectcode'
                                name="subjectCode"
                                value={formData.subjectCode}
                                onChange={handleChange}> {/* Handle input change */}
                            </Form.Control>
                        </Row>
                        <Row>
                            SubjectName
                            <Form.Control type='text' placeholder='Enter subjectName'
                                name="subjectName"
                                value={formData.subjectName}
                                onChange={handleChange}> {/* Handle input change */}
                            </Form.Control>
                        </Row>
                        <Row>
                            <Button variant='warning' type="submit" style={{ width: "100%" }}> Add new</Button> {/* Button to submit form */}
                        </Row>
                    </Form>
                </Col>
                <Col>
                    <Row>
                        {/* Display student's CPA */}
                        <Col>
                            <h3>CPA: {student.cpa}</h3> {/* Display the student's CPA */}
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            {/* Display table of subjects */}
                            <Table striped bordered hover size="xs">
                                <thead>
                                    <tr>
                                        <th>SubjectCode</th>
                                        <th>SubjectName</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {listSubjects.map(sub => ( // Map through subjects and display them in table rows
                                        <tr key={sub.subjectCode}>
                                            <td>{sub.subjectCode}</td>
                                            <td>{sub.subjectName}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        </Col>
                    </Row>
                </Col>
            </Row >
        </Container >
    )
}

export default Detail; // Exporting the Detail component for use in other files
