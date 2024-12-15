import React, { useState, useEffect } from 'react';
import { addEnrollment } from '../../api/enrollmentApi';
import { fetchStudents } from '../../api/studentApi';
import { fetchCourses } from '../../api/courseApi';
import { useNavigate } from 'react-router-dom';

const EnrollmentForm = () => {
    const [formData, setFormData] = useState({
        student_id: '', // Matches backend model
        course_id: '',  // Matches backend model
        status:'pending', // Default as per model
        payment_status:'pending', // Default as per model
    });
    
    const [students, setStudents] = useState([]);
    const [courses, setCourses] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        setLoading(true);
        Promise.all([fetchStudents(), fetchCourses()])
            .then(([studentsData, coursesData]) => {
                setStudents(studentsData);
                setCourses(coursesData);
            })
            .catch(setError)
            .finally(() => setLoading(false));
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form Data Being Sent:', formData); // Debugging log
        addEnrollment(formData)
            .then(() => {
                console.log('Enrollment created successfully');
                navigate('/');
            })
            .catch((err) => {
                console.error('Error during enrollment:', err); // Debugging log
                setError(err);
            });
    };

    if (loading) return <p className="text-center">Loading form data...</p>;
    if (error) return <p className="text-center text-red-500">Error loading form data: {error.message}</p>;

    return (
        <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="student_id">
                    Student
                </label>
                <select
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="student_id"
                    name="student_id"
                    value={formData.student_id}
                    onChange={handleChange}
                    required
                >
                    <option value="">Select Student</option>
                    {students.map(student => (
                        <option key={student.id} value={student.id}>{student.name}</option>
                    ))}
                </select>
            </div>

            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="course_id">
                    Course
                </label>
                <select
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="course_id"
                    name="course_id"
                    value={formData.course_id}
                    onChange={handleChange}
                    required
                >
                    <option value="">Select Course</option>
                    {courses.map(course => (
                        <option key={course.id} value={course.id}>{course.name}</option>
                    ))}
                </select>
            </div>

            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="payment_status">
                    Payment Status
                </label>
                <select
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="payment_status"
                    name="payment_status"
                    value={formData.payment_status}
                    onChange={handleChange}
                >
                    <option value="pending">Pending</option>
                    <option value="paid">Paid</option>
                </select>
            </div>

            <div className="flex items-center justify-between">
                <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    type="submit"
                >
                    Enroll
                </button>
            </div>

            {error && (
                <p className="text-red-500 text-sm italic mt-4">
                    {error.message || 'An error occurred while processing the enrollment.'}
                </p>
            )}
        </form>
    );
};

export default EnrollmentForm;
