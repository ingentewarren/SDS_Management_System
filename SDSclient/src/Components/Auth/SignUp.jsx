import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import { toast } from 'react-hot-toast'
import { useNavigate } from 'react-router'

const SignUp = () => {
  const [user, setUser] = useState({
    firstname: '',
    lastname: '',
    email: '',
    password: ''
  })

  const navigate = useNavigate()
  const [isInputFirstname, setInputFirstname] = useState(false)
  const [isInputLastname, setInputLastname] = useState(false)
  const [isInputEmail, setInputEmail] = useState(false)
  const [isInputPassword, setInputPassword] = useState(false)


  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const { firstname, lastname, email, password } = user;
  
    try {
      const { data } = await axios.post('/register', {
        firstname,
        lastname,
        email,
        password
      });
  
      if (data.error) {
        toast.error(data.error);
      } else {
        setUser({
          firstname: '',
          lastname: '',
          email: '',
          password: ''
        });
        toast.success('Sign up success');
        navigate('/');
      }
    } catch (error) {
      console.log('register error', error);
    }
  };
  
  return (
    <div className=' w-full h-screen bg-white flex justify-center items-center'>
      <div className=' flex flex-col bg-gray-200 h-auto w-[400px] rounded-lg '>
        <div className=' h-full px-10 my-4 font-poppins text-2xl flex justify-center font-semibold pb-8 text-slate-800'>
          Create new account
        </div>
        <form action="" onSubmit={handleSubmit}>
         <div className=' flex flex-col sm:px-10 relative pb-1'>
            <label htmlFor="firstname" className=' font-semibold'>Firstname</label> 
            <input type="text" id='firstname' className=' block border border-grey-light w-full p-3 rounded mb-4'
            autoComplete='off'
            placeholder='Enter firstname'
            name="firstname"
            value={user.firstname}
            onChange={(e) => setUser({...user, firstname: e.target.value})}
            onFocus={() => setInputFirstname(true)}
            onBlur={() => setInputFirstname(false)}/>
          </div>
          <div className=' flex flex-col sm:px-10 relative pb-1'>
            <label htmlFor="lastname" className=' font-semibold'>Lastname</label> 
            <input type="text" id='lastname' className=' block border border-grey-light w-full p-3 rounded mb-4'
            autoComplete='off'
            placeholder='Enter lastname'
            name='lastname'
            value={user.lastname}
            onChange={(e) => setUser({...user, lastname: e.target.value})}
            onFocus={() => setInputLastname(true)}
            onBlur={() => setInputLastname(false)}/>
          </div>
          <div className=' flex flex-col sm:px-10 relative pb-1'>
            <label htmlFor="email" className=' font-semibold'>Email</label>    
            <input type="text" id='email' className=' block border border-grey-light w-full p-3 rounded mb-4'
            autoComplete='off'
            placeholder='Enter email'
            name='email'
            value={user.email}
            onChange={(e) => setUser({...user, email: e.target.value})}
            onFocus={() => setInputEmail(true)}
            onBlur={() => setInputEmail(false)}/>
          </div>
          <div className=' flex flex-col sm:px-10 relative pb-1'>
            <label htmlFor="password" className=' font-semibold'>Password</label>      
            <input type="password" id='password' className=' block border border-grey-light w-full p-3 rounded mb-4'
            autoComplete='off'
            placeholder='Enter password'
            name='password'
            value={user.password}
            onChange={(e) => setUser({...user, password: e.target.value})}
            onFocus={() => setInputPassword(true)}
            onBlur={() => setInputPassword(false)}/>
          </div>
          <div className="flex items-center pb-8 sm:px-10">
              <input id="link-checkbox" type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
              <label htmlFor="link-checkbox" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">I agree with the <a href="#" className="text-blue-600 dark:text-blue-500 hover:underline">terms and conditions</a>.</label>
          </div>
          <div className=' sm:px-10'>
            <button className=' bg-button-color w-full h-10 text-white font-palanquin font-normal tracking-wide'>CREATE</button>
          </div>
        </form>
        <div className=' w-full sm:px-10 flex gap-5 justify-center py-10'>
          <span className=' text-[#8492a5]'>
            Already have account?</span>
          <a href="/" className=' text-button-color font-bold'>
            Sign in</a>
        </div>
      </div>
    </div>
  )
}

export default SignUp