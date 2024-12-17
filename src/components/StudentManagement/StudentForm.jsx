import React, { useState, useEffect } from 'react';
import { fetchStudentDetails, addStudent, updateStudent } from '../../api/studentApi';
import { useParams, useNavigate } from 'react-router-dom';

const StudentForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '', email: '', phone: '', address: '', notes: '',
        progressScore: '', completionRate: ''
    });
    const [error, setError] = useState(null);

    useEffect(() => {
        if (id) {
            fetchStudentDetails(id)
                .then(setFormData)
                .catch(setError);
        }
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const action = id ? updateStudent(id, formData) : addStudent(formData);
        action
            .then(() => navigate('/students'))
            .catch(setError);
    };

    return (
        <form onSubmit={handleSubmit}>
            <input name="name" placeholder="Name" value={formData.name} onChange={handleChange} required />
            <input name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
            <input name="phone" placeholder="Phone" value={formData.phone} onChange={handleChange} />
            <input name="address" placeholder="Address" value={formData.address} onChange={handleChange} />
            <textarea name="notes" placeholder="Notes" value={formData.notes} onChange={handleChange} />
            <input name="progressScore" placeholder="Progress Score (%)" value={formData.progressScore} onChange={handleChange} required />
            <input name="completionRate" placeholder="Completion Rate (%)" value={formData.completionRate} onChange={handleChange} required />
            <button type="submit">{id ? 'Update' : 'Add'} Student</button>
            {error && <p style={{ color: 'red' }}>Error: {error.message}</p>}
        </form>
    );
};

export default StudentForm;