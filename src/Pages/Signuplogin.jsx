import React, { useState } from 'react';


const Signuplogin = () => {
  const [isActive, setIsActive] = useState(false);

  const handleLoginClick = () => {
    setIsActive(true);
  };

  const handleSignupClick = () => {
    setIsActive(false);
  };

  return (
    <section className={`wrapper ${isActive ? 'active' : ''}`}>
      <div className="form signup">
        <header onClick={handleSignupClick}>Signup</header>
        <form action="#">
          <input type="text" placeholder="Full name" required />
          <input type="text" placeholder="Email address" required />
          <input type="password" placeholder="Password" required />
          <div className="checkbox">
            <input type="checkbox" id="signupCheck" />
            <label htmlFor="signupCheck">I accept all terms & conditions</label>
          </div>
          <input type="submit" value="Signup" />
        </form>
      </div>

      <div className="form login">
        <header onClick={handleLoginClick}>Login</header>
        <form action="#">
          <input type="text" placeholder="Email address" required />
          <input type="password" placeholder="Password" required />
          <a href="#">Forgot password?</a>
          <input type="submit" value="Login" />
        </form>
      </div>
    </section>
  );
};

export default Signuplogin;
