import React, { useState, useEffect } from 'react';
import { fetchVisitors, deleteVisitor, updateVisitor } from '../../api/visitorApi';
import VisitorForm from './VisitorForm';

const VisitorList = () => {
  const [visitors, setVisitors] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetchVisitors()
      .then(setVisitors)
      .catch(setError)
      .finally(() => setLoading(false));
  }, []);


  const handleDelete = (id) => {
    deleteVisitor(id)
      .then(() => {
        setVisitors(visitors.filter(visitor => visitor.id !== id));
      })
      .catch(setError);
  };


  const handleUpdateVisitor = (id, status) => {
    updateVisitor(id, { status: status })
      .then(() => {
        setVisitors(prevStudents => prevStudents.map(student => (
          student.id === id ? { ...student, status: status } : student
        )));
      })
      .catch(setError);

    console.log(visitors);
  };

  if (loading) return <p className="text-center">Loading visitors...</p>;
  if (error) return <p className="text-center text-red-500">Error loading visitors: {error.message}</p>;

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden">
      <h2 className="text-2xl font-bold p-4 bg-gray-100">Visitor List</h2>
      <table className="w-full mb-10">
        <thead className="bg-gray-200">
          <tr>
            <th className="p-2 text-left">ID</th>
            <th className="p-2 text-left">Name</th>
            <th className="p-2 text-left">Email</th>
            <th className="p-2 text-left">Phone</th>
            <th className="p-2 text-left">Status</th>
            <th className="p-2 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {visitors && visitors.length > 0 ? (
            visitors.map((visitor) => (
              <tr key={visitor.id} className="border-t">
                <td className="p-2">{visitor.id}</td>
                <td className="p-2">{visitor.name}</td>
                <td className="p-2">{visitor.email}</td>
                <td className="p-2">{visitor.phone}</td>
                <td className="p-2">{visitor.status}</td>
                <td className="p-2">
                  <button
                    onClick={() => handleDelete(visitor.id)}
                    className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                  <button
                    onClick={() => handleUpdateVisitor(visitor.id, "converted")}
                    disabled={visitor.status === "converted"}
                    className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600 disabled:opacity-50"
                  >
                    Mark as Converted
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="text-center p-4">
                No visitor found. Please enter a visitor.
              </td>
            </tr>
          )}
        </tbody>

      </table>
      <VisitorForm />
    </div>
  );
};

export default VisitorList;

