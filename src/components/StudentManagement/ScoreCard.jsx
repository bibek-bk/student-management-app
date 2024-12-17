
import React, { useState, useEffect } from 'react';
import { fetchScoreCard, updateScoreCard } from '../../api/studentApi';
import { useParams, useNavigate } from 'react-router-dom';

const ScoreCard = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [scoreCard, setScoreCard] = useState({ progressScore: '', completionRate: '' });
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchScoreCard(id)
            .then(setScoreCard)
            .catch(setError);
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setScoreCard({ ...scoreCard, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        updateScoreCard(id, scoreCard)
            .then(() => navigate('/students'))
            .catch(setError);
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                name="progressScore"
                placeholder="Progress Score (%)"
                value={scoreCard.progressScore}
                onChange={handleChange}
                required
            />
            <input
                name="completionRate"
                placeholder="Completion Rate (%)"
                value={scoreCard.completionRate}
                onChange={handleChange}
                required
            />
            <button type="submit">Update Score Card</button>
            {error && <p style={{ color: 'red' }}>Error: {error.message}</p>}
        </form>
    );
};

export default ScoreCard;