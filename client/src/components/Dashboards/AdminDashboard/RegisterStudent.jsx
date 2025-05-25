import { useState } from "react";
import { Input } from "./Input";
import { Button } from "../Common/PrimaryButton";
import { Loader } from "../Common/Loader";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function RegisterStudent() {
  const registerStudent = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      
      // Validate USN format (e.g., 4NI23IS168)
      const usnRegex = /^[1-9][A-Z]{2}[0-9]{2}[A-Z]{2}[0-9]{3}$/;
      if (!usnRegex.test(cms.toUpperCase())) {
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

      // Validate Aadhar number (12 digits)
      const aadharRegex = /^[0-9]{12}$/;
      if (!aadharRegex.test(cnic)) {
        toast.error("Aadhar number must be exactly 12 digits", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
        });
        setLoading(false);
        return;
      }

      // Validate contact number (10 digits)
      const contactRegex = /^[0-9]{10}$/;
      if (!contactRegex.test(contact)) {
        toast.error("Contact number must be exactly 10 digits", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
        });
        setLoading(false);
        return;
      }

      // Validate password length
      if (password.length < 8) {
        toast.error("Password must be at least 8 characters long", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
        });
        setLoading(false);
        return;
      }

      // Validate DOB
      const dobDate = new Date(dob);
      const today = new Date();
      const age = today.getFullYear() - dobDate.getFullYear();
      const monthDiff = today.getMonth() - dobDate.getMonth();
      
      // Adjust age if birthday hasn't occurred this year
      const actualAge = monthDiff < 0 || (monthDiff === 0 && today.getDate() < dobDate.getDate()) 
        ? age - 1 
        : age;

      if (isNaN(dobDate.getTime())) {
        toast.error("Please enter a valid date of birth", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
        });
        setLoading(false);
        return;
      }

      if (actualAge < 16 || actualAge > 30) {
        toast.error("Student age must be between 16 and 30 years", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
        });
        setLoading(false);
        return;
      }

      // Validate batch year
      const currentYear = new Date().getFullYear();
      const batchYear = parseInt(batch);
      if (isNaN(batchYear) || batchYear < 2020 || batchYear > currentYear + 4) {
        toast.error(`Batch year must be between 2020 and ${currentYear + 4}`, {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
        });
        setLoading(false);
        return;
      }

      let student = {
        name: name,
        usn_no: cms.toUpperCase(),
        room_no: room_no,
        batch: batch,
        dept: dept,
        course: course,
        email: email,
        father_name: fatherName,
        contact: contact,
        address: address,
        dob: dob,
        aadhar_no: cnic,
        hostel: hostel,
        password: password
      };

      console.log("Sending data to server:", student);

      const res = await fetch("http://localhost:3000/api/student/register-student", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(student),
      });

      console.log("Server response status:", res.status);
      const data = await res.json();
      console.log("Server response data:", data);

      if (data.success) {
        toast.success(
          'Student ' + data.student.name + ' Registered Successfully!', {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
        // Reset form
        setCms("");
        setName("");
        setRoomNo("");
        setBatch("");
        setDept("");
        setCourse("");
        setEmail("");
        setFatherName("");
        setContact("");
        setAddress("");
        setDob("");
        setAadharNo("");
        setPassword("");
      } else {
        // Handle different types of error responses
        if (data.errors) {
          if (Array.isArray(data.errors)) {
            // If errors is an array
            data.errors.forEach((err) => {
              console.log("Error from server:", err);
              toast.error(
                err.msg || "Registration failed", {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
              });
            });
          } else if (typeof data.errors === 'string') {
            // If errors is a string
            toast.error(data.errors, {
              position: "top-center",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
            });
          } else if (typeof data.errors === 'object') {
            // If errors is an object
            Object.values(data.errors).forEach((err) => {
              toast.error(
                err.msg || err || "Registration failed", {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
              });
            });
          }
        } else {
          // If no specific error format is provided
          console.log("No specific errors returned:", data);
          toast.error(
            data.message || "Registration failed. Please check all fields and try again.", {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
          });
        }
      }
    } catch (err) {
      console.error("Error during registration:", err);
      console.error("Error details:", {
        message: err.message,
        stack: err.stack
      });
      toast.error(
        "Server error occurred. Please try again.", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
      });
    } finally {
      setLoading(false);
    }
  };

  // Initialize state with empty strings instead of undefined
  const hostel = JSON.parse(localStorage.getItem("hostel"))?.name || "";
  const [cms, setCms] = useState("");
  const [name, setName] = useState("");
  const [room_no, setRoomNo] = useState("");
  const [batch, setBatch] = useState("");
  const [dept, setDept] = useState("");
  const [course, setCourse] = useState("");
  const [email, setEmail] = useState("");
  const [fatherName, setFatherName] = useState("");
  const [contact, setContact] = useState("");
  const [address, setAddress] = useState("");
  const [dob, setDob] = useState("");
  const [cnic, setAadharNo] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  return (
    <div className="w-full max-h-screen pt-20 flex flex-col items-center justify-center">
      <h1 className="text-white font-bold text-5xl mt-10 mb-5">
        Register Student
      </h1>
      <div className="md:w-[60vw] w-full p-10 bg-neutral-950 rounded-lg shadow-xl mb-10 overflow-auto">
        <form method="post" onSubmit={registerStudent} className="flex flex-col gap-3">
          <div className="flex gap-5 flex-wrap justify-center md:w-full sw-[100vw]">
            <Input
              field={{
                name: "name",
                placeholder: "Student Name",
                type: "text",
                req: true,
                value: name,
                onChange: (e) => setName(e.target.value),
              }}
            />
            <Input
              field={{
                name: "USN",
                placeholder: "Student USN (e.g., 4NI23IS168)",
                type: "text",
                req: true,
                value: cms,
                onChange: (e) => setCms(e.target.value.toUpperCase()),
                maxLength: 9, // Add max length to prevent longer inputs
              }}
            />
            <Input
              field={{
                name: "dob",
                placeholder: "Student Date of Birth (Age: 16-30 years)",
                type: "date",
                req: true,
                value: dob,
                onChange: (e) => setDob(e.target.value),
                max: new Date(new Date().setFullYear(new Date().getFullYear() - 16)).toISOString().split('T')[0],
                min: new Date(new Date().setFullYear(new Date().getFullYear() - 30)).toISOString().split('T')[0],
              }}
            />
            <Input
              field={{
                name: "ADHAAR NO.",
                placeholder: "Student ADHAAR NO. (12 digits)",
                type: "text",
                req: true,
                value: cnic,
                onChange: (e) => setAadharNo(e.target.value),
                maxLength: 12, // Add max length to prevent longer inputs
              }}
            />
          </div>
          <div className="flex gap-5 w-full flex-wrap justify-center">
            <Input
              field={{
                name: "email",
                placeholder: "Student Email",
                type: "email",
                req: true,
                value: email,
                onChange: (e) => setEmail(e.target.value),
              }}
            />
            <Input
              field={{
                name: "contact",
                placeholder: "Student Contact (10 digits)",
                type: "text",
                req: true,
                value: contact,
                onChange: (e) => setContact(e.target.value),
                maxLength: 10, // Add max length to prevent longer inputs
              }}
            />
            <Input
              field={{
                name: "father_name",
                placeholder: "Student's Father Name",
                type: "text",
                req: true,
                value: fatherName,
                onChange: (e) => setFatherName(e.target.value),
              }}
            />
          </div>
          <div className="mx-12">
            <label
              htmlFor="address"
              className="block mb-2 text-sm font-medium text-white"
            >
              Address
            </label>
            <textarea
              name="address"
              placeholder="Student Address"
              required
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="border flex-grow sm:text-sm rounded-lg block w-full p-2.5 bg-neutral-700 border-neutral-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500 outline-none"
            />
          </div>
          <div className="flex flex-wrap gap-5 w-full justify-center">
            <Input
              field={{
                name: "room",
                placeholder: "Student Room (3 digits)",
                type: "number",
                req: true,
                value: room_no,
                onChange: (e) => setRoomNo(e.target.value),
                maxLength: 3, // Add max length to prevent longer inputs
              }}
            />
            <Input
              field={{
                name: "hostel",
                placeholder: "Student Hostel",
                type: "text",
                req: true,
                value: hostel,
                disabled: true,
              }}
            />
            <Input
              field={{
                name: "dept",
                placeholder: "Student Department",
                type: "text",
                req: true,
                value: dept,
                onChange: (e) => setDept(e.target.value),
              }}
            />
          </div>
          <div className="flex flex-wrap justify-center gap-5">
            <Input
              field={{
                name: "course",
                placeholder: "Student Course",
                type: "text",
                req: true,
                value: course,
                onChange: (e) => setCourse(e.target.value),
              }}
            />
            <Input
              field={{
                name: "batch",
                placeholder: `Student Batch (${new Date().getFullYear() - 4}-${new Date().getFullYear() + 4})`,
                type: "number",
                req: true,
                value: batch,
                onChange: (e) => setBatch(e.target.value),
                min: 2020,
                max: new Date().getFullYear() + 4,
              }}
            />
          </div>
          <div className="mx-12">
            <Input
              field={{
                name: "password",
                placeholder: "Student Password (min 8 characters)",
                type: "password",
                req: true,
                value: password,
                onChange: (e) => setPassword(e.target.value),
                minLength: 8,
              }}
            />
          </div>
          <div className="mt-5">
            <Button>
              {loading ? (
                <>
                  <Loader /> Registering...
                </>
              ) : (
                <span>Register Student</span>
              )}
            </Button>
            <ToastContainer
              position="top-center"
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
          </div>
        </form>
      </div>
    </div>
  );
}

export default RegisterStudent;
