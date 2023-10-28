import React, { useState, useEffect } from 'react';

export const UserProfile = () => {
  const [userData, setUserData] = useState({
       firstName: '',
        lastName: '',
        middleName: '',
        email: '',
        username: '',
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUserData() {
      try {
        const response = await fetch(
          'https://timesheet-api-main.onrender.com/user/account/personal-information/',
          {
            method: 'GET',
            headers: {
              'x-api-key': 'a57cca53d2086ab3488b358eebbca2e7',
              'Authorization':
                'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmcmVzaCI6ZmFsc2UsImlhdCI6MTY5Nzg3MTIyOSwianRpIjoiNjdhMTE2YTAtM2UxYy00YjA1LWIyZmUtMmM1ZGJiNzE9IiwidHlwZSI6ImFjY2VzcyIsInN1YiI6IjY1MDhmNjRhODUzMmUzZThlYjI0MmRmYiIsIm5iZiI6MTY5Nzg3MTIyOSwiZXhwIjoxNjk4NDc2MDI5fQ.f9suhTF9IjYXXvzrHND1dQA7mSwXtEpnz2mQP8604pU',
            },
          }
        );

        if (response.status === 200) {
          const data = await response.json();
          setUserData(data.data);
        } else {
          console.error('Failed to fetch user data');
        }

        setLoading(false);
      } catch (error) {
        console.error('An error occurred:', error);
      }
    }
    fetchUserData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>User Personal Information</h1>
      <p>Email: {userData.email}</p>
      <p>First Name: {userData.firstName}</p>
      <p>Last Name: {userData.lastName}</p>
      <p>Middle Name: {userData.middleName}</p>
      <p>Username: {userData.username}</p>
    </div>
  );
}


