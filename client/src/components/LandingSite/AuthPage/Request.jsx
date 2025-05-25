import { Input } from "./Input";
import { Link } from "react-router-dom";
import { useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function RequestAcc() {
  const [loading, setLoading] = useState(false);

  const register = async (event) => {
    event.preventDefault();
    setLoading(true);
    
    try {
      // Validate USN format (e.g., 4NI23IS168)
      const usnRegex = /^[1-9][A-Z]{2}[0-9]{2}[A-Z]{2}[0-9]{3}$/;
      if (!usnRegex.test(inputCms.toUpperCase())) {
        toast.error("USN must be in the format 4NI23IS168 (e.g., 4NI23IS168)", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
        });
        setLoading(false);
        return;
      }

      let data = {
        usn_no: inputCms.toUpperCase(),
      };

      console.log("Sending request with data:", data);

      const response = await fetch("http://localhost:3000/api/request/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
      });

      console.log("Response status:", response.status);
      const responseData = await response.json();
      console.log("Response data:", responseData);

      if (responseData.success) {
        toast.success("Request sent successfully", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
        });
        setInputCms(''); // Clear the input after successful request
      } else {
        // Handle different types of error responses
        let errorMessage = "Failed to send request";
        
        if (responseData.errors) {
          if (Array.isArray(responseData.errors)) {
            // If errors is an array, take the first error message
            errorMessage = responseData.errors[0].msg;
          } else if (typeof responseData.errors === 'string') {
            // If errors is a string
            errorMessage = responseData.errors;
          }
        }

        console.error("Request failed:", errorMessage);
        toast.error(errorMessage, {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
        });
      }
    } catch (error) {
      console.error("Error during request:", error);
      toast.error("Failed to send request. Please try again.", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
      });
    } finally {
      setLoading(false);
    }
  };

  const [inputCms, setInputCms] = useState('');
  const changeCms = (event) => {
    setInputCms(event.target.value.toUpperCase());
  }

  const cms = {
    name: "USN",
    type: "text",
    placeholder: "Student USN (e.g., 4NI23IS168)",
    req: true,
    onChange: changeCms,
    maxLength: 10,
    value: inputCms,
  }

  return (
    <div className="w-full rounded-lg md:mt-0 sm:max-w-md xl:p-0 bg-gray-800 border-gray-700">
      <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
        <h1 className="text-xl font-bold leading-tight tracking-tight md:text-2xl text-white">
          Request account from Hostel Manager
        </h1>
        <form className="space-y-4 md:space-y-6" onSubmit={register}>
          <Input field={cms} />
          <button
            type="submit"
            disabled={loading}
            className={`w-full text-white hover:bg-blue-700 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-blue-600 focus:ring-blue-800 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {loading ? 'Sending Request...' : 'Request'}
          </button>
          <p className="text-sm font-light text-gray-400">
            Already have an account?{" "}
            <Link
              to="/auth"
              className="font-medium hover:underline text-blue-500"
            >
              Sign In
            </Link>
          </p>
        </form>
        <ToastContainer
          position="top-center"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />
      </div>
    </div>
  );
}
