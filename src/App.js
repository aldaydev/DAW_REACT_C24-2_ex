import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';
import Header from './components/Header';
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import { useContext } from "react";
import { DataProvider } from "./context/DataContext";
import { DataContext } from "./context/DataContext";
import User from "./pages/User";

function App() {
  //Rescatamos categories de DataContext
  const {categories} = useContext(DataContext);

  return (
    //Proveemos del contexto a toda la app
    <DataProvider>
      {/* Englobamos todo en Router */}
      <Router>
        <div className="App">
          <Header/>
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
              <Route path="/login" element={<User/>}/>
            </Routes>
          </main>
          <Footer/>
        </div>
      </Router>
    </DataProvider>

  );
}

export default App;
