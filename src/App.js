import "./App.css";
import SingleProduct from "./Components/SingleProduct";
import Home from "./Components/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import RegisterPage from "./Components/RegisterPage";
import Login from "./Components/Login";
// console.log(recipes);
const App = () => {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<RegisterPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/Home/:userId" element={<Home />} />
          <Route path="/meal/:id" element={<SingleProduct />} />
        </Routes>
      </Router>
    </div>
  );
};
export default App;
