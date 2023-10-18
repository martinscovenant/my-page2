
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export const ViewSpecificReport = () => {
  const [report, setReport] = useState([]);
  const currentDate = new Date();
  currentDate.setDate(currentDate.getDate() - 7);
  const formattedDate = currentDate.toISOString().split("T")[0];

  useEffect(() => {
    const accessToken = sessionStorage.getItem("access_token");
    try {
      const apiUrl = `https://timesheet-api-main.onrender.com/view/reports/all?current-week=${formattedDate}`;
      fetch(apiUrl, {
        method: "GET",
        headers: {
          "x-api-key": "a57cca53d2086ab3488b358eebbca2e7",
          Authorization: `Bearer ${accessToken}`,
        },
      })
        .then((response) => {
          if (response.status === 200) {
            return response.json();
          } else {
            console.log("Response:", response);
            throw new Error(`Failed to fetch data. Status: ${response.status}`);
          }
        })
        .then((data) => {
          if (data.status) {
            setReport(data.data);
          }
        });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }, [formattedDate]);

  const navigate = useNavigate();

  const handleLogout = () => {
    sessionStorage.removeItem("access_token");
    navigate("/");
  };

  return (
    <div>
      <div className="w-full p-1 h-11 flex justify-end my-4">
        <button
          className="bg-blue-500 text-white rounded-md p-1 mr-[3%]"
          onClick={handleLogout}
        >
          LOGOUT
        </button>
      </div>
      <div className="sm:overflow-x-scroll lg:overflow-x-hidden">
        <table className="mx-auto w-4/5">
          <thead>
            <tr>
              <th>Date</th>
              <th>Day</th>
              <th>Project</th>
              <th>Task</th>
              <th>Status</th>
              <th>Duration</th>
              <th>Link</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {report.map((item, index) => (
              <tr key={index}>
                <td>{item.report.date}</td>
                <td>{item.report["day-of-week"]}</td>
                <td>{item.report.project}</td>
                <td>{item.report.task}</td>
                <td>{item.report.status}</td>
                <td>{item.report.duration}</td>
                <td>
                  <a
                    href={
                      item.report.link.startsWith("http")
                        ? item.report.link
                        : `http://${item.report.link}`
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500"
                  >
                    {item.report.link}
                  </a>
                </td>
                <td>
                  <Link to={`/view-specific-report/${item.user.id}`}>
                    <button className="bg-blue-500 p-2 rounded-lg">View</button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};


