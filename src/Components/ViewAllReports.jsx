import React, { useState, useEffect } from "react";
import { Helmet } from 'react-helmet';
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export const ViewAllReports = () => {
    const [report, setReport] = useState([]);
    const currentDate = new Date();
    currentDate.setDate(currentDate.getDate() - 7);
    const formattedDate = currentDate.toISOString().split('T')[0];

      useEffect(() => {
        const accessToken = sessionStorage.getItem('access_token');
        const apiUrl = `https://timesheet-api-main.onrender.com/view/reports/all?current-week=${formattedDate}`;

        fetch(apiUrl, {
            method: 'GET',
            headers: {
                'x-api-key': 'a57cca53d2086ab3488b358eebbca2e7',
                'Authorization': `Bearer ${accessToken}`
            }
        })
        .then(response => {
            if (response.ok) {  // Check if the response status is in the 2xx range
                return response.json();
            } else {
                console.log('Response:', response);
                throw new Error(`Failed to fetch data. Status: ${response.status}`);
            }
        })
        .then(data => {
            setReport(data.data);
        })
        .catch(error => {
            console.error("Error fetching data:", error);
        });
    }, [formattedDate]);

    const navigate = useNavigate();

    const handleLogout = () => {
        sessionStorage.removeItem('access_token');
        navigate('/');
    };
    return (
        <>
            <Helmet>
                <title>VIEW ALL REPORTS</title>
                <link rel="icon" type="image/png" href="./assets/Images/adviewicon.png" />
            </Helmet>
            <div className="w-100 pa1 flex justify-end my-4">
                <button className="bg-blue white rounded p1 mr3" onClick={handleLogout}>LOGOUT</button>
            </div>
            <div className="overflow-x-scroll overflow-x-hidden">
                <table className="w-90 mx-auto mt5">
                    <thead>
                        <tr>
                            <th className="pa2 bb b--black">Date</th>
                            <th className="pa2 bb b--black">Day</th>
                            <th className="pa2 bb b--black">Project</th>
                            <th className="pa2 bb b--black">Task</th>
                            <th className="pa2 bb b--black">Status</th>
                            <th className="pa2 bb b--black">Duration</th>
                            <th className="pa2 bb b--black">Link</th>
                        </tr>
                    </thead>
                    <tbody>
                        {report.map((item, index) => (
                            <tr key={index} className="bb b--black">
                                <td className="pa3">{item.report.date}</td>
                                <td className="pa3">{item.report["day-of-week"]}</td>
                                <td className="pa3">{item.report.project}</td>
                                <td className="pa3">{item.report.task}</td>
                                <td className="pa3">{item.report.status}</td>
                                <td className="pa3">{item.report.duration}</td>
                                <td className="pa3 blue">
                                    <a
                                        href={item.report.link.startsWith("http") ? item.report.link : `http://${item.report.link}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        {item.report.link}
                                    </a>
                                </td>
                                <Link to={`/view-specific-report/${item.user.id}`}>
                                    <button className="bg-blue white pa2 br2 ml5">View</button>
                                </Link>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    )
}
