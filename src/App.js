import logo from './logo.svg';
import './App.css';
import Login from './components/login';
import { BrowserRouter, Routes, Route, Router } from 'react-router-dom';

function App() {
  return (  
<div>
      <Routes>
      <Route path="/" element={(<Login />)} />
      <Route exact path="/login" element={(<Login />)} />
      </Routes>
    </div>
    
  );
}

export default App;
