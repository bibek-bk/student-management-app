const API_URL = 'http://localhost:3000/api';

export const fetchStudents = async () => {
  const response = await fetch(`${API_URL}/students`);
  if (!response.ok) {
    throw new Error('Failed to fetch students');
  }
  return response.json();
};

export const fetchStudentDetails = async (id) => {
  const response = await fetch(`${API_URL}/students/${id}`);
  if (!response.ok) {
    throw new Error('Failed to fetch student details');
  }
  return response.json();
};

export const addStudent = async (studentData) => {
  const response = await fetch(`${API_URL}/students`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(studentData),
  });
  if (!response.ok) {
    throw new Error('Failed to add student');
  }
  return response.json();
};

export const deleteStudent = async (id) => {
  const response = await fetch(`${API_URL}/students/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    throw new Error('Failed to delete student');
  }
  // return response.json();
};

export const updatePaymentStatus = async (id, statusData) => {
  const response = await fetch(`${API_URL}/students/${id}`, {
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

