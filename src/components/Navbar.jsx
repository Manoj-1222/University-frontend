import React from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

function Navbar() {
  const { user, logout } = useAuth();
  const isLoggedIn = !!user;
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light navbar-professional py-3">
      <div className="container">
        <Link className="navbar-brand navbar-brand-professional d-flex align-items-center py-1" to="/">
          <div className="brand-icon me-3">
            <i className="fas fa-graduation-cap" style={{ fontSize: '1.75rem', color: '#c8aa6e' }}></i>
          </div>
          <div className="brand-text-container">
            <span className="brand-text d-block" style={{ fontSize: '1.4rem', fontWeight: '800', color: '#0f2a5c', lineHeight: '1.1' }}>
              COE University
            </span>
            <small className="brand-subtitle d-block" style={{ fontSize: '0.75rem', color: '#4a5568', fontWeight: '500', letterSpacing: '0.5px' }}>
              Excellence in Education
            </small>
          </div>
        </Link>
        
        <button 
          className="navbar-toggler border-0" 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#navbarNav" 
          aria-controls="navbarNav" 
          aria-expanded="false" 
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink 
                className={({ isActive }) => 
                  `nav-link nav-link-professional ${isActive ? 'active' : ''}`
                } 
                to="/"
              >
                <i className="fas fa-home me-2" style={{ color: '#0f2a5c' }}></i>
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink 
                className={({ isActive }) => 
                  `nav-link nav-link-professional ${isActive ? 'active' : ''}`
                } 
                to="/about"
              >
                <i className="fas fa-info-circle me-2" style={{ color: '#0f2a5c' }}></i>
                About
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink 
                className={({ isActive }) => 
                  `nav-link nav-link-professional ${isActive ? 'active' : ''}`
                } 
                to="/admissions"
              >
                <i className="fas fa-user-plus me-2" style={{ color: '#0f2a5c' }}></i>
                Admissions
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink 
                className={({ isActive }) => 
                  `nav-link nav-link-professional ${isActive ? 'active' : ''}`
                } 
                to="/placements"
              >
                <i className="fas fa-briefcase me-2" style={{ color: '#0f2a5c' }}></i>
                Placements
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink 
                className={({ isActive }) => 
                  `nav-link nav-link-professional ${isActive ? 'active' : ''}`
                } 
                to="/contact"
              >
                <i className="fas fa-envelope me-2" style={{ color: '#0f2a5c' }}></i>
                Contact
              </NavLink>
            </li>
            {!isLoggedIn ? (
              <li className="nav-item ms-3">
                <NavLink 
                  className="btn px-4 py-2 rounded-pill text-decoration-none" 
                  to="/login"
                  style={{
                    background: 'linear-gradient(135deg, #0f2a5c, #1e4d72)',
                    color: 'white',
                    fontWeight: '600',
                    border: 'none',
                    boxShadow: '0 4px 14px 0 rgba(15, 42, 92, 0.2)',
                    transition: 'all 0.3s ease'
                  }}
                >
                  <i className="fas fa-sign-in-alt me-2"></i>
                  Student Login
                </NavLink>
              </li>
            ) : (
              <li className="nav-item dropdown ms-3">
                <button 
                  className="btn px-4 py-2 rounded-pill dropdown-toggle d-flex align-items-center text-decoration-none" 
                  type="button"
                  id="userDropdown"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                  style={{
                    background: 'linear-gradient(135deg, #0f2a5c, #1e4d72)',
                    color: 'white',
                    fontWeight: '600',
                    border: 'none',
                    boxShadow: '0 4px 14px 0 rgba(15, 42, 92, 0.2)'
                  }}
                >
                  <i className="fas fa-user-circle me-2"></i>
                  {user?.name || 'Student'}
                </button>
                <ul className="dropdown-menu dropdown-menu-end mt-2 shadow-lg border-0 rounded-3" aria-labelledby="userDropdown">
                  <li>
                    <NavLink className="dropdown-item py-2" to="/dashboard">
                      <i className="fas fa-tachometer-alt me-2" style={{ color: '#0f2a5c' }}></i>
                      Dashboard
                    </NavLink>
                  </li>
                  <li>
                    <NavLink className="dropdown-item py-2" to="/profile">
                      <i className="fas fa-user-edit me-2" style={{ color: '#1565c0' }}></i>
                      View Profile
                    </NavLink>
                  </li>
                  <li><hr className="dropdown-divider" /></li>
                  <li>
                    <button className="dropdown-item py-2 text-danger" onClick={handleLogout}>
                      <i className="fas fa-sign-out-alt me-2"></i>
                      Logout
                    </button>
                  </li>
                </ul>
              </li>
            )}
          </ul>
        </div>
      </div>
      
      <style jsx>{`
        .brand-icon {
          font-size: 1.25rem;
        }
        
        .brand-text {
          font-size: 1.1rem;
          font-weight: 700;
        }
        
        .nav-link {
          transition: all 0.3s ease;
          border-radius: 0.5rem;
          font-weight: 500;
          color: #374151 !important;
          margin: 0 0.25rem;
          padding: 0.5rem 1rem !important;
        }
        
        .nav-link:hover {
          background: rgba(37, 99, 235, 0.1);
          color: #2563eb !important;
          transform: translateY(-1px);
        }
        
        .nav-link.active {
          background: rgba(37, 99, 235, 0.15);
          color: #2563eb !important;
          font-weight: 600;
        }
        
        .btn-primary {
          background: linear-gradient(135deg, #2563eb, #1d4ed8);
          border: none;
          color: white !important;
          font-weight: 600;
          transition: all 0.3s ease;
          box-shadow: 0 2px 8px rgba(37, 99, 235, 0.3);
        }
        
        .btn-primary:hover {
          background: linear-gradient(135deg, #1d4ed8, #1e40af);
          transform: translateY(-2px);
          box-shadow: 0 4px 16px rgba(37, 99, 235, 0.4);
          color: white !important;
        }
        
        .btn-primary:active,
        .btn-primary:focus {
          background: linear-gradient(135deg, #1e40af, #1d4ed8);
          box-shadow: 0 2px 8px rgba(37, 99, 235, 0.3);
          color: white !important;
        }
        
        .navbar-toggler {
          border: none;
          color: #374151;
        }
        
        .navbar-toggler:focus {
          box-shadow: none;
        }

        .dropdown-menu {
          border: none;
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
          margin-top: 0.5rem;
          min-width: 200px;
        }

        .dropdown-item {
          transition: all 0.3s ease;
          border-radius: 0.5rem;
          margin: 0.25rem 0.5rem;
          padding: 0.75rem 1rem;
        }

        .dropdown-item:hover {
          background: rgba(37, 99, 235, 0.1);
          color: #2563eb;
          transform: translateX(5px);
        }

        .btn-outline-primary {
          border: 2px solid #2563eb;
          color: #2563eb !important;
          background: transparent;
          font-weight: 600;
          transition: all 0.3s ease;
        }

        .btn-outline-primary:hover {
          background: #2563eb;
          color: white !important;
          transform: translateY(-2px);
          box-shadow: 0 4px 16px rgba(37, 99, 235, 0.3);
        }
      `}</style>
    </nav>
  );
}

export default Navbar; 