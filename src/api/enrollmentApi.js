const API_URL = 'http://localhost:3000/api';

export const fetchEnrollments = async () => {
  const response = await fetch(`${API_URL}/enrollments`);
  if (!response.ok) {
    return []
  }
  return response.json();
};

export const addEnrollment = async (enrollmentData) => {
  const response = await fetch(`${API_URL}/enrollments`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(enrollmentData),
  });
  if (!response.ok) {
    throw new Error('Failed to add enrollment');
  }
  return response.json();
};

export const deleteEnrollment = async (id) => {
  const response = await fetch(`${API_URL}/enrollments/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    throw new Error('Failed to delete enrollment');
  }
  return response.json();
};

export const updatePaymentStatus = async (id, statusData) => {
  const response = await fetch(`${API_URL}/enrollments/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(statusData),
  });
  if (!response.ok) {
    throw new Error('Failed to update payment status');
  }
  return response.json();
};

