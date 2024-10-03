import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Footer from "./components/Footer";
import Navbar from "./components/Nav";
import Home from "./components/Home";
import Signin from "./components/Signin";
import User from "./components/User";
import { Transactions } from "./components/Transactions";

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/sign-in" element={<Signin />} />
          <Route path="/user" element={<User />} />
          <Route path="/transactions" element={<Transactions />} />
        </Routes>
      </BrowserRouter>
      <Footer />
    </>
  );
}

export default App;
