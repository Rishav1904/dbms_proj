import { Input } from "./Input";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { verifysession } from "../../../utils/";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Loader } from "../../Dashboards/Common/Loader";
import { motion } from "framer-motion";

export default function SignIn() {
  let navigate = useNavigate();

  if (localStorage.getItem("token")) {
    verifysession();
  }

  let login = async (event) => {
    event.preventDefault();
    setLoader(true);
    try {
      let data = {
        email: email,
        password: pass,
      };

      let response = await fetch("http://localhost:3000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
      });

      let result = await response.json();

      if (result.success) {
        localStorage.setItem("token", result.data.token);
        let student = await fetch("http://localhost:3000/api/student/get-student", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            isAdmin: result.data.user.isAdmin,
            token: result.data.token})
        });

        let studentResult = await student.json();
        if (studentResult.success) {
          localStorage.setItem("student", JSON.stringify(studentResult.student));
          navigate("/student-dashboard");
        } else {
          toast.error(
            studentResult.errors || "Failed to fetch student data", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          });
        }
      } else {
        toast.error(
          result.errors[0].msg, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      }
    } catch (error) {
      toast.error(
        "An error occurred during login. Please try again.", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    } finally {
      setLoader(false);
    }
  };

  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [loader, setLoader] = useState(false)

  const changeEmail = (event) => {
    setEmail(event.target.value);
  };
  const changePass = (event) => {
    setPass(event.target.value);
  };

  const iemail = {
    name: "email",
    type: "email",
    placeholder: "abc@gmail.com",
    req: true,
    onChange: changeEmail,
  };
  const password = {
    name: "password",
    type: "password",
    placeholder: "••••••••",
    req: true,
    onChange: changePass,
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full rounded-xl md:mt-0 sm:max-w-md xl:p-0 bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 shadow-2xl"
    >
      <div className="p-8 space-y-6">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-2xl font-bold leading-tight tracking-tight md:text-3xl text-white text-center"
        >
          Welcome Back
        </motion.h1>
        <p className="text-gray-400 text-center">Sign in to access your account</p>
        <form className="space-y-6" onSubmit={login}>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Input field={iemail} />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Input field={password} />
          </motion.div>
          <div className="flex items-center justify-between">
            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  id="remember"
                  aria-describedby="remember"
                  type="checkbox"
                  className="w-4 h-4 border rounded focus:ring-3 bg-gray-700 border-gray-600 focus:ring-blue-600 ring-offset-gray-800"
                />
              </div>
              <div className="ml-3 text-sm">
                <label htmlFor="remember" className="text-gray-300">
                  Remember me
                </label>
              </div>
            </div>
            <Link to="/forgot-password" className="text-sm text-blue-500 hover:text-blue-400">
              Forgot password?
            </Link>
          </div>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            className="w-full text-white focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-3 text-center bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 focus:ring-blue-800 transition-all duration-300 shadow-lg"
          >
            {loader ? (
              <div className="flex items-center justify-center space-x-2">
                <Loader /> <span>Verifying...</span>
              </div>
            ) : (
              <span>Sign in</span>
            )}
          </motion.button>
          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="dark"
          />
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-sm font-light text-gray-400 text-center"
          >
            Don't have an account yet?{" "}
            <Link
              to="/auth/request"
              className="font-medium text-blue-500 hover:text-blue-400 transition-colors duration-300"
            >
              Request an account
            </Link>
          </motion.p>
        </form>
      </div>
    </motion.div>
  );
}
