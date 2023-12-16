import './index.css'
import './App.css';
import Login from "./components/Login.jsx";
import {BrowserRouter as Router , Routes , Route} from "react-router-dom"
import { Home } from './components/Home.jsx';
import { Register } from './components/Register.jsx';
import axios from 'axios';
import {Toaster} from 'react-hot-toast';
import { UserContextProvider } from '../src/context/userContext.jsx';

axios.defaults.baseURL = "http://localhost:8000";
axios.defaults.withCredentials = true;



function App() {
  return (
    <UserContextProvider>
      <Router>
        <Toaster position='bottom-right' toastOptions={{duration:2000}}/>
        <Routes>
          <Route path="/Home" element={<Home />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/" element={<Register />} />

        </Routes>
      </Router>

      </UserContextProvider>
  );
}

export default App;
