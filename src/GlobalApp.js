import './App.css';
import { DataProvider } from "./context/DataContext";
import App from "./App";

function GlobalApp() {

  return (
    <DataProvider>
      <App/>
    </DataProvider>

  );
}

export default GlobalApp;
