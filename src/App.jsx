import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Dashboard from './components/Dashboard/Dashboard';
import VisitorList from './components/VisitorManagement/VisitorList';
import VisitorForm from './components/VisitorManagement/VisitorForm';
import EnrollmentList from './components/EnrollmentManagement/EnrollmentList';
import EnrollmentForm from './components/EnrollmentManagement/EnrollmentForm';
import StudentList from './components/StudentManagement/StudentList';
import StudentForm from './components/StudentManagement/StudentForm';
import StudentProfile from './components/StudentManagement/StudentProfile';

const App = () => {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <nav className="bg-blue-600 text-white p-4">
          <div className="container mx-auto flex justify-between items-center">
            <h1 className="text-2xl font-bold">Student Management App</h1>
            <ul className="flex space-x-4">
              <li><Link to="/" className="hover:underline">Dashboard</Link></li>
              <li><Link to="/visitors" className="hover:underline">Visitors</Link></li>
              <li><Link to="/enrollments" className="hover:underline">Enrollments</Link></li>
              <li><Link to="/students" className="hover:underline">Students</Link></li>
            </ul>
          </div>
        </nav>
        <div className="container mx-auto p-4">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/visitors" element={<VisitorList />} />
            <Route path="/add-visitor" element={<VisitorForm />} />
            <Route path="/enrollments" element={<EnrollmentList />} />
            <Route path="/add-enrollment" element={<EnrollmentForm />} />
            <Route path="/students" element={<StudentList />} />
            <Route path="/add-student" element={<StudentForm />} />
            <Route path="/students/:id" element={<StudentProfile />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;

