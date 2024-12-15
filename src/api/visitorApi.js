const API_URL = 'http://localhost:3000/api';

export const fetchVisitors = async () => {
  const response = await fetch(`${API_URL}/visitors`);
  if (!response.ok) {
    throw new Error('Failed to fetch visitors');
  }
 
  return response.json();
};

export const addVisitor = async (visitorData) => {
  const response = await fetch(`${API_URL}/visitors`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(visitorData),
  });
  if (!response.ok) {
    throw new Error('Failed to add visitor');
  }
  return response.json();
};

export const deleteVisitor = async (id) => {
  const response = await fetch(`${API_URL}/visitors/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    throw new Error('Failed to delete visitor');
  }
  // return response.json();
};


export const updateVisitor = async (id, data) => {
  const response = await fetch(`${API_URL}/visitors/${id}`, {
      method: 'PUT',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
  });
  if (!response.ok) {
      throw new Error('Failed to update visitor status');
  }
  return response.json();
};
