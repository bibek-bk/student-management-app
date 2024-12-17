const API_URL = 'http://localhost:3000/api';


export const fetchStudents = () => 
    fetch(`${API_URL}/students`)
      .then(handleResponse);
  
  export const fetchStudentDetails = (id) => 
    fetch(`${API_URL}/students/${id}`)
      .then(handleResponse);
  
  export const addStudent = (data) => 
    fetch(`${API_URL}/students`, { 
      method: 'POST', 
      headers: { 'Content-Type': 'application/json' }, 
      body: JSON.stringify(data) 
    })
      .then(handleResponse);
  
  export const updateStudent = (id, data) => 
    fetch(`${API_URL}/students/${id}`, { 
      method: 'PUT', 
      headers: { 'Content-Type': 'application/json' }, 
      body: JSON.stringify(data) 
    })
      .then(handleResponse);
  
  export const deleteStudent = (id) => 
    fetch(`${API_URL}/students/${id}`, { method: 'DELETE' })
      // .then(handleResponse);
  
  export const fetchScoreCard = (id) => 
    fetch(`${API_URL}/students/${id}/scorecard`)
      .then(handleResponse);
  
  export const updateScoreCard = (id, data) => 
    fetch(`${API_URL}/students/${id}/scorecard`, { 
      method: 'PUT', 
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data) 
    })
      .then(handleResponse);
  
  export const updatePaymentStatus = (id, data) => 
    fetch(`${API_URL}/students/${id}/payment`, { 
      method: 'PUT', 
      headers: { 'Content-Type': 'application/json' }, 
      body: JSON.stringify(data) 
    })
      .then(handleResponse);
  
  // Helper function to handle responses and throw errors
  function handleResponse(response) {
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  }