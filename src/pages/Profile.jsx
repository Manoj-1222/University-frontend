import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import universityBg from '../assets/University Background.webp';

function Profile() {
  const [user, setUser] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is logged in
    const userData = localStorage.getItem('user');
    const loginStatus = localStorage.getItem('isLoggedIn');
    
    if (userData && loginStatus === 'true') {
      setUser(JSON.parse(userData));
      setIsVisible(true);
    } else {
      navigate('/login');
    }
  }, [navigate]);

  const handleSaveProfile = (e) => {
    e.preventDefault();
    // Here you would typically call an API to update the profile
    alert('Profile updated successfully!');
  };

  if (!user) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: '50vh' }}>
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div 
      className={`fade-in ${isVisible ? 'visible' : ''}`}
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url(${universityBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
        minHeight: '100vh',
        paddingTop: '2rem',
        paddingBottom: '2rem'
      }}
    >
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <div className="card border-0 shadow-lg">
            <div className="card-header bg-gradient text-white text-center py-4">
              <h3 className="mb-0">
                <i className="fas fa-user-edit me-2"></i>
                User Profile
              </h3>
            </div>
            <div className="card-body p-5">
              <div className="row">
                <div className="col-md-4 text-center mb-4">
                  <div className="profile-avatar mb-3">
                    <i className="fas fa-user-circle fa-5x text-primary"></i>
                  </div>
                  <h4 className="fw-bold">{user.name}</h4>
                  <span className="badge bg-primary rounded-pill px-3 py-2">
                    {user.userType === 'student' ? 'Student' : 'Faculty'}
                  </span>
                </div>
                <div className="col-md-8">
                  <form onSubmit={handleSaveProfile}>
                    <div className="row">
                      <div className="col-md-6 mb-3">
                        <label className="form-label fw-semibold">
                          <i className="fas fa-user me-2 text-primary"></i>
                          Full Name
                        </label>
                        <input 
                          type="text" 
                          className="form-control" 
                          defaultValue={user.name}
                          required
                        />
                      </div>
                      <div className="col-md-6 mb-3">
                        <label className="form-label fw-semibold">
                          <i className="fas fa-envelope me-2 text-primary"></i>
                          Email Address
                        </label>
                        <input 
                          type="email" 
                          className="form-control" 
                          defaultValue={user.email}
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="row">
                      <div className="col-md-6 mb-3">
                        <label className="form-label fw-semibold">
                          <i className="fas fa-id-card me-2 text-primary"></i>
                          User ID
                        </label>
                        <input 
                          type="text" 
                          className="form-control" 
                          defaultValue={user.id}
                          disabled
                        />
                      </div>
                      <div className="col-md-6 mb-3">
                        <label className="form-label fw-semibold">
                          <i className="fas fa-users me-2 text-primary"></i>
                          User Type
                        </label>
                        <input 
                          type="text" 
                          className="form-control" 
                          defaultValue={user.userType === 'student' ? 'Student' : 'Faculty'}
                          disabled
                        />
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-md-6 mb-3">
                        <label className="form-label fw-semibold">
                          <i className="fas fa-phone me-2 text-primary"></i>
                          Phone Number
                        </label>
                        <input 
                          type="tel" 
                          className="form-control" 
                          placeholder="Enter your phone number"
                        />
                      </div>
                      <div className="col-md-6 mb-3">
                        <label className="form-label fw-semibold">
                          <i className="fas fa-calendar me-2 text-primary"></i>
                          Date of Birth
                        </label>
                        <input 
                          type="date" 
                          className="form-control"
                        />
                      </div>
                    </div>

                    <div className="mb-3">
                      <label className="form-label fw-semibold">
                        <i className="fas fa-map-marker-alt me-2 text-primary"></i>
                        Address
                      </label>
                      <textarea 
                        className="form-control" 
                        rows="3" 
                        placeholder="Enter your address"
                      ></textarea>
                    </div>

                    <div className="mb-4">
                      <label className="form-label fw-semibold">
                        <i className="fas fa-info-circle me-2 text-primary"></i>
                        Bio
                      </label>
                      <textarea 
                        className="form-control" 
                        rows="4" 
                        placeholder="Tell us about yourself"
                      ></textarea>
                    </div>

                    <div className="d-flex gap-3 justify-content-end">
                      <button 
                        type="button" 
                        className="btn btn-outline-secondary px-4 py-2"
                        onClick={() => navigate('/dashboard')}
                      >
                        <i className="fas fa-times me-2"></i>
                        Cancel
                      </button>
                      <button 
                        type="submit" 
                        className="btn btn-primary px-4 py-2"
                      >
                        <i className="fas fa-save me-2"></i>
                        Save Changes
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>

          {/* Login History Card */}
          <div className="card border-0 shadow-lg mt-4">
            <div className="card-header bg-light">
              <h5 className="mb-0">
                <i className="fas fa-history me-2 text-primary"></i>
                Recent Activity
              </h5>
            </div>
            <div className="card-body">
              <div className="d-flex align-items-center mb-3">
                <div className="activity-icon me-3">
                  <i className="fas fa-sign-in-alt text-success"></i>
                </div>
                <div>
                  <div className="fw-semibold">Last Login</div>
                  <small className="text-muted">
                    {new Date(user.loginTime).toLocaleString()}
                  </small>
                </div>
              </div>
              <div className="d-flex align-items-center">
                <div className="activity-icon me-3">
                  <i className="fas fa-user-edit text-info"></i>
                </div>
                <div>
                  <div className="fw-semibold">Profile Created</div>
                  <small className="text-muted">Welcome to EduVerse University!</small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
