
// import Reg from './components/Reg'
// import Header from './Components/header/Header'
// import Footer from './components/footer/Footer'
// const LazyContact = React.lazy(() => import("./components/Contact"));
// import About from './components/About'
// import CounterP from './components/CounterP'
// import Error from './components/Error'
// import Product from './Components/Product'
// import { Route, Routes } from 'react-router-dom'
// import Courses from './components/Courses'
// import YouTube from "./components/YouTube"
// import Certificates from "./components/Certificates"
// import Home from './components/Home'


import React, { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Navbar from "./Components/Navbar/Navbar";
import Login from "./Components/Login";
import Home from "./Components/Home";
import Language from "./Components/Language";
import Courses from "./Components/Courses";
import Products from "./Components/Products";
import CounterP from "./Components/CounterP";
import Contact from "./Components/Contact";
import About from "./Components/About";
import CrudForm from "./Components/Form";

function App() {
  const [search, setSearch] = useState("");
  const isLoggedIn = localStorage.getItem("login") === "true";

  if (!isLoggedIn) {
    return <Login />;
  }

  return (
    <>
      <Navbar search={search} setSearch={setSearch} />

      <div className="container mx-auto px-4 py-4">
        <Routes>
          <Route path="/" element={<Navigate to="/home" replace />} />

          <Route
            path="/home"
            element={<Home search={search} />}
          />

          <Route path="/courses" element={<Courses />} />

          <Route
            path="/product"
            element={<Products search={search} />}
          />

          <Route path="/counter" element={<CounterP />} />

          <Route path="/contact" element={<Contact />} />

          <Route
            path="/about"
            element={<About info="KIET MCA 3rd D WD" />}
          />

          <Route path="*" element={<Navigate to="/home" replace />} />
        </Routes>
      </div>
    </>
  );
}

export default App;


  // <div className='container'>
  //   <Header/>
  //   <Routes>
  //     <Route path="/" element={<Home/>}/>
  //     <Route path="/reg" element={<Reg/>}/>
  //     <Route path="/counter" element={<CounterP/>}/>
  //     <Route path="/courses" element={<Courses/>}>
  //       <Route index element={<YouTube/>}/>
  //       <Route path="youtube" element={<YouTube/>}/>
  //       <Route path="certificate" element={<Certificates/>}/>
  //     </Route>
  //     <Route path="/contact"
  //       element={<Suspense fallback={<h2>Loading...</h2>}>
  //         <LazyContact/>
  //       </Suspense>}/>
  //     <Route path="/about/" element={<About info="KIET MCA 3rd D WD"/>}/>
  //     <Route path="/product" element={<Product/>}/>
  //     <Route path="/*" element={<Error/>}/>
  //   </Routes>
  //   <Footer/>
  // </div>

