
import React, { useState, useEffect } from 'react';
import axios from 'axios';

export const ViewSpecificReport = ({ userId }) => {
  const [reportData, setReportData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSpecificReport = async () => {
      try {
        const response = await axios.get(`https://timesheet-api-main.onrender.com/view/reports/${userId}`, {
          headers: {
            'x-api-key': 'a57cca53d2086ab3488b358eebbca2e7',
            'Authorization': 'Bearer <admin_access_token>',
          },
        });

        setReportData(response.data.data.report);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching specific report:', error);
        setLoading(false);
      }
    };

    fetchSpecificReport();
  }, [userId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Report</h1>
      <table>
        <thead>
          <tr>
            <th>Day</th>
            <th>Date</th>
            <th>Project</th>
            <th>Task</th>
            <th>Status</th>
            <th>Link</th>
            <th>Duration</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(reportData).map(([day, report], index) => (
            <tr key={index}>
              <td>{day}</td>
              <td>{report.date}</td>
              <td>{report.project}</td>
              <td>{report.task}</td>
              <td>{report.status}</td>
              <td>{report.link}</td>
              <td>{report.duration}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
