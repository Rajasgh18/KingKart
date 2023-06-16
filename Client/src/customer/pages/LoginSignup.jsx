import React, { useEffect, useRef, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {TailSpin} from 'react-loader-spinner';
import axios from 'axios';

const LoginSignup = () => {
  const logoRef = useRef();
  const signupRef = useRef();
  const loginRef = useRef();
  const validationRef = useRef();
  const pageName = useLocation().pathname;
  const [loginCred, setLoginCred] = useState({ username: '', password: '' });
  const [signupCred, setSignupCred] = useState({ name: '', username: '', password: '', confirmPassword: '' });
  const [isLoader, setIsLoader] = useState(false);
  const Navigate = useNavigate();

  useEffect(() => {
    if (pageName === '/login') {
      loginRef.current.style.transform = 'translate(-100%)';
      logoRef.current.style.transform = 'translate(100%)';
      logoRef.current.style.borderTopRightRadius = '0.5rem';
      logoRef.current.style.borderTopLeftRadius = '0';
      logoRef.current.style.borderBottomRightRadius = '0.5rem';
      logoRef.current.style.borderBottomLeftRadius = '0';
    }
    else {
      signupRef.current.style.transform = 'translate(0%)';
      logoRef.current.style.transform = 'translate(0%)';
      logoRef.current.style.borderTopRightRadius = '0';
      logoRef.current.style.borderTopLeftRadius = '0.5rem';
      logoRef.current.style.borderBottomRightRadius = '0';
      logoRef.current.style.borderBottomLeftRadius = '0.5rem';
    }
  }, [pageName]);

  const handleChange = (e) => {
    if (pageName === '/login') {
      setLoginCred({ ...loginCred, [e.target.name]: e.target.value });
      setSignupCred({ name: '', username: '', password: '', confirmPassword: '' });
    } else {
      setSignupCred({ ...signupCred, [e.target.name]: e.target.value });
      setLoginCred({ username: '', password: '' });;
    }
  }

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoader(true);
    validationRef.current.innerHTML = '';
    try {
      const res = await axios.post(`http://localhost:5000/api/user/login`, loginCred);
      localStorage.setItem('userId', res.data.user._id);
      setIsLoader(false);
      Navigate('/');
    } catch (error) {
      validationRef.current.innerHTML = error.response.data;
      setIsLoader(false);
    }
  }
  const handleSignup = async (e) => {
    e.preventDefault();
    setIsLoader(true);
    try {
      if(signupCred.password.length <= 4) validationRef.current.innerHTML = 'Please enter password more than 4 letters'
      else if(signupCred.confirmPassword === signupCred.password){
        validationRef.current.innerHTML = '';
        const res = await axios.post('http://localhost:5000/api/user/', {name: signupCred.name, username: signupCred.username, password: signupCred.password});
        localStorage.setItem('userId', res.data.user._id);
        setIsLoader(false);
        Navigate('/');
      }else{
        setIsLoader(falsew)
        validationRef.current.innerHTML = 'Password does not match';
      }
    } catch (error) {
      validationRef.current.innerHTML = error.response.data;
      setIsLoader(false);
    }
  }

  return (
    <section className='min-h-screen w-full shadow-xl flex items-center justify-center'>
      <section className='h-[550px] w-[60%] flex bg-opacity-20 rounded-lg shadow-[0_0_20px] shadow-slate-300'>
        <aside ref={logoRef} className='transition-all z-10 duration-700 ease-in-out w-1/2 h-full rounded-tl-lg rounded-bl-lg font-viga text-white flex text-6xl bg-gradient-to-br from-violet-400 via-blue-400 to-pink-400 justify-center items-center'>KingKart</aside>
        {pageName === '/login' ? <form onSubmit={handleLogin} ref={loginRef} className='transition-all duration-700 ease-in-out w-1/2 flex flex-col gap-3 p-6 text-slate-700'>
          <label htmlFor="loginusername" className='font-viga text-slate-600'>Username</label>
          <input name='username' value={loginCred.username} id='loginusername' onChange={handleChange} placeholder='Enter Username' type="text" className='rounded-lg p-2 border-2 border-slate-300 focus:outline-blue-500 bg-opacity-30 bg-slate-300' />
          <label htmlFor="loginPassword" className='font-viga text-slate-600 mt-4'>Password</label>
          <input name='password' value={loginCred.password} id='loginPassword' onChange={handleChange} placeholder='Enter Password' type="password" className='rounded-lg p-2 border-2 border-slate-300 focus:outline-blue-500 bg-opacity-30 bg-slate-300' />
          <span className='text-right text-blue-600'>Forgot Password?</span>
          <span ref={validationRef} className='text-red-600 text-center'></span>
          <button className='p-3 px-4 bg-blue-400 hover:bg-blue-500 my-2 rounded-lg flex text-lg justify-center text-white'>{!isLoader ? "Login": <TailSpin height={29} width={29} color='white' />}</button>
          <div className='text-lg flex justify-center gap-1'>
            <span>If no account exists?</span>
            <Link to="/signup" className='text-blue-600 hover:text-blue-800'>Sign Up</Link>
          </div>
        </form> :
          <form onSubmit={handleSignup} ref={signupRef} className='transition-all duration-700 ease-in-out w-1/2 flex flex-col gap-2 p-6 text-slate-700'>
            <label htmlFor="signupName" className='font-viga text-slate-600'>Name</label>
            <input name='name' value={signupCred.name} id='signupName' onChange={handleChange} placeholder='Enter Your Full Name' type="text" className='rounded-lg p-2 border-2 border-slate-300 focus:outline-blue-500 bg-opacity-30 bg-slate-300' />
            <label htmlFor="signupUsername" className='font-viga text-slate-600'>Username</label>
            <input name='username' value={signupCred.username} id='signupUsername' onChange={handleChange} placeholder='Enter Username' type="text" className='rounded-lg p-2 border-2 border-slate-300 focus:outline-blue-500 bg-opacity-30 bg-slate-300' />
            <label htmlFor="signupPassword" className='font-viga text-slate-600'>Password</label>
            <input name='password' value={signupCred.password} id='signupPassword' onChange={handleChange} placeholder='Enter Password' type="password" className='rounded-lg p-2 border-2 border-slate-300 focus:outline-blue-500 bg-opacity-30 bg-slate-300' />
            <label htmlFor="signupConfirmPassword" className='font-viga text-slate-600'>Confirm Password</label>
            <input name='confirmPassword' value={signupCred.confirmPassword} id='signupConfirmPassword' onChange={handleChange} placeholder='Confirm Password' type="password" className='rounded-lg p-2 border-2 border-slate-300 focus:outline-blue-500 bg-opacity-30 bg-slate-300' />
            <span ref={validationRef} className='text-red-600 text-center'></span>
            <button className='p-3 px-4 bg-blue-400 hover:bg-blue-500 my-2 flex justify-center rounded-lg text-xl text-white'>{!isLoader ? "Signup": <TailSpin height={29} width={29} color='white' />}</button>
            <div className='text-lg flex justify-center gap-1'>
              <span>If account already exists?</span>
              <Link to="/login" className='text-blue-600 hover:text-blue-800'>Login</Link>
            </div>
          </form>
        }
      </section>
    </section>
  )
}

export default LoginSignup