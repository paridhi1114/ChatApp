import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios"; // missing import fixed
import { useAuth } from "../context/AuthProvider";
import { Link } from "react-router-dom";

function Login() {
  const [authUser, setAuthUser] = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const userInfo = {
      email: data.email,
      password: data.password,
    };

    axios
      .post("/api/user/login", userInfo)
      .then((response) => {
        console.log(response.data);
        if (response.data) {
          alert("Login successful");
        }
        localStorage.setItem("ChatApp", JSON.stringify(response.data));
        setAuthUser(response.data);
      })
      .catch((error) => {
        if (error.response) {
          alert("Error: " + error.response.data.error);
        }
      });
  };

  return (
    <div className="flex h-screen items-center justify-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="border border-white px-6 py-2 rounded-md space-y-3 w-96"
      >
        <h1 className="text-2xl text-center">
          Chat <span className="text-green-500 font-semibold">App</span>
        </h1>

        <h2 className="text-xl text-white font-bold">Login</h2>

        {/* Email */}
        <label className="input validator">
          <input
            type="email"
            placeholder="Email"
            required
            {...register("email", { required: true })}
          />
        </label>
        {errors.email && <span className="text-red-400 text-sm">Email is required</span>}

        {/* Password */}
        <label className="input validator">
          <input
            type="password"
            placeholder="Password"
            required
            minLength={8} // fixed React attribute
            pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
            title="Must be 8+ characters, include number, lowercase & uppercase"
            {...register("password", { required: true })}
          />
        </label>
        {errors.password && <span className="text-red-400 text-sm">Password is required</span>}

        {/* Signup Text & Submit */}
        <div className="flex justify-between items-center">
          <p>
            New user?
            <Link to="/signup" className="text-blue-500 underline cursor-pointer ml-1">Signup</Link>
          </p>

          <input
            type="submit"
            value="Login"
            className="text-white bg-green-500 px-2 py-1 cursor-pointer rounded-lg"
          />
        </div>
      </form>
    </div>
  );
}

export default Login;
