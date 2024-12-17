import React, { useEffect, useState } from 'react';
import { fetchScoreCard, fetchStudents, updateScoreCard } from '../../api/studentApi';

const UpdateScorecardForm = () => {
    const [students, setStudents] = useState([]); // List of students
    const [selectedStudentId, setSelectedStudentId] = useState('');
    // const [previousScores, setPreviousScores] = useState({}); // Previous scores
    const [formData, setFormData] = useState({
        reading: '',
        listening: '',
        writing: '',
        speaking: '',
        overall: '',
    });

    // Fetch the list of students from API
    useEffect(() => {
        fetchStudents()
            .then(setStudents)
            .catch((error) => console.log(error))
    }, []);

    // Fetch previous scores when a student is selected
    const handleStudentSelect = async (studentId) => {
        setSelectedStudentId(studentId);
        if (!studentId) return;

        try {
            const data = await fetchScoreCard(studentId); // Replace with actual endpoint
            // const data = await response.json();
            // setPreviousScores(data.scores || {});
            setFormData({
                reading: data.scores?.reading || '',
                listening: data.scores?.listening || '',
                writing: data.scores?.writing || '',
                speaking: data.scores?.speaking || '',
                overall: data.scores?.overall || '',
            });
        } catch (error) {
            console.error('Error fetching previous scores:', error);
        }
    };

    // Handle input change for score fields
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // Handle form submission to update scores
    const handleSubmit = async (e) => {
        // e.preventDefault();
        try {
            const response = await updateScoreCard(selectedStudentId,formData)
            // const result = await response.json();
            alert('Score updated successfully');
        } catch (error) {
            console.error('Error updating score:', error);
        }
    };

    return (
        <div className="max-w-xl mx-auto p-4 bg-white shadow-md rounded-md">
            <h2 className="text-2xl font-bold mb-4 text-center">Update Scorecard</h2>
            {/* Student Selector */}
            <div className="mb-4">
                <label htmlFor="student" className="block text-sm font-medium">
                    Select Student:
                </label>
                <select
                    id="student"
                    value={selectedStudentId}
                    onChange={(e) => handleStudentSelect(e.target.value)}
                    className="w-full border p-2 rounded"
                >
                    <option value="">-- Select Student --</option>
                    {students.map((student) => (
                        <option key={student.id} value={student.id}>
                            {student.name}
                        </option>
                    ))}
                </select>
            </div>

            {/* Scorecard Form */}
            <form onSubmit={handleSubmit}>
                {['reading', 'listening', 'writing', 'speaking', 'overall'].map((field) => (
                    <div className="mb-4" key={field}>
                        <label htmlFor={field} className="block text-sm font-medium">
                            {field.charAt(0).toUpperCase() + field.slice(1)} Score:
                        </label>
                        <input
                            type="number"
                            id={field}
                            name={field}
                            value={formData[field]}
                            onChange={handleChange}
                            className="w-full border p-2 rounded"
                            placeholder={`Enter ${field} score`}
                        />
                    </div>
                ))}

                <button
                    type="submit"
                    className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                    Update Score
                </button>
            </form>
        </div>
    );
};

export default UpdateScorecardForm;
