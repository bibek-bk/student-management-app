import React, { useState, useEffect } from 'react';
import { fetchStudents, deleteStudent, updatePaymentStatus } from '../../api/studentApi';
import { useNavigate } from 'react-router-dom';
import UpdateScorecardForm from './UpdateScoreCardForm';

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
            .catch(navigate('/'));
    };

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <h2 className="text-3xl font-semibold text-gray-900 mb-6">Student List</h2>
            {loading && <p className="text-lg text-gray-500">Loading...</p>}
            {error && <p className="text-lg text-red-600">Error: {error.message}</p>}
            
            <div className="overflow-x-auto bg-white shadow-lg rounded-lg">
                <table className="min-w-full table-auto">
                    <thead className="bg-gray-100 text-left">
                        <tr>
                            <th className="px-4 py-3 text-sm font-medium text-gray-600">ID</th>
                            <th className="px-4 py-3 text-sm font-medium text-gray-600">Name</th>
                            <th className="px-4 py-3 text-sm font-medium text-gray-600">Email</th>
                            <th className="px-4 py-3 text-sm font-medium text-gray-600">Phone</th>
                            <th className="px-4 py-3 text-sm font-medium text-gray-600">Courses</th>
                            <th className="px-4 py-3 text-sm font-medium text-gray-600">Score Card</th>
                            <th className="px-4 py-3 text-sm font-medium text-gray-600">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {students.map(student => (
                            <tr key={student.id} className="border-b hover:bg-gray-50">
                                <td className="px-4 py-3 text-sm text-gray-800">{student.id}</td>
                                <td className="px-4 py-3 text-sm text-gray-800">{student.name}</td>
                                <td className="px-4 py-3 text-sm text-gray-800">{student.email}</td>
                                <td className="px-4 py-3 text-sm text-gray-800">{student.phone}</td>
                                <td className="px-4 py-3 text-sm text-gray-800">{student.course}</td>
                                <td className="px-4 py-3 text-sm text-gray-800">
                                    {student.scorecard ? (
                                        <div>
                                            <div>Reading: {student.scorecard.reading}</div>
                                            <div>Listening: {student.scorecard.listening}</div>
                                            <div>Writing: {student.scorecard.writing}</div>
                                            <div>Speaking: {student.scorecard.speaking}</div>
                                            <div>Overall: {student.scorecard.overall}</div>
                                        </div>
                                    ) : (
                                        <span className="text-gray-500">No Scorecard</span>
                                    )}
                                </td>
                                <td className="px-4 py-3 text-sm space-x-2">
                                    <button 
                                        className="text-red-600 hover:text-red-800 font-semibold"
                                        onClick={() => handleDelete(student.id)}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="mt-8">
                <UpdateScorecardForm />
            </div>
        </div>
    );
};

export default StudentList;
