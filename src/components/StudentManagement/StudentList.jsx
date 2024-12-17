import React, { useState, useEffect } from 'react';
import { fetchStudents, deleteStudent, updatePaymentStatus } from '../../api/studentApi';
import { useNavigate } from 'react-router-dom';

const StudentList = () => {
    const [students, setStudents] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        setLoading(true);
        fetchStudents()
            .then(setStudents)
            .catch(setError)
            .finally(() => setLoading(false));
    }, []);

    const handleDelete = (id) => {
        deleteStudent(id)
            .then(() => setStudents(students.filter(student => student.id !== id)))
            .catch(setError);
    };

    const handleUpdatePayment = (id) => {
        updatePaymentStatus(id, { paymentStatus: 'Paid' })
            .then(() => {
                setStudents(students.map(student => (
                    student.id === id ? { ...student, paymentStatus: 'Paid' } : student
                )));
            })
            .catch(setError);
    };

    return (
        <div>
            <h2>Student List</h2>
            {loading && <p>Loading...</p>}
            {error && <p style={{ color: 'red' }}>Error: {error.message}</p>}
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Courses</th>
                        <th>Score Card</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {students.map(student => (
                        <tr key={student.id}>
                            <td>{student.name}</td>
                            <td>{student.email}</td>
                            <td>{student.phone}</td>
                            <td>{student.course}</td>
                            <td>{student.scorecard}</td>
                            <td>
                                {/* <button onClick={() => navigate(`/students/${student.id}/edit`)}>Edit</button> */}
                                <button onClick={() => handleDelete(student.id)}>Delete</button>
                                {/* <button onClick={() => handleUpdatePayment(student.id)}>Update Payment</button> */}
                                {/* <button onClick={() => navigate(`/students/${student.id}/visa`)}>Manage Visa</button> */}
                                <button onClick={() => navigate(`/students/${student.id}/scorecard`)}>Update Score</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default StudentList;