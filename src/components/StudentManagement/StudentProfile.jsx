import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchStudentDetails } from '../../api/studentApi';

const StudentProfile = () => {
    const { id } = useParams();
    const [student, setStudent] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        fetchStudentDetails(id)
            .then(setStudent)
            .catch(setError)
            .finally(() => setLoading(false));
    }, [id]);

    if (loading) return <p className="text-center">Loading student details...</p>;
    if (error) return <p className="text-center text-red-500">Error loading student: {error.message}</p>;
    if (!student) return <p className="text-center">No student found</p>;

    return (
        <div className="bg-white shadow-md rounded-lg overflow-hidden p-6">
            <h2 className="text-2xl font-bold mb-4">Student Profile</h2>
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <p className="font-bold">Name:</p>
                    <p>{student.name}</p>
                </div>
                <div>
                    <p className="font-bold">Email:</p>
                    <p>{student.email}</p>
                </div>
                <div>
                    <p className="font-bold">Phone:</p>
                    <p>{student.phone}</p>
                </div>
                <div>
                    <p className="font-bold">Payment Status:</p>
                    <p>{student.paymentStatus}</p>
                </div>
            </div>
            <div className="mt-6">
                <h3 className="text-xl font-bold mb-2">Enrollment History</h3>
                {student.enrollments && student.enrollments.length > 0 ? (
                    <ul className="list-disc list-inside">
                        {student.enrollments.map((enrollment, index) => (
                            <li key={index}>{enrollment}</li>
                        ))}
                    </ul>
                ) : (
                    <p>No enrollment history available.</p>
                )}
            </div>
        </div>
    );
};

export default StudentProfile;

