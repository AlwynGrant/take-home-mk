import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from './components/login';
import './App.css';

function App() {
  return (
    <BrowserRouter>
    <div className='app'>
      <Login />
    </div>
    </BrowserRouter>
  );
}

export default App;
