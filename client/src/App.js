import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Navbar from './components/Shared/Navbar';
import Footer from './components/Shared/Footer';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import MemberManagement from './components/Admin/MemberManagement';
import Profile from './components/Member/Profile';
import Home from './components/Shared/Home';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="container">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/admin/members" element={<MemberManagement />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;