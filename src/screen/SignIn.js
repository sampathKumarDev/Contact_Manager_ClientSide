import React, { useState } from 'react'
import "../screen/signIn.css";
import leftRound from "../asset/Ellipse-31.png";
import rightRound from "../asset/Ellipse-32.png";
import dots_group from "../asset/Dots-Group.png";
import { useNavigate } from 'react-router-dom';

const SignIn = ({setUser, setUserContacts}) => {
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handlePasswordToggle = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e, isSignIn) => {
    e.preventDefault();
    if(isSignIn) {
      const result = await (
        await fetch("https://contact-manager-serverside.onrender.com/signIn", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({
            user: userId,
            password: password,
          }),
        })
      ).json();
      if(result.error) {
        alert(result.message);
      } else {
        setUserContacts(result.contacts);
        setUser(userId);
        navigate('/contacts')
      }
    } else {
      const result = await (
        await fetch("https://contact-manager-serverside.onrender.com/signUp", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({
            user: userId,
            password: password,
          }),
        })
      ).json();
      alert(result.message);
    }
  };

  return (
    <div className='login_container'>
      <img className='leftRount' src={leftRound} alt="Ellipse31" />

      <div className="sub_container">
        <h1 className='logo'>Logo</h1>
        <img className='rightDotsGroup' src={dots_group} alt="dotsgroup" />

        <div className="form_container">
          <p>Enter your credentials to access your account</p>

          <form onSubmit={handleSubmit}>

            <div className='formItem'>
              <label htmlFor="userId">User ID:</label>
              <input type="text" id="userId" name="userId" required value={userId} onChange={(e) => setUserId(e.target.value)} />
            </div>
            <div className='formItem'>
              <label htmlFor="password">Password:</label>
              <input type={showPassword ? 'text' : 'password'} id="password" name="password"required value={password} onChange={(e) => setPassword(e.target.value)} />
              <span className="password-toggle" onClick={handlePasswordToggle}>
                {showPassword ? <i className="fa-solid fa-eye"></i> : <i className="fa-regular fa-eye-slash"></i>}
              </span>
            </div>
            <div>
              <button type="submit" onClick={(e) => handleSubmit(e, true)}>Sign In</button>
              <button type="button" onClick={(e) => handleSubmit(e, false)}>Sign Up</button>
            </div>

          </form>

        </div>

        <img className='leftDotsGroup' src={dots_group} alt="dotsgroup" />
      </div>

      <img className='rightRound' src={rightRound} alt="Ellipse32" />
    </div>
  )
}

export default SignIn