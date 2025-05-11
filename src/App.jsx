import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Signup from "./pages/Signup.jsx";
import AllNav from "./components/navbar/AllNav.jsx";
import Footer from "./components/Footer/Footer.jsx";
function App() {
  return (
    <Router>
      <AllNav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
