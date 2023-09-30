// ReportView.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ReportView = () => {
  const [reportData, setReportData] = useState({
    date: "",
    project: "",
    task: "",
    status: "",
    link: "",
    duration: "",
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('https://timesheet-api-main.onrender.com/view/reports/64de52055b94379e6d9d9f7b', {
      headers: {
        'x-api-key': 'a57cca53d2086ab3488b358eebbca2e7',
      },
    })
    .then(response => {
      setReportData(response.data.data.report);
      setLoading(false);
    })
    .catch(error => {
      console.error('Error fetching report data:', error);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Report</h1>
      <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Date</th>
          <th>Project</th>
          <th>Task</th>
          <th>Status</th>
          <th>Link</th>
          <th>Duration</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item) => (
          <tr key={item.id}>
            <td>{item.date}</td>
            <td>{item.projec}</td>
            <td>{item.task}</td>
            <td>{item.status}</td>
            <td>{item.link}</td>
            <td>{item.duration}</td>
          </tr>
        ))}
      </tbody>
      </table>
    </div>
  );
};

export default ReportView;
