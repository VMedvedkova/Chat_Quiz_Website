import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Routes, Route } from 'react-router-dom'
import Header from "./components/Header";
import Login from "./pages/login"
import MainPage from "./pages/mainPage"

function App() {
  return (
    <div className="App">
       <Routes>
        <Route path="/" element={<Header />} >
          <Route path="/login" element={<Login />} />
          <Route path="/main_page" element={<MainPage />} />
        </Route> 
      </Routes>
    </div>
  );
}

export default App;
