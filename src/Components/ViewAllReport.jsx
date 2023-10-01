import React, { useState, useEffect } from 'react';
import axios from 'axios';

export const AllReports = ({ adminAccessToken }) => {
  const [reportData, setReportData] = useState([]);
  const [currentWeek, setCurrentWeek] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          'https://timesheet-api-main.onrender.com/view/reports/all',
          {
            params: {
              'current-week': currentWeek, 
            },
            headers: {
              'x-api-key': 'a57cca53d2086ab3488b358eebbca2e7',
              Authorization: `Bearer ${adminAccessToken}`,
            },
          }
        );

        if (response.status === 200) {
          setReportData(response.data.data);
          setLoading(false);
        } else {
          console.error('Failed to fetch report data');
          setLoading(false);
        }
      } catch (error) {
        console.error('Error fetching report data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, [currentWeek, adminAccessToken]);
  
  return (
    <div>
      <h1>All Reports</h1>
      
      <button onClick={() => setCurrentWeek('2023-10-1')}>View Week of 2023-10-1</button>

      {loading ? (
        <div>Loading...</div>
      ) : (
        <div>
          {reportData.map((report, index) => (
            <div key={index}>
              <h2>User: {report.user.username}</h2>
              <ul>
                {Object.keys(report.report).map((dayOfWeek) => (
                  <li key={dayOfWeek}>
                    <strong>{dayOfWeek}:</strong>
                    {report.report[dayOfWeek] ? (
                      <>
                        <div>Date: {report.report[dayOfWeek].date}</div>
                        <div>Duration: {report.report[dayOfWeek].duration}</div>
                        <div>Link: {report.report[dayOfWeek].link}</div>
                        <div>Project: {report.report[dayOfWeek].project}</div>
                        <div>Status: {report.report[dayOfWeek].status}</div>
                        <div>Task: {report.report[dayOfWeek].task}</div>
                      </>
                    ) : (
                      <div>No report for this day</div>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
