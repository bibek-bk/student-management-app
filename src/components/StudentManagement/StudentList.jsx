import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchStudents, deleteStudent, updatePaymentStatus } from '../../api/studentApi';

const StudentList = () => {
    const [students, setStudents] = useState([]);
    const [filteredStudents, setFilteredStudents] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        fetchStudents()
            .then(data => {
                setStudents(data);
                setFilteredStudents(data);
            })
            .catch(setError)
            .finally(() => setLoading(false));
    }, []);

    // console.log(students);
    
    useEffect(() => {
        const results = students.filter(student =>
            student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            student.email.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredStudents(results);
    }, [searchTerm, students]);

    const handleDelete = (id) => {
        deleteStudent(id)
            .then(() => {
                setStudents(prevStudents => prevStudents.filter(student => student.id !== id));
            })
            .catch(setError);

            
    };

    const handleUpdatePayment = (id, status) => {
        updatePaymentStatus(id, { paymentStatus: status })
            .then(() => {
                setStudents(prevStudents => prevStudents.map(student => (
                    student.id === id ? { ...student, paymentStatus: status } : student
                )));
            })
            .catch(setError);
    };

    if (loading) return <p className="text-center">Loading students...</p>;
    if (error) return <p className="text-center text-red-500">Error loading students: {error.message}</p>;

    return (
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
            <div className="flex justify-between items-center p-4 bg-gray-100">
                <h2 className="text-2xl font-bold">Student List</h2>
                <Link to="/add-student" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    Add New Student
                </Link>
            </div>
            <div className="p-4">
                <input
                    type="text"
                    placeholder="Search students..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full p-2 border rounded-md"
                />
            </div>
            <table className="w-full">
                <thead className="bg-gray-200">
                    <tr>
                        <th className="p-2 text-left">ID</th>
                        <th className="p-2 text-left">Name</th>
                        <th className="p-2 text-left">Email</th>
                        <th className="p-2 text-left">Phone</th>
                        <th className="p-2 text-left">Payment Status</th>
                        <th className="p-2 text-left">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredStudents.map(student => (
                        <tr key={student.id} className="border-t">
                            <td className="p-2">{student.id}</td>
                            <td className="p-2">
                                <Link to={`/students/${student.id}`} className="text-blue-500 hover:underline">
                                    {student.name}
                                </Link>
                            </td>
                            <td className="p-2">{student.email}</td>
                            <td className="p-2">{student.phone}</td>
                            <td className="p-2">{student.payment_status}</td>
                            <td className="p-2">
                                <button
                                    onClick={() => handleDelete(student.id)}
                                    className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 mr-2"
                                >
                                    Delete
                                </button>
                                <button
                                    onClick={() => handleUpdatePayment(student.id, 'paid')}
                                    disabled={student.payment_status === 'paid'}
                                    className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600 disabled:opacity-50"
                                >
                                    Mark as Paid
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default StudentList;

