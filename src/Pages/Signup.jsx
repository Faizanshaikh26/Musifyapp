import React, { useState } from 'react';
import '../Styles/Signup.css';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ClipLoader } from 'react-spinners'; // Import ClipLoader from react-spinners

const baseUrl = "https://musify-backend-tdth.onrender.com";

const Signup = () => {
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        showPassword: false
    });

    const [loading, setLoading] = useState(false); // State variable to track loading state

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const togglePasswordVisibility = () => {
        setFormData({ ...formData, showPassword: !formData.showPassword });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    };

    const signup = async () => {
        try {
            setLoading(true); // Set loading state to true when signup process starts

            let responseData;

            const response = await fetch(`${baseUrl}/signup`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            responseData = await response.json();

            if (response.ok) {
                localStorage.setItem("auth-token", responseData.token);
                window.location.replace("/");
            } else {
                toast.error(responseData.error, { autoClose: 1000, className: "logintoast" });
            }
        } catch (error) {
            toast.error("Signup failed. Please try again later.", {
                autoClose: 1000,
                className: 'logintoast',
                position: "top-center",
                theme: "dark",
            });
        } finally {
            setLoading(false); // Set loading state back to false when signup process completes
        }
    }

    return (
        <>
            <ToastContainer />
            <div className="signup-container">
                <div className="form-wrapper">
                    <form onSubmit={handleSubmit}>
                        <div className="form">
                            <input type="text" className="Input-box" required="required" name="username" value={formData.username} onChange={handleChange} />
                            <span>Username</span>
                        </div>
                        <div className="form">
                            <input type="text" className="Input-box" required="required" name="email" value={formData.email} onChange={handleChange} />
                            <span>Email</span>
                        </div>
                        <div className="form">
                            <input type={formData.showPassword ? "text" : "password"} className="Input-box" required="required" name="password" value={formData.password} onChange={handleChange} autoComplete="current-password" />
                            <span>Password</span>
                            <i className={`fa fa-eye${formData.showPassword ? "-slash" : ""} eye-icon`} onClick={togglePasswordVisibility}></i>
                        </div>
                        <div className="button-container">
                            <button className="login-button" onClick={signup} disabled={loading}>
                                {loading ? (
                                    <>
                                        <ClipLoader color={"#ffffff"} loading={true} size={25} />
                                        {/* <span>Signing Up...</span> */}
                                    </>
                                ) : (
                                    "Sign Up"
                                )}
                            </button>
                        </div>
                    </form>
                    <div className="login-link">
                        <span>Already have an account? <Link to='/login'>Log in</Link></span>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Signup;
