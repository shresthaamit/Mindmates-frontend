import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { useState, useEffect } from "react";
import "react-toastify/dist/ReactToastify.css";
import Home from "./pages/Home";
import Signup from "./pages/Signup.jsx";
import Login from "./pages/Login.jsx";
import AllNav from "./components/navbar/AllNav.jsx";
import Footer from "./components/Footer/Footer.jsx";
import ProfilePage from "./pages/Profile.jsx";
import UserNav from "./components/navbar/UserNav.jsx";
import AskQuestion from "./pages/QuestionForm.jsx";
import QuestionDetail from "./pages/QuestionDetail.jsx";
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(
    !!localStorage.getItem("accessToken")
  );

  const accessToken = localStorage.getItem("accessToken");
  // React to login/logout by listening to localStorage changes
  useEffect(() => {
    const handleStorageChange = () => {
      setIsLoggedIn(!!localStorage.getItem("accessToken"));
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);
  return (
    <Router>
      {isLoggedIn ? <UserNav setIsLoggedIn={setIsLoggedIn} /> : <AllNav />}
      <div style={{ position: "relative", zIndex: 1000 }}>
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
          theme="light" // or "dark"
          style={{ marginTop: "0px" }} // adjust based on your navbar height
        />
      </div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/login"
          element={<Login setIsLoggedIn={setIsLoggedIn} />}
        />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/askquestion" element={<AskQuestion />} />
        <Route
          path="/question/:id"
          element={<QuestionDetail accessToken={accessToken} />}
        />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
