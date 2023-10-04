// // import React, { useState, useEffect } from 'react';
// // import { Link } from 'react-router-dom';
// // import axios from 'axios';
// // import './View.css'

// // export const ViewAllReports = ({ adminAccessToken }) => {
// //   const [reportData, setReportData] = useState([]);
// //   const [currentWeek, setCurrentWeek] = useState('');
// //   const [loading, setLoading] = useState(true);

// //   useEffect(() => {
// //     const fetchData = async () => {
// //       try {
// //         const response = await axios.get(
// //           'https://timesheet-api-main.onrender.com/view/reports/all',
// //           {
// //             params: {
// //               'current-week': currentWeek,
// //             },
// //             headers: {
// //               'x-api-key': 'a57cca53d2086ab3488b358eebbca2e7',
// //               Authorization: `Bearer ${adminAccessToken}`,
// //             },
// //           }
// //         );

// //         if (response.status === 200) {
// //           setReportData(response.data.data);
// //           setLoading(false);
// //         } else {
// //           console.error('Failed to fetch report data');
// //           setLoading(false);
// //         }
// //       } catch (error) {
// //         console.error('Error fetching report data:', error);
// //         setLoading(false);
// //       }
// //     };

// //     fetchData();
// //   }, [currentWeek, adminAccessToken]);

// //   return (
// //     <div>
// //       <h1>All Reports</h1>

// //       <button onClick={() => setCurrentWeek('2023-10-1')}>View Week of 2023-10-1</button>
// //       <br />
// //       <Link to="/ViewSpecificReport">View Specific Reports</Link>

// //       {loading ? (
// //         <div>Loading...</div>
// //       ) : (
// //         <div className='row'>
// //           <table>
// //             <thead>
// //               <tr className='inpute'>
// //                 <th>User</th>
// //                 <th>Day</th>
// //                 <th>Date</th>
// //                 <th>Duration</th>
// //                 <th>Link</th>
// //                 <th>Project</th>
// //                 <th>Status</th>
// //                 <th>Task</th>
// //               </tr>
// //             </thead>
// //             <tbody>
// //               {reportData.map((report, index) => (
// //                 <tr key={index}>
// //                   <td>{report.user.username}</td>
// //                   {Object.keys(report.report).map((dayOfWeek) => (
// //                     <React.Fragment key={dayOfWeek}>
// //                       <td>{dayOfWeek}</td>
// //                       {report.report[dayOfWeek] ? (
// //                         <>
// //                           <td>{report.report[dayOfWeek].date}</td>
// //                           <td>{report.report[dayOfWeek].duration}</td>
// //                           <td>{report.report[dayOfWeek].link}</td>
// //                           <td>{report.report[dayOfWeek].project}</td>
// //                           <td>{report.report[dayOfWeek].status}</td>
// //                           <td>{report.report[dayOfWeek].task}</td>
// //                         </>
// //                       ) : (
// //                         <td>No report for this day</td>
// //                       )}
// //                     </React.Fragment>
// //                   ))}
// //                 </tr>
// //               ))}
// //             </tbody>
// //           </table>
// //         </div>
// //       )}
// //     </div>
// //   );
// // };


// import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import axios from 'axios';

// export const ViewAllReports = ({ adminAccessToken }) => {
//   const [reportData, setReportData] = useState([]);
//   const [currentWeek, setCurrentWeek] = useState('');
//   const [loading, setLoading] = useState(true);

//   const handleWeekChange = (event) => {
//     setCurrentWeek(event.target.value);
//   };

//   const fetchData = async () => {
//     try {
//       const response = await axios.get(
//         'https://timesheet-api-main.onrender.com/view/reports/all',
//         {
//           params: {
//             'current-week': currentWeek,
//           },
//           headers: {
//             'x-api-key': 'a57cca53d2086ab3488b358eebbca2e7',
//             Authorization: `Bearer ${adminAccessToken}`,
//           },
//         }
//       );

//       if (response.status === 200) {
//         setReportData(response.data.data);
//         setLoading(false);
//       } else {
//         console.error('Failed to fetch report data');
//         setLoading(false);
//       }
//     } catch (error) {
//       console.error('Error fetching report data:', error);
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchData();
//   }, [currentWeek, adminAccessToken]);

//   return (
//     <div>
//       <h1>All Reports</h1>

//       <div>
//         <label htmlFor="weekInput">Enter Week:</label>
//         <input
//           type="text"
//           id="weekInput"
//           value={currentWeek}
//           onChange={handleWeekChange}
//           placeholder="YYYY-MM-DD"
//         />
//         <button onClick={fetchData}>View Reports</button>
//       </div>
//       <br />
//       <Link to="/ViewSpecificReport">View Specific Reports</Link>

//       {loading ? (
//         <div>Loading...</div>
//       ) : (
//         <div>
//           <table>
//             <thead>
//               <tr>
//                 <th>User</th>
//                 <th>Day</th>
//                 <th>Date</th>
//                 <th>Duration</th>
//                 <th>Link</th>
//                 <th>Project</th>
//                 <th>Status</th>
//                 <th>Task</th>
//               </tr>
//             </thead>
//             <tbody>
//               {reportData.map((report, index) => (
//                 <tr key={index}>
//                   <td>{report.user.username}</td>
//                   {Object.keys(report.report).map((dayOfWeek) => (
//                     <React.Fragment key={dayOfWeek}>
//                       <td>{dayOfWeek}</td>
//                       {report.report[dayOfWeek] ? (
//                         <>
//                           <td>{report.report[dayOfWeek].date}</td>
//                           <td>{report.report[dayOfWeek].duration}</td>
//                           <td>{report.report[dayOfWeek].link}</td>
//                           <td>{report.report[dayOfWeek].project}</td>
//                           <td>{report.report[dayOfWeek].status}</td>
//                           <td>{report.report[dayOfWeek].task}</td>
//                         </>
//                       ) : (
//                         <td>No report for this day</td>
//                       )}
//                     </React.Fragment>
//                   ))}
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}
//     </div>
//   );
// };

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export const ViewAllReports = ({ adminAccessToken }) => {
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
      <br />
      <Link to="/ViewSpecificReport">View Specific Reports</Link>

      {loading ? (
        <div>Loading...</div>
      ) : (
        <div>
          {reportData.map((report, index) => (
            <div key={index}>
              <h2>User: {report.user.username}</h2>
              {Object.keys(report.report).map((dayOfWeek) => (
                <div key={dayOfWeek}>
                  <label>{dayOfWeek}:</label>
                  {report.report[dayOfWeek] ? (
                    <>
                      <input
                        type="text"
                        value={report.report[dayOfWeek].date}
                        readOnly
                      />
                      <input
                        type="text"
                        value={report.report[dayOfWeek].duration}
                        readOnly
                      />
                      <input
                        type="text"
                        value={report.report[dayOfWeek].link}
                        readOnly
                      />
                      <input
                        type="text"
                        value={report.report[dayOfWeek].project}
                        readOnly
                      />
                      <input
                        type="text"
                        value={report.report[dayOfWeek].status}
                        readOnly
                      />
                      <input
                        type="text"
                        value={report.report[dayOfWeek].task}
                        readOnly
                      />
                    </>
                  ) : (
                    <div>No report for this day</div>
                  )}
                </div>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};


