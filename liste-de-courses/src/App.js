import './App.css';
import {Routes, Route} from "react-router-dom";
import LoginPage from './pages/LoginPage';
import ShopList from './pages/ShopList';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<LoginPage/>}/>
        <Route path="/shoplist" element={<ShopList/>}/>
      </Routes>
    </>
  );
}

export default App;
