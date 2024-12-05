import './App.css';
import { useEffect, useState, useContext } from "react";
import { DataProvider } from "./context/DataContext";
import { DataContext } from "./context/DataContext";
import App from "./App";

function GlobalApp() {

  const categories = useContext(DataContext);

  return (
    <DataProvider>
      <App/>
    </DataProvider>

  );
}

export default GlobalApp;
