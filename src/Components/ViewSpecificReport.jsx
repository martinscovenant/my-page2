import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";

export const ViewSpecificReport = () => {
    const [loading, setLoading] = useState(true);
    const [reportData, setReportData] = useState([]);
    const [userData, setUserData] = useState({});
    const [error, setError] = useState(null);
    const userId = sessionStorage.getItem("user_id");

    useEffect(() => {
        async function fetchReportData() {
            try {
                const response = await fetch(`https://timesheet-api-main.onrender.com/view/reports/64de52055b94379e6d9d9f7b/${userId}`, {
                    headers: {
                        'x-api-key': 'a57cca53d2086ab3488b358eebbca2e7',
                    },
                });

                if (response.status === 200) {
                    const responseData = await response.json();
                    setUserData(responseData.data.user);
                    setReportData(responseData.data.report);
                } else {
                    alert("Error occured while fetching user's report")
                }
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        }
        fetchReportData();
    }, []);
    const navigate = useNavigate()
    const handleLogout = () => {
        sessionStorage.removeItem('access_token');
        navigate('/')
    }
    return (
        <div>
             <Helmet>
                <title> VIEW SPECIFIC REPORTS </title>
            </Helmet> 
            {loading ? (
                <div className="text-center mt-11">
                    <FontAwesomeIcon icon={faSpinner} spin /> Loading...
                </div>
            ) : error ? (
                <div className="text-center mt-4 text-red-500">{error}</div>
            ) : (
                <div>
                    {/* <div className="w-full p-1 h-11 flex justify-end my-4">
                        <Link to='/view-reports'>
                            <button className="bg-blue-500 text-white rounded-md p-1 m-1" >GO BACK </button>
                        </Link>
                        <button className="bg-blue-500 text-white rounded-md p-1 mr-[3%]" onClick={handleLogout} > LOGOUT </button>
                    </div> */}
                    <div className="text-center mt-4">
                        <h2 className='font-extrabold text-2xl font-serif'>User Details</h2>
                        <p><span className='font-semibold'>Email:</span> {userData.email} </p>
                        <p><span className='font-semibold'>Username:</span> {userData.username}</p>
                    </div>
                    <div className="sm:overflow-x-scroll lg:overflow-x-hidden">
                        <table className="mx-auto my-[10%] w-4/5">
                            <thead>
                                <tr>
                                    <th className='border-solid border-black border-2 p-2'>Date</th>
                                    <th className='border-solid border-black border-2 p-2'>Day</th>
                                    <th className='border-solid border-black border-2 p-2'>Project</th>
                                    <th className='border-solid border-black border-2 p-2'>Task</th>
                                    <th className='border-solid border-black border-2 p-2'>Status</th>
                                    <th className='border-solid border-black border-2 p-2'>Duration</th>
                                    <th className='border-solid border-black border-2 p-2'> Link </th>
                                </tr>
                            </thead>
                            <tbody>
                                {Object.entries(reportData).map(([day, data]) => (
                                    <tr key={day}>
                                        <td className='border-solid border-black border-2 p-3'>{data.date}</td>
                                        <td className='border-solid border-black border-2 p-3'>{data['day-of-week']}</td>
                                        <td className='border-solid border-black border-2 p-3'>{data.project}</td>
                                        <td className='border-solid border-black border-2 p-3'>{data.task}</td>
                                        <td className='border-solid border-black border-2 p-3'>{data.status}</td>
                                        <td className='border-solid border-black border-2 p-3'>{data.duration}</td>
                                        <td className='border-solid border-black border-2 p-3'><a href={data.link.startsWith("http") ? data.link : `http://${data.link}`} target="_blank" rel="noopener noreferrer">{data.link} </a></td>
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
