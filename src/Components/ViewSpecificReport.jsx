import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { Table, TableHead, TableBody, TableRow, TableCell, Paper } from '@mui/material';

export const ViewSpecificReport = () => {
  const [loading, setLoading] = useState(true);
  const [reportData, setReportData] = useState([]);
  const [userData, setUserData] = useState({});
  const [error, setError] = useState(null);
  const { userId } = useParams();

  useEffect(() => {
    const accessToken = sessionStorage.getItem('access_token');

    async function fetchReportData() {
      try {
        const response = await fetch(
          `https://timesheet-api-main.onrender.com/view/reports/${userId}`,
          {
            headers: {
              'x-api-key': 'a57cca53d2086ab3488b358eebbca2e7',
              Authorization: `Bearer ${accessToken}`,
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
  }, [userId]);

  const navigate = useNavigate();

  const handleLogout = () => {
    sessionStorage.removeItem('access_token');
    sessionStorage.removeItem('user_id');
    navigate('/');
  };

  return (
    <div>
      <Helmet>
        <title> VIEW SPECIFIC REPORTS </title>
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
          <div className="flex justify-end items-center bg-navy pa2">
            <Link to="/view-users">
              <button className="bg-gray white ba br2 pa1 mr2">
                GO BACK
              </button>
            </Link>
            <button
              className="bg-gray white ba br2 pa1 mr3"
              onClick={handleLogout}
            >
              LOGOUT
            </button>
          </div>
          <div className="tc mt-4">
            <h2 className="fw7 f2">User Details</h2>
            <p>
              <span className="fw6">Email:</span> {userData.email}
            </p>
            <p>
              <span className="fw6">Username:</span> {userData.username}
            </p>
          </div>
          <div className="overflow-x-scroll">
            <Paper>
              <Table>
                <TableHead>
                  <TableRow>
                    {/* <TableCell className="ba b--black pa1">S/N</TableCell> */}
                    <TableCell className="ba b--black pa1">DATE</TableCell>
                    <TableCell className="ba b--black pa1">PROJECT</TableCell>
                    <TableCell className="ba b--black pa1">TASK</TableCell>
                    <TableCell className="ba b--black pa1">STATUS</TableCell>
                    <TableCell className="ba b--black pa1">DURATION</TableCell>
                    <TableCell className="ba b--black pa1">LINK</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {Array.isArray(reportData) && reportData.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={7} align="center">
                        No data available
                      </TableCell>
                    </TableRow>
                  ) : (
                    Object.entries(reportData).map(([dayOfWeek, report], index) => (
                      <TableRow key={index}>
                        <TableCell className="ba b--black pa4">{index + 1}</TableCell>
                        <TableCell className="ba b--black pa2">
                          {new Date(report.date).toDateString()}
                        </TableCell>
                        <TableCell className="ba b--black pa2">{report.project}</TableCell>
                        <TableCell className="ba b--black pa2">{report.task}</TableCell>
                        <TableCell className="ba b--black pa2">{report.status}</TableCell>
                        <TableCell className="ba b--black pa2">{report.duration}</TableCell>
                        <TableCell className="ba b--black pa2 blue">
                          <a
                            href={
                              report.link.startsWith('http')
                                ? report.link
                                : `http://${report.link}`
                            }
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {report.link}
                          </a>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </Paper>
          </div>
        </div>
      )}
    </div>
  );
};
