import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

export const ViewSpecificReport = () => {
  const [loading, setLoading] = useState(true);
  const [reportData, setReportData] = useState([]);
  const [userData, setUserData] = useState({});
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchReportData() {
      try {
        const response = await fetch(
          'https://timesheet-api-main.onrender.com/view/reports/<user_id>',
          {
            headers: {
              'x-api-key': 'a57cca53d2086ab3488b358eebbca2e7',
            },
          }
        );

        if (response.status === 200) {
          const responseData = await response.json();
          setUserData(responseData.data.user);
          setReportData(responseData.data.report);
        } else {
          alert("Error occurred while fetching user's report");
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }
    fetchReportData();
  }, []);
  const navigate = useNavigate();
  const handleLogout = () => {
    sessionStorage.removeItem('access_token');
    navigate('/');
  };
  return (
    <div>
      <Helmet>
        <title>VIEW SPECIFIC REPORTS</title>
        <link rel="icon" type="image/png" href="./assets/Images/adviewicon.png" />
      </Helmet>
      {loading ? (
        <div className="tc mt-5">
          <FontAwesomeIcon icon={faSpinner} spin /> Loading...
        </div>
      ) : error ? (
        <div className="tc mt-4 red">{error}</div>
      ) : (
        <div>
          <div className="w-100 pv1 flex justify-end mt-4">
            <Link to="/view-reports">
              <button className="bg-blue white br1 pv1 ph2 ma1">GO BACK</button>
            </Link>
            
          </div>
          <div className="tc mt-4">
            <h2 className="fw9 f2">User Details</h2>
            <p>
              <span className="fw6">Email:</span> {userData.email}
            </p>
            <p>
              <span className="fw6">Username:</span> {userData.username}
            </p>
          </div>
          <div className="overflow-x-scroll overflow-x-hidden">
            <table className="w-80 center">
              <thead>
                <tr>
                  <th className="ba b--black-20 pv2 ph3">Date</th>
                  <th className="ba b--black-20 pv2 ph3">Day</th>
                  <th className="ba b--black-20 pv2 ph3">Project</th>
                  <th className="ba b--black-20 pv2 ph3">Task</th>
                  <th className="ba b--black-20 pv2 ph3">Status</th>
                  <th className="ba b--black-20 pv2 ph3">Duration</th>
                  <th className="ba b--black-20 pv2 ph3">Link</th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(reportData).map(([day, data]) => (
                  <tr key={day}>
                    <td className="ba b--black-20 pv3 ph4">{data.date}</td>
                    <td className="ba b--black-20 pv3 ph4">{data['day-of-week']}</td>
                    <td className="ba b--black-20 pv3 ph4">{data.project}</td>
                    <td className="ba b--black-20 pv3 ph4">{data.task}</td>
                    <td className="ba b--black-20 pv3 ph4">{data.status}</td>
                    <td className="ba b--black-20 pv3 ph4">{data.duration}</td>
                    <td className="ba b--black-20 pv3 ph4">
                      <a
                        href={data.link.startsWith('http') ? data.link : `http://${data.link}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {data.link}
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
