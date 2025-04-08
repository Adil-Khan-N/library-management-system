import { useContext } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../../contexts/AuthContext';

const Home = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className="home-container">
      <h2>Welcome to the Library Management System</h2>
      {user ? (
        <div className="welcome-message">
          <p>Hello, {user.name}! You are logged in as a {user.role}.</p>
          <div className="action-buttons">
            <Link to="/profile" className="home-button">
              View Profile
            </Link>
            {user.role === 'admin' && (
              <Link to="/admin/members" className="home-button">
                Manage Members
              </Link>
            )}
          </div>
        </div>
      ) : (
        <div className="auth-options">
          <p>Please login or register to access the system</p>
          <div className="action-buttons">
            <Link to="/login" className="home-button">
              Login
            </Link>
            <Link to="/register" className="home-button">
              Register
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;