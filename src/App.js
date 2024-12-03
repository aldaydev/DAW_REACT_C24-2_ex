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

function App() {
  return (
    <Router>
        <div className="App">
          <Header/>
          <main className="App-main">
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/electronics" element={<Electronics url='https://fakestoreapi.com/products/category/electronics'/>}/>
                <Route path="/jewelery" element={<Jewelery url='https://fakestoreapi.com/products/category/jewelery'/>}/>
                <Route path="/mensclothing" element={<MensClothing url='https://fakestoreapi.com/products/category/men%27s%20clothing'/>}/>
                <Route path="/womensclothing" element={<WomensClothing url='https://fakestoreapi.com/products/category/women%27s%20clothing'/>}/>
                <Route path="/cart" element={<Cart/>}/>
            </Routes>
          </main>
          <Footer/>
        </div>
    </Router>
    
  );
}

export default App;
