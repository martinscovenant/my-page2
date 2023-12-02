import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate, useParams, Link } from 'react-router-dom';
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
} from '@mui/material';

export const SpecificReportView = () => {
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
        <div className="text-center mt-11">
          <FontAwesomeIcon icon={faSpinner} spin /> Loading...
        </div>
      ) : error ? (
        <div className="text-center mt-4 text-red-500">{error}</div>
      ) : (
        <div>
          <div className="flex w-full h-[75px] justify-end items-center bg-[#232f3e]">
            <Link to="/view-users">
              <button className="bg-gray-500 text-white rounded-md p-1 m-1">
                GO BACK
              </button>
            </Link>
            <button
              className="bg-gray-500 text-white rounded-md p-1 mr-[3%]"
              onClick={handleLogout}
            >
              {' '}
              LOGOUT{' '}
            </button>
          </div>
          <div className="text-center mt-4">
            <h2 className="font-extrabold text-2xl font-serif">User Details</h2>
            <p>
              <span className="font-semibold">Email:</span> {userData.email}{' '}
            </p>
            <p>
              <span className="font-semibold">Username:</span> {userData.username}
            </p>
          </div>
          <div className="sm:overflow-x-scroll lg:overflow-x-hidden">
            <Paper>
            <Table>
            <TableHead>
              <TableRow>
                <TableCell className="border-2 border-solid border-black p-1">
                  S/N
                </TableCell>
                <TableCell className="border-2 border-solid border-black p-1">
                  DATE
                </TableCell>
                <TableCell className="border-2 border-solid border-black p-1">
                  PROJECT
                </TableCell>
                <TableCell className="border-2 border-solid border-black p-1">
                  TASK
                </TableCell>
                <TableCell className="border-2 border-solid border-black p-1">
                  STATUS
                </TableCell>
                <TableCell className="border-2 border-solid border-black p-1">
                  DURATION
                </TableCell>
                <TableCell className="border-2 border-solid border-black p-1">
                  LINK
                </TableCell>
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
                    <TableCell className="border-2 border-solid border-black p-3">
                      {index + 1}
                    </TableCell>
                    <TableCell className="border-2 border-solid border-black p-3">
                      {new Date(report.date).toDateString()}
                    </TableCell>
                    <TableCell className="border-2 border-solid border-black p-3">
                      {report.project}
                    </TableCell>
                    <TableCell className="border-2 border-solid border-black p-3">
                      {report.task}
                    </TableCell>
                    <TableCell className="border-2 border-solid border-black p-3">
                      {report.status}
                    </TableCell>
                    <TableCell className="border-2 border-solid border-black p-3">
                      {report.duration}
                    </TableCell>
                    <TableCell className="border-2 border-solid border-black p-3 text-blue-500">
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