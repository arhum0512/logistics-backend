import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Landing from './pages/Landing';
import AdminLogin from './pages/AdminLogin';  
import DriverLogin from './pages/DriverLogin'; 
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Drivers from './pages/Drivers';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/driver-login" element={<DriverLogin />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/drivers" element={<Drivers />} />
      </Routes>
    </Router>
  );
}

export default App;