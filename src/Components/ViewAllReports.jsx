
import React, { useState, useEffect } from "react";
import { Helmet } from 'react-helmet';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate } from "react-router-dom";

export const ViewAllReports = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const accessToken = sessionStorage.getItem('access_token');

    useEffect(() => {
        const displayAll = async () => {
            try {
                const response = await fetch(`https://timesheet-api-main.onrender.com/view/reports/all`, {
                    headers: {
                        "x-api-key": "a57cca53d2086ab3488b358eebbca2e7",
                        "Authorization": `Bearer ${accessToken}`,
                        "Content-type": "application/json"
                    },
                })
                if (response.status === 200) {
                    const data = await response.json();
                    setUsers(data.data);
                }
            } catch (err) {
                console.error("Error", err);
            } finally {
                setLoading(false);
            }
        }
        displayAll();
    }, [accessToken]);

    const navigate = useNavigate();
    const handleLogout = () => {
        sessionStorage.removeItem('access_token');
        sessionStorage.removeItem('user_id');
        navigate('/');
    };

    return (
        <>
            <Helmet>
                <title>VIEW ALL USERS</title>
                <link rel="icon" type="image/png" href="./assets/Images/adviewicon.png" />
            </Helmet>
            <div className='flex w-full h-[75px] justify-end items-center bg-[#232f3e]'>
                <button className="bg-gray white br3 pa2 mr3" onClick={handleLogout}>
                    SIGNOUT
                </button>
            </div>
            <div className="overflow-x-scroll">
                <table className="mx-auto my-[10%] w-80">
                    <thead>
                        <tr>
                            <th className="bb b--black pv2">
                                Username
                            </th>
                            <th className="bb b--black pv2">
                                Email Address
                            </th>
                        </tr>
                    </thead>
                    {loading ? (
                        <div className="tc mt-5">
                            <FontAwesomeIcon icon={faSpinner} spin /> Loading...
                        </div>
                    ) : (
                        <tbody>
                            {users.map((report) => (
                                <tr key={report}>
                                    <td className="bb b--black pv3"> {report.user.username} </td>
                                    <td className="bb b--black pv3"> {report.user.email} </td>
                                    <button className="bg-blue white br3 w-28 h2 ml3 mt3" onClick={() => navigate(`/view-specific-report/${report.user.id}`)}>
                                        SPECIFIC REPORT
                                    </button>
                                </tr>
                            ))}
                        </tbody>
                    )}
                </table>
            </div>
        </>
    );
};
