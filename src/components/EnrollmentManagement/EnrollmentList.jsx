import React, { useState, useEffect } from 'react';
import { fetchEnrollments, deleteEnrollment, updatePaymentStatus } from '../../api/enrollmentApi';
import EnrollmentForm from './EnrollmentForm';
import { fetchStudents } from '../../api/studentApi';
import { fetchCourses } from '../../api/courseApi';

const EnrollmentList = () => {
    const [enrollments, setEnrollments] = useState([]);
    const [error, setError] = useState(null);
    const [students, setStudents] = useState({});
    const [courses, setCourses] = useState({});
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        
        // Fetch enrollments, students, and courses in parallel
        Promise.all([fetchEnrollments(), fetchStudents(), fetchCourses()])
            .then(([enrollmentsData, studentsData, coursesData]) => {
                // Map student and course data by their IDs
                const studentMap = {};
                studentsData.forEach(student => {
                    studentMap[student.id] = student.name;
                });
                
                const courseMap = {};
                coursesData.forEach(course => {
                    courseMap[course.id] = course.name;
                });

                setStudents(studentMap);
                setCourses(courseMap);
                setEnrollments(enrollmentsData);
            })
            .catch(setError)
            .finally(() => setLoading(false));
    }, []);


    // useEffect(() => {
    //     setLoading(true);
    //     fetchEnrollments()
    //         .then(setEnrollments)
    //         .catch(setError)
    //         .finally(() => setLoading(false));
    // }, []);
    // console.log(enrollments);
    
    const handleDelete = (id) => {
        deleteEnrollment(id)
            .then(() => {
                setEnrollments(enrollments.filter(enrollment => enrollment.id !== id));
            })
            .catch(setError);
    };

    const handleUpdatePayment = (id, status) => {
        updatePaymentStatus(id, { paymentStatus: status })
            .then(() => {
                setEnrollments(enrollments.map(enrollment => (
                    enrollment.id === id ? { ...enrollment, payment_status: status } : enrollment
                )));
            })
            .catch(setError);
    };

    if (loading) return <p className="text-center">Loading enrollments...</p>;
    if (error) return <p className="text-center text-red-500">Error loading enrollments: {error.message}</p>;

    return (
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
            <h2 className="text-2xl font-bold p-4 bg-gray-100">Enrollment List</h2>
            <table className="w-full mb-10">
                <thead className="bg-gray-200">
                    <tr>
                        <th className="p-2 text-left">Student Name</th>
                        <th className="p-2 text-left">Course</th>
                        <th className="p-2 text-left">Payment Status</th>
                        <th className="p-2 text-left">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {enrollments.map(enrollment => (
                        <tr key={enrollment.id} className="border-t">
                             <td className="p-2">{students[enrollment.student_id] || 'Unknown'}</td>
                            <td className="p-2">{courses[enrollment.course_id] || 'Unknown'}</td>
                            <td className="p-2">{enrollment.payment_status}</td>
                            <td className="p-2">
                                <button
                                    onClick={() => handleDelete(enrollment.id)}
                                    className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 mr-2"
                                >
                                    Delete
                                </button>
                                <button
                                    onClick={() => handleUpdatePayment(enrollment.id, 'paid')}
                                    disabled={enrollment.paymentStatus === 'paid'}
                                    className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600 disabled:opacity-50"
                                >
                                    Mark as Paid
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <EnrollmentForm/>
        </div>
    );
};

export default EnrollmentList;

