// import React, { useState } from 'react';
// import axios from 'axios';

// export const ViewAllReports = () => {
//   const [reportData, setReportData] = useState({
//     date: '',
//     project: '',
//     task: '',
//     link: '',
//     status: '',
//     duration: '',
//   });

//   const [responseMessage, setResponseMessage] = useState('');
//   const [isReportRecorded, setIsReportRecorded] = useState(false);
//   const navigateToAnotherPage = () => {
//   window.location.href = 'another-page-url';

//   const handleChange = (event) => {
//     const { name, value } = event.target;
//     setReportData({ ...reportData, [name]: value });
//   };

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     try {
//       const response = await axios.post(
//         'https://timesheet-api-main.onrender.com/record/report',
//         reportData,
//         {
//           headers: {
//             'x-api-key': 'a57cca53d2086ab3488b358eebbca2e7',
//             Authorization: 'Bearer <user_access_token>', // Replace with the actual user access token
//           },
//         }
//       );

//       setResponseMessage(response.data.message);
//       setIsReportRecorded(true);
//     } catch (error) {
//       console.error('Error recording report:', error);
//       setResponseMessage('Error recording report.');
//     }
//   };

//   return (
//     <div>
//       <h1>Record Report</h1>
//       <form onSubmit={handleSubmit}>
//         <div>
//           <label>Date:</label>
//           <input
//             type="date"
//             name="date"
//             value={reportData.date}
//             onChange={handleChange}
//             required
//           />
//         </div>
//         <div>
//           <label>Project:</label>
//           <input
//             type="text"
//             name="project"
//             value={reportData.project}
//             onChange={handleChange}
//             required
//           />
//         </div>
//         <div>
//           <label>Task:</label>
//           <input
//             type="text"
//             name="task"
//             value={reportData.task}
//             onChange={handleChange}
//             required
//           />
//         </div>
//         <div>
//           <label>Link:</label>
//           <input
//             type="url"
//             name="link"
//             value={reportData.link}
//             onChange={handleChange}
//             required
//           />
//            {reportData.link && (
//     <a href={reportData.link} target="_blank" rel="noopener noreferrer">
//       Open Link
//       </a>
//        )}
//         </div>
//         <div>
//           <label>Status:</label>
//           <input
//             type="text"
//             name="status"
//             value={reportData.status}
//             onChange={handleChange}
//             required
//           />
//         </div>
//         <div>
//           <label>Duration:</label>
//           <input
//             type="text"
//             name="duration"
//             value={reportData.duration}
//             onChange={handleChange}
//             required
//           />
//         </div>
//         {/* <button type="submit">Submit Report</button>*/} 
//         <button onClick={navigateToAnotherPage}>Go to Another Page</button>
//       </form>
//       {isReportRecorded && <p>{responseMessage}</p>}
//     </div>
//   );
// };

import React, { useState } from 'react';
import axios from 'axios';

export const ViewAllReports = () => {
  const [reportData, setReportData] = useState({
    date: '',
    project: '',
    task: '',
    link: '',
    status: '',
    duration: '',
  });

  const [responseMessage, setResponseMessage] = useState('');
  const [isReportRecorded, setIsReportRecorded] = useState(false);

  // Define the navigateToAnotherPage function
  const navigateToAnotherPage = () => {
    window.location.href = 'ViewAllReports';
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setReportData({ ...reportData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        'https://timesheet-api-main.onrender.com/record/report',
        reportData,
        {
          headers: {
            'x-api-key': 'a57cca53d2086ab3488b358eebbca2e7',
            Authorization: 'Bearer <user_access_token>', // Replace with the actual user access token
          },
        }
      );

      setResponseMessage(response.data.message);
      setIsReportRecorded(true);
    } catch (error) {
      console.error('Error recording report:', error);
      setResponseMessage('Error recording report.');
    }
  };

  return (
    <div>
      <h1>Record Report</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Date:</label>
          <input
            type="date"
            name="date"
            value={reportData.date}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Project:</label>
          <input
            type="text"
            name="project"
            value={reportData.project}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Task:</label>
          <input
            type="text"
            name="task"
            value={reportData.task}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Link:</label>
          <input
            type="url"
            name="link"
            value={reportData.link}
            onChange={handleChange}
            required
          />
          {reportData.link && (
            <a href={reportData.link} target="_blank" rel="noopener noreferrer">
              Open Link
            </a>
          )}
        </div>
        <div>
          <label>Status:</label>
          <input
            type="text"
            name="status"
            value={reportData.status}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Duration:</label>
          <input
            type="text"
            name="duration"
            value={reportData.duration}
            onChange={handleChange}
            required
          />
        </div>
        {/* <button type="submit">Submit Report</button> */}
        <button onClick={navigateToAnotherPage}>Go to Another Page</button>
      </form>
      {isReportRecorded && <p>{responseMessage}</p>}
    </div>
  );
};
