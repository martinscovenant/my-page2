import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import {
  faEye,
  faEyeSlash,
  faSpinner,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./Login.css";

export const Login = () => {
  const [loading, setLoading] = useState(false);
  const [isOnline, setIsOnline] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalDisplayDuration, setModalDisplayDuration] = useState(4500);
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [formData, setFormData] = useState({
    username: "admin.root",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  useEffect(() => {
    if (isModalOpen) {
      const modalCloseTimer = setTimeout(() => {
        setIsModalOpen(false);
      }, modalDisplayDuration);
      return () => clearTimeout(modalCloseTimer);
    }
  }, [isModalOpen]);
  const checkNetworkStatus = () => {
    setIsOnline(navigator.onLine);
  };
  useEffect(() => {
    checkNetworkStatus();
    window.addEventListener("online", checkNetworkStatus);
    window.addEventListener("offline", checkNetworkStatus);
    return () => {
      window.removeEventListener("online", checkNetworkStatus);
      window.removeEventListener("offline", checkNetworkStatus);
    };
  }, []);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const [error, setError] = useState(false);
  const [errorMessages, setErrorMessages] = useState([]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (!isOnline) {
      setIsModalOpen(true);
      setLoading(false);
      return;
    }
    if (formData.username.trim() === "" || formData.password.trim() === "") {
      setError(true);
      setLoading(false);
      return;
    } else {
      setError(false);
    }
    const requestData = {
      username: formData.username,
      password: formData.password,
    };
    try {
      const response = await fetch(
        "https://timesheet-api-main.onrender.com/admin/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-api-key": "a57cca53d2086ab3488b358eebbca2e7",
          },
          body: JSON.stringify(requestData),
        }
      );
      if (response.status === 200) {
        const responseData = await response.json();
        sessionStorage.setItem("access_token", responseData.access_token);
        navigate("/view-users");
      } else {
        setError(true);
        setModalMessage("Invalid Username/password⚠️");
        setShowModal(true);
        setTimeout(() => {
          setShowModal(false);
        }, 5000);
        setLoading(false);
      }
    } catch (error) {
      console.error("An error occurred:", error);
      const errorMessage =
        error.response?.data?.message ||
        "An error occurred. Please try again later.";
      setErrorMessages([errorMessage]);
    } finally {
      setLoading(false);
      setError(false);
    }
    setFormData((prevData) => ({
      ...prevData,
      password: "",
    }));
  };
  return (
    <div className="w-100  relative">
      <Helmet>
        <title> SIGN IN </title>
        <link
          rel="icon"
          type="image/png"
          href="./assets/Images/login-icon.jpeg"
        />
      </Helmet>
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center relative">
          <div className="bg-white p-6 rounded-lg w-5/6 absolute top-7">
            <p className="f4 fw6 mb4 tc">{modalMessage}</p>
          </div>
        </div>
      )}
      {isModalOpen && !isOnline && (
        <div className="fixed inset-0 flex items-center justify-center relative">
          <div className="bg-white p-6 rounded-lg w-4/6 absolute top-7">
            <p className="f4 fw6 mb4 tc">No network/WiFi detected!</p>
          </div>
        </div>
      )}
      <div className="login-container shadow-3 pa3 ma3 ba lg-w-60 sm-w-80 mx-auto">
        <p>
          <h1 className="tc f2 fw6 mono"> LOGIN </h1>
        </p>
        <form onSubmit={handleSubmit} className="mw6 center">
          <div className="mb4">
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Username"
              className={`w-100 pa2 ba b--gray br2 outline-0 ${
                error && formData.username.trim() === "" ? "b--red" : ""
              }`}
            />
            {error && formData.username.trim() === "" && (
              <p className="red tc">Username is required</p>
            )}
          </div>
          <div className="mb4">
            <input
              id="password"
              name="password"
              value={formData.password}
              type={showPassword ? "text" : "password"}
              onChange={handleChange}
              placeholder="Password"
              className={`w-100 pa2 ba b--gray br2 outline-0 ${
                error && formData.password.trim() === "" ? "b--red" : ""
              }`}
            />
            {error && formData.password.trim() === "" && (
              <p className="red tc">Password is required</p>
            )}
          </div>
          <button
            onClick={handleSubmit}
            className="bg-gray mx-auto mt2 mb4 pa2 w-50 br-pill"
            disabled={loading}
          >
            {loading ? (
              <div>
                <FontAwesomeIcon icon={faSpinner} spin /> <span> Sign In </span>
              </div>
            ) : (
              "Sign In"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};
