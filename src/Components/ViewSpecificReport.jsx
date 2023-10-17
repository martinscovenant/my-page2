
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

};


