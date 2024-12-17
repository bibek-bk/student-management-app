
import React, { useState, useEffect } from 'react';
import { addEnrollment } from '../../api/enrollmentApi';
import { fetchVisitors } from '../../api/visitorApi'; // Updated import
import { fetchCourses } from '../../api/courseApi';
import { useNavigate } from 'react-router-dom';
import { addStudent } from '../../api/studentApi';



const EnrollmentForm = () => {
    const [formData, setFormData] = useState({
        visitor_id: '', // Updated to visitor_id
        course_id: '',  // No change here
        status: 'pending', // Default as per model
        payment_status: 'pending', // Default as per model
    });

    const [visitors, setVisitors] = useState([]); // Updated to visitors
    const [courses, setCourses] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        setLoading(true);
        Promise.all([fetchVisitors(), fetchCourses()]) // Updated fetch call
            .then(([visitorsData, coursesData]) => {

                // Filter visitors where status is 'converted'
                const convertedVisitors = visitorsData.filter(visitor => visitor.status === 'converted');
                setVisitors(convertedVisitors); // Updated to setVisitors
                setCourses(coursesData);

            })
            .catch(setError)
            .finally(() => setLoading(false));
    }, []);
    console.log(visitors);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        // e.preventDefault();
        console.log('Form Data Being Sent:', formData); // Debugging log
    
        // Filter visitor details based on visitor_id
        const selectedVisitor = visitors.find(visitor => visitor.id === Number(formData.visitor_id));
        console.log('ehhlo',selectedVisitor);
        
        const selectedCourse = courses.find(course => course.id === Number(formData.course_id));
        console.log('course',selectedCourse);
        
        // Check if the visitor exists
        if (!selectedVisitor) {
            console.error('No visitor found with the given ID');
            setError('Visitor not found');
            return;
        }
    
        // Extract name, phone, and email from the selected visitor
        const studentData = {
            name: selectedVisitor.name,   // Name of the visitor
            phone: selectedVisitor.phone, // Phone number
            email: selectedVisitor.email,  // Email address
            course: selectedCourse.name,
        };
        console.log(studentData,'studentData');
        
    
        // Call APIs
        addEnrollment(formData)
            .then(() => {
                console.log('Enrollment created successfully');
                return addStudent(studentData); // Call addStudent after addEnrollment completes
            })
            .then(() => {
                console.log('Student added successfully');
                navigate('/'); // Navigate after both APIs succeed
            })
            .catch((err) => {
                console.error('Error during submission:', err); // Debugging log
                setError(err); // Set error state
            });
    };
    


    if (loading) return <p className="text-center">Loading form data...</p>;
    if (error) return <p className="text-center text-red-500">Error loading form data: {error.message}</p>;

    return (
        <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="visitor_id">
                    Visitor
                </label>
                <select
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="visitor_id"
                    name="visitor_id"
                    value={formData.visitor_id}
                    onChange={handleChange}
                    required
                >
                    <option value="">Select Visitor</option>
                    {visitors.map(visitor => (
                        <option key={visitor.id} value={visitor.id}>{visitor.name}</option>
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
