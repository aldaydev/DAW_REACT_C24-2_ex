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
  // const [catList, setCatList] = useState([]);

  useEffect(()=>{
    //Almacenar los datos de la API
    async function getCategories(){
      //Fetch
      let response = await fetch('https://fakestoreapi.com/products/categories');
      let catData = await response.json();
      //Conformamos un arr con: [catName, catDir, catUrl, catComponent]
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
        // const newCatList = [...catList];
        // newCatList.push(catUrl);
        // setCatList(newCatList);
        catUrl = 'https://fakestoreapi.com/products/category/' + catUrl;
        catArr.push(catUrl);

        console.log(catData);
        let catComponent;
        switch (curr){
          case "electronics":
            catComponent = (<Electronics url={catUrl} title={catName}/>);
            break;
          case "jewelery":
            catComponent = (<Jewelery url={catUrl} title={catName}/>);
            break;
          case "men's clothing" :
            catComponent = (<MensClothing url={catUrl} title={catName}/>);
            break;
          case "women's clothing":
            catComponent = <WomensClothing url={catUrl} title={catName}/>;
            break;
          
          default: <Home/>;
        }
        catArr.push(catComponent);
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
          <Header catList={categories.reduce((acc,curr)=>{
            console.log('acc', acc);
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
                console.log(categories);
                return <Route key={index} path={`/${category[1]}`} element={category[3]}/>
              })}
              <Route path="/cart" element={<Cart/>}/>
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
