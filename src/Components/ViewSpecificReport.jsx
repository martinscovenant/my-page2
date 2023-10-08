
import React, { useState, useEffect } from 'react';
import axios from 'axios';

export const ViewSpecificReport = ({ userId }) => {
  const [reportData, setReportData] = useState({
    date: '',
    project: '',
    task: '',
    status: '',
    link: '',
    duration: '',
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSpecificReport = async () => {
      try {
        
        const response = await axios.get(
          `https://timesheet-api-main.onrender.com/view/reports/${userId}`,
          {
            headers: {
              'x-api-key': 'a57cca53d2086ab3488b358eebbca2e7',
              Authorization: 'Bearer <admin_access_token>',
            },
          }
        );

        const report = response.data.data.report;
        setReportData({
          date: report.date,
          project: report.project,
          task: report.task,
          status: report.status,
          link: report.link,
          duration: report.duration,
        });

        setLoading(false);
      } catch (error) {
        console.error('Error fetching specific report:', error);
        setLoading(false);
      }
    };

    fetchSpecificReport();
  }, [userId]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setReportData({ ...reportData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Add your submit logic here, e.g., send the updated data to the server
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="report-container">
      <h1>Report</h1>
      <form onSubmit={handleSubmit}>
        <div className="input">
          <label>Date:</label>
          <input
            type="date"
            name="date"
            value={reportData.date}
            onChange={handleChange}
            required
          />
        </div>
        <div  className="input">
          <label>Project:</label>
          <input
            type="text"
            name="project"
            value={reportData.project}
            onChange={handleChange}
            required
          />
        </div>
        <div className="input">
          <label>Task:</label>
          <input
            type="text"
            name="task"
            value={reportData.task}
            onChange={handleChange}
            required
          />
        </div>
        <div className="input">
          <label>Status:</label>
          <input
            type="text"
            name="status"
            value={reportData.status}
            onChange={handleChange}
            required
          />
        </div>
        <div className="input">
          <label>Link:</label>
          <input
            type="url"
            name="link"
            value={reportData.link}
            onChange={handleChange}
            required
          />
        </div>
        <div className="input">
          <label>Duration:</label>
          <input
            type="text"
            name="duration"
            value={reportData.duration}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Submit Report</button>
      </form>
    </div>
  );
};
