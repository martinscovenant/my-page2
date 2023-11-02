import React, { useState, useEffect } from "react";
import { Helmet } from 'react-helmet';
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export const ViewAllReports = () => {
    const [report, setReport] = useState([]);
    const currentDate = new Date(new Date().getTime() - 7 * 24 * 60 * 60 * 1000);
    const formattedDate = currentDate.toISOString().split('T')[0];
    
    useEffect(() => {
        const accessToken = sessionStorage.getItem('access_token');
        const apiUrl = `https://timesheet-api-main.onrender.com/view/reports/all?current-week=${formattedDate}`;
        
        fetch(apiUrl, {
            headers: {
                'x-api-key': 'a57cca53d2086ab3488b358eebbca2e7',
                'Authorization': `Bearer ${accessToken}`
            }
        })
        .then(response => response.json())
        .then(data => data.status && setReport(data.data))
        .catch(error => console.error("Error fetching data:", error));
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
            </Helmet>
            <div className="w-full p-1 h-11 flex justify-end my-4">
                <button className="bg-blue-500 text-white rounded-md p-1 mr-[3%]" onClick={handleLogout}>LOGOUT</button>
            </div>
            <div className="sm:overflow-x-scroll lg:overflow-x-hidden">
                <table className="mx-auto my-[10%] w-4/5">
                    <thead>
                        <tr className="border-2 border-solid border-black">
                            <th>Date</th>
                            <th>Day</th>
                            <th>Project</th>
                            <th>Task</th>
                            <th>Status</th>
                            <th>Duration</th>
                            <th>Link</th>
                        </tr>
                    </thead>
                    <tbody>
                        {report.map((item, index) => (
                            <tr key={index} className="border-2 border-solid border-black">
                                <td>{item.report.date}</td>
                                <td>{item.report["day-of-week"]}</td>
                                <td>{item.report.project}</td>
                                <td>{item.report.task}</td>
                                <td>{item.report.status}</td>
                                <td>{item.report.duration}</td>
                                <td className="text-blue-500">
                                    <a
                                        href={item.report.link.startsWith("http") ? item.report.link : `http://${item.report.link}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        {item.report.link}
                                    </a>
                                </td>
                                <Link to={`/view/${item.user.id}`}>
                                    <button className="bg-blue-500 p-2 rounded-lg ml-[5%]">View</button>
                                </Link>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
};
