import React, { useState, useEffect } from 'react';
import { fetchStudents } from '../../api/studentApi';
import { fetchEnrollments } from '../../api/enrollmentApi';
import { fetchCourses } from '../../api/courseApi';
import { fetchVisitors } from '../../api/visitorApi';

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalStudents: 0,
    totalEnrollments: 0,
    totalCourses: 0,
    totalVisitors: 0,
    recentEnrollments: []
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [visitors, setVisitors] = useState({});
  const [courses, setCourses] = useState({});


  useEffect(() => {
    Promise.all([
      fetchStudents(),
      fetchEnrollments(),
      fetchCourses(),
      fetchVisitors()
    ])
      .then(([students, enrollments, courses, visitors]) => {
        setStats({
          totalStudents: students.length,
          totalEnrollments: enrollments.length,
          totalCourses: courses.length,
          totalVisitors: visitors.length,
          recentEnrollments: enrollments.slice(-5).reverse()
        });
        const visitorMap = {};
        visitors.forEach(visitor => {
          visitorMap[visitor.id] = visitor.name;
        });

        const courseMap = {};
        courses.forEach(course => {
          courseMap[course.id] = course.name;
        });

        setVisitors(visitorMap);
        setCourses(courseMap);
      })
      .catch(setError)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p className="text-center">Loading dashboard data...</p>;
  if (error) return <p className="text-center text-red-500">Error loading dashboard: {error.message}</p>;

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden p-6">
      <h2 className="text-2xl font-bold mb-6">Dashboard</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-blue-100 p-4 rounded-lg">
          <h3 className="text-lg font-semibold mb-2">Total Students</h3>
          <p className="text-3xl font-bold">{stats.totalStudents}</p>
        </div>
        <div className="bg-green-100 p-4 rounded-lg">
          <h3 className="text-lg font-semibold mb-2">Total Enrollments</h3>
          <p className="text-3xl font-bold">{stats.totalEnrollments}</p>
        </div>
        <div className="bg-yellow-100 p-4 rounded-lg">
          <h3 className="text-lg font-semibold mb-2">Total Courses</h3>
          <p className="text-3xl font-bold">{stats.totalCourses}</p>
        </div>
        <div className="bg-red-100 p-4 rounded-lg">
          <h3 className="text-lg font-semibold mb-2">Total Visitors</h3>
          <p className="text-3xl font-bold">{stats.totalVisitors}</p>
        </div>
      </div>
      <div>
        <h3 className="text-xl font-semibold mb-4">Recent Enrollments</h3>
        <ul className="divide-y divide-gray-200">
          {stats.recentEnrollments.map((enrollment, index) => (
            <li key={index} className="py-2">
              <td className="p-2">
                {visitors[enrollment.visitor_id] || "Unknown"}
              </td>
              <td className="p-2">
                {courses[enrollment.course_id] || "Unknown"}
              </td>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;

