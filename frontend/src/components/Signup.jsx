import React from 'react'
import { useForm } from "react-hook-form"
import axios from "axios"
import { useAuth } from "../context/AuthProvider";
import { Link } from 'react-router-dom';


function Signup() {
   const [authUser, setAuthUser] = useAuth()
   const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  // watch the password and confirm password fields
  const password = watch("password", "");
  const confirmPassword = watch("confirmPassword", "");

  const validatePasswordMatch = (value) => {
    return value === password || "Passwords do not match";
  };


  const onSubmit = async (data) => {
     const userInfo = {
     fullname: data.fullname,
      email: data.email,
      password: data.password,
   confirmPassword: data.confirmPassword,
    };
    // console.log(userInfo);
    await axios.post("/api/user/signup", userInfo)
    .then((response) => {
       console.log(response.data);
       if(response.data) {
         alert("Signup successful");
       }
       localStorage.setItem("ChatApp", JSON.stringify(response.data));
       setAuthUser(response.data);
    })
    .catch((error) => {
      if(error.response){
        alert("Error: "+error.response.data.error)
      }
    })
  };
  return (
    <div className="flex h-screen items-center justify-center">
      <form onSubmit={handleSubmit(onSubmit)}
       className="border border-white px-6 py-2 rounded-md space-y-3 w-96">
        <h1 className="text-2xl text-center">Chat <span className="text-green-500 font-semibold">App</span></h1>
        <h2 className="text-xl text-white font-bold">Signup</h2>
        <br/>
        {/* fullname */}
        <label className="input validator">
  <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
    <g
      strokeLinejoin="round"
      strokeLinecap="round"
      strokeWidth="2.5"
      fill="none"
      stroke="currentColor"
    >
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
      <circle cx="12" cy="7" r="4"></circle>
    </g>
  </svg>
  <input
    type="text"
    required
    placeholder="Username"
    pattern="[A-Za-z][A-Za-z0-9\-]*"
    minLength="3"
    maxLength="30"
    title="Only letters, numbers or dash"
    {...register("fullname", { required: true })}
  />
  </label>
   {errors.fullname && <span>This field is required</span>}

<p>
</p>
{/*email */}
<label className="input validator">
  <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
    <g
      strokeLinejoin="round"
      strokeLinecap="round"
      strokeWidth="2.5"
      fill="none"
      stroke="currentColor"
    >
      <rect width="20" height="16" x="2" y="4" rx="2"></rect>
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
    </g>
  </svg>
  <input type="email" placeholder="Email" required {...register("email", { required: true })}/>
</label>
{errors.email && <span>This field is required</span>}
<div className="validator-hint hidden">Enter valid email address</div>
{/*password */}
<label className="input validator">
  <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
    <g
      strokeLinejoin="round"
      strokeLinecap="round"
      strokeWidth="2.5"
      fill="none"
      stroke="currentColor"
    >
      <path
        d="M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z"
      ></path>
      <circle cx="16.5" cy="7.5" r=".5" fill="currentColor"></circle>
    </g>
  </svg>
  <input
    type="password"
    required
    placeholder="Password"
    minLength="8"
    pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
    title="Must be more than 8 characters, including number, lowercase letter, uppercase letter"
    {...register("password", { required: true })}
  />
</label>
{errors.password && <span>This field is required</span>}
<p className="validator-hint hidden">
  Must be more than 8 characters, including
  <br />At least one number <br />At least one lowercase letter <br />At least one uppercase letter
</p>
{/*confirm password */}
<label className="input validator">
  <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
    <g
      strokeLinejoin="round"
      strokeLinecap="round"
      strokeWidth="2.5"
      fill="none"
      stroke="currentColor"
    >
      <path
        d="M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z"
      ></path>
      <circle cx="16.5" cy="7.5" r=".5" fill="currentColor"></circle>
    </g>
  </svg>
  <input
    type="password"
    required
    placeholder="Confirm Password"
    minLength="8"
    pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
    title="Must be more than 8 characters, including number, lowercase letter, uppercase letter"
    {...register("confirmPassword", { required: true, validate:validatePasswordMatch })}
  />
</label>
{errors.confirmPassword && <span>{errors.confirmPassword.message}</span>}
<p className="validator-hint hidden">
  Must be more than 8 characters, including
  <br />At least one number <br />At least one lowercase letter <br />At least one uppercase letter
</p>
{/*Text & Button */}
<div className="flex justify-between">
  <p>Have an account? 
  <Link to="/login" className="text-blue-500 underline cursor-pointer ml-1">
    Login
    </Link></p>
  <input type="submit"
   value="Signup"
   className="text-white bg-green-500 px-2 py-1 cursor-pointer rounded-lg"
   />
</div>
      </form>
    </div>
  );
}

export default Signup