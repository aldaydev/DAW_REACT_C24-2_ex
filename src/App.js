import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';
import Header from './components/Header';
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import { useEffect, useState, useContext } from "react";
import { DataProvider } from "./context/DataContext";
import { DataContext } from "./context/DataContext";

function App() {

  const {categories} = useContext(DataContext);

  return (
    <DataProvider>
      <Router>
        <div className="App">
          <Header catList={categories.reduce((acc,curr)=>{
            let catArr = [];
            catArr.push(curr[0]);
            catArr.push(curr[1]);
            acc.push(catArr);
            return acc;
          }, [])}
          />
          <main className="App-main">
            <Routes>
              <Route
                path="/"
                element={<Home/>}
              />
              {categories.map((category, index)=>{
                return <Route key={index} path={`/${category[1]}`} element={category[3]}/>
              })}
              <Route path="/cart" element={<Cart/>}/>
            </Routes>
          </main>
          <Footer/>
        </div>
      </Router>
    </DataProvider>

  );
}

export default App;
