const verifysession = async () => {
    try {
      let response = await fetch("http://localhost:3000/api/auth/verifysession", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({token: localStorage.getItem("token")})
      });

      let result = await response.json();
      if (result.success) {
        if (result.data.isAdmin) {
          window.location.href = "/admin-dashboard";
        } else {
          window.location.href = "/student-dashboard";
        }
      } else {
        localStorage.removeItem("token");
        localStorage.removeItem("student");
        localStorage.removeItem("admin");
      }
    } catch (error) {
      console.error("Session verification failed:", error);
      localStorage.removeItem("token");
      localStorage.removeItem("student");
      localStorage.removeItem("admin");
    }
  };

  export default verifysession;