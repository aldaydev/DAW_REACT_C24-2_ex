import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';
import Header from './components/Header';
import Electronics from './pages/Electronics';
import Jewelery from './pages/Jewelery';
import MensClothing from './pages/MensClothing';
import WomensClothing from './pages/WomensClothing';
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import { useEffect, useState } from "react";

function App() {

  const [categories, setCategories] = useState([]);

  useEffect(()=>{
    async function getCategories(){
      let response = await fetch('https://fakestoreapi.com/products/categories');
      let catData = await response.json();
      const loadedCategories = catData.reduce((acc, curr)=>{
        let catArr = [];
        let catName = curr.toUpperCase();
        catArr.push(catName);
        let catDir = curr.toLowerCase().split("").filter((char)=>{
          return char !== " " && char !== "'";
        });
        catDir = catDir.join('');
        catArr.push(catDir);
        let catUrl = curr.toLowerCase().split("").map((char)=>{
          if(char === " "){
            char = '%20'
          }else if( char === "'"){
            char = "%27"
          }
          return char;
        });
        catUrl = catUrl.join('');
        catUrl = 'https://fakestoreapi.com/products/categories/' + catUrl;
        catArr.push(catUrl);
        acc.push(catArr);
        return acc;
      }, [])
      setCategories(loadedCategories);
    }

    
    getCategories();
  },[])


  return (
    <Router>
        <div className="App">
          <Header/>
          <main className="App-main">
            <Routes>
              {categories.map((category, index)=>{
                return <Route path={`/${category[1]}`}/>
              })}
            </Routes>
            

            {/* <Routes>
                <Route
                  path="/"
                  element={<Home/>}
                />
                <Route 
                  path="/electronics" 
                  element={<Electronics url='https://fakestoreapi.com/products/category/electronics'/>}
                />
                <Route
                  path="/jewelery"
                  element={<Jewelery url='https://fakestoreapi.com/products/category/jewelery'/>}
                />
                <Route
                  path="/mensclothing"
                  element={<MensClothing url='https://fakestoreapi.com/products/category/men%27s%20clothing'/>}
                />
                <Route
                  path="/womensclothing"
                  element={<WomensClothing url='https://fakestoreapi.com/products/category/women%27s%20clothing'/>}
                />
                <Route path="/cart" element={<Cart/>}/>
            </Routes> */}
          </main>
          <Footer/>
        </div>
    </Router>
    
  );
}

export default App;
