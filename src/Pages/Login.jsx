import React, { useState } from 'react';
import '../Styles/Signup.css';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ClipLoader } from 'react-spinners';

const baseUrl = "https://musify-backend-tdth.onrender.com";

function Login() {
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });
    const [loading, setLoading] = useState(false); // Add loading state variable

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const login = async () => {
        setLoading(true); // Set loading to true when login process starts
        try {
            const response = await fetch(`${baseUrl}/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });
    
            const responseData = await response.json();
            
            if (response.ok) {
                localStorage.setItem("auth-token", responseData.token);
                toast.success('Login successful!', {
                    autoClose: 1000,
                    className: "logintoast"
                });
                window.location.replace('/');
            } else {
                throw new Error(responseData.error || "Failed to login");
            }
        } catch (error) {
            toast.error(error.message || "Login failed. Please try again later.", {
                autoClose: 1000,
                className: 'logintoast',
                position: "top-center",
                theme: "dark",
            });
        } finally {
            setLoading(false); // Set loading to false when login process ends
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <>
            <ToastContainer />
            <div className="signup-container">
                <div className="form-wrapper">
                    <form onSubmit={(e) => e.preventDefault()}>
                        <div className="form">
                            <input type="text" className="Input-box" required="required" name="email" value={formData.email} onChange={handleChange} />
                            <span>Email</span>
                        </div>
                        <div className="form">
                            <input type={showPassword ? "text" : "password"} className="Input-box" required="required" name="password" value={formData.password} onChange={handleChange} />
                            <span>Password</span>
                            <i className={`fa fa-eye${showPassword ? "-slash" : ""} eye-icon`} onClick={togglePasswordVisibility}></i>
                        </div>
                        <div className="button-container">
                            <button className="login-button" onClick={login} disabled={loading}>
                                {loading ? (
                                    <>
                                        <ClipLoader color={"#ffffff"} loading={true} size={25} />
                                        {/* <span>Logging In...</span> */}
                                    </>
                                ) : (
                                    "Login"
                                )}
                            </button>
                        </div>
                        <div className="login-link">
                            <span>Don't have an account? <Link to='/signUp'>Sign Up</Link></span>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}

export default Login;
