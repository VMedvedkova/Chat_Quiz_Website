import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
// import { Routes, Route } from 'react-router-dom'
import Header from "./components/header";
// import Login from "./pages/login"
// import MainPage from "./pages/mainPage"
import { BrowserRouter } from 'react-router-dom';
// import Navbar from './modules/navbar';
import AppRouter from './components/appRouter';

const App = () => {
  return (
      <BrowserRouter>
          <Header />
          <AppRouter />
      </BrowserRouter>
  );
}

export default App;
