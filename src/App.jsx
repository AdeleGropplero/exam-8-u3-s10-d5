/* import { useState } from "react";
 */
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import MyNavBar from "./Components/MyNavBar";
import MyFooter from "./Components/MyFooter";
import MyHome from "./Components/MyHome";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MyDetails from "./Components/MyDetails";

function App() {
  return (
    <>
      <BrowserRouter>
        <MyNavBar />
        <Routes>
          <Route path="/" element={<MyHome />} />
          <Route path="/detail/:lat/:lon" element={<MyDetails />} />
        </Routes>
        <MyFooter />
      </BrowserRouter>
    </>
  );
}

export default App;
