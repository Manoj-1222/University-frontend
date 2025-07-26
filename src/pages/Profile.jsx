import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { studentApi } from '../services/api';

function Profile() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('personal');
  const navigate = useNavigate();
  const { logout } = useAuth();

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      setLoading(true);
      const response = await studentApi.getProfile();
      console.log('Profile API Response:', response); // Debug log
      // Extract the actual student data from the API response
      setProfile(response.data || response);
    } catch (err) {
      setError('Failed to load profile');
      console.error('Error fetching profile:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center min-vh-100">
        <div className="text-center">
          <div className="spinner-border text-primary mb-3" style={{width: '3rem', height: '3rem'}}></div>
          <p className="text-muted">Loading profile...</p>
        </div>
      </div>
    );
  }

  if (error && !profile) {
    return (
      <div className="d-flex justify-content-center align-items-center min-vh-100">
        <div className="text-center">
          <div className="alert alert-danger">
            <i className="fas fa-exclamation-triangle me-2"></i>
            {error}
          </div>
          <button className="btn btn-primary" onClick={fetchProfile}>
            <i className="fas fa-refresh me-2"></i>
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-vh-100 bg-light py-4">
      <div className="container">
        {/* Header */}
        <div className="row mb-4">
          <div className="col-12">
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <h1 className="h3 mb-1">
                  <i className="fas fa-user-circle me-2 text-primary"></i>
                  View Profile
                </h1>
                <p className="text-muted mb-0">View your personal information and academic details</p>
              </div>
              <div className="d-flex gap-2">
                <button
                  className="btn btn-outline-primary"
                  onClick={() => navigate('/dashboard')}
                >
                  <i className="fas fa-arrow-left me-2"></i>
                  Back to Dashboard
                </button>
                <button
                  className="btn btn-outline-danger"
                  onClick={handleLogout}
                >
                  <i className="fas fa-sign-out-alt me-2"></i>
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Profile Header Card */}
        <div className="card border-0 shadow-lg mb-4">
          <div className="card-body p-4">
            <div className="row align-items-center">
              <div className="col-md-3 text-center mb-3 mb-md-0">
                <div className="profile-avatar bg-primary text-white rounded-circle d-inline-flex align-items-center justify-content-center" 
                     style={{width: '120px', height: '120px', fontSize: '3rem'}}>
                  <i className="fas fa-user"></i>
                </div>
              </div>
              <div className="col-md-6">
                <h2 className="mb-2">{profile?.name || 'Student Name'}</h2>
                <p className="text-muted mb-2">
                  <i className="fas fa-id-card me-2"></i>
                  Roll No: <strong>{profile?.rollNo || 'N/A'}</strong>
                </p>
                <p className="text-muted mb-2">
                  <i className="fas fa-envelope me-2"></i>
                  {profile?.email || 'N/A'}
                </p>
                <p className="text-muted mb-0">
                  <i className="fas fa-building me-2"></i>
                  {profile?.department || 'N/A'} - Year {profile?.year || 'N/A'}
                </p>
              </div>
              <div className="col-md-3 text-center">
                <div className="h4 mb-1 text-success">{profile?.currentCGPA || 'N/A'}</div>
                <small className="text-muted">Current CGPA</small>
                <div className="mt-2">
                  <div className="h4 mb-1 text-info">{profile?.totalCredits || 0}</div>
                  <small className="text-muted">Total Credits</small>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="card border-0 shadow-lg">
          <div className="card-header" style={{
            background: 'linear-gradient(135deg, var(--primary-color) 0%, rgba(15, 42, 92, 0.9) 100%)',
            padding: '1.5rem 1rem'
          }}>
            <ul className="nav nav-tabs card-header-tabs border-0">
              <li className="nav-item">
                <button
                  className={`nav-link border-0 fw-bold ${activeTab === 'personal' ? 'active' : ''}`}
                  onClick={() => setActiveTab('personal')}
                  style={{
                    color: '#ffffff !important',
                    backgroundColor: activeTab === 'personal' ? 'rgba(255, 255, 255, 0.3)' : 'rgba(255, 255, 255, 0.1)',
                    borderRadius: '10px 10px 0 0',
                    transition: 'all 0.3s ease',
                    padding: '12px 20px',
                    fontSize: '1rem',
                    textShadow: '0 1px 2px rgba(0, 0, 0, 0.5)',
                    boxShadow: activeTab === 'personal' ? '0 4px 8px rgba(0, 0, 0, 0.1)' : 'none',
                    fontWeight: '700',
                    border: '1px solid rgba(255, 255, 255, 0.3)'
                  }}
                  onMouseEnter={(e) => {
                    if (activeTab !== 'personal') {
                      e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.2)';
                      e.target.style.color = '#ffffff';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (activeTab !== 'personal') {
                      e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
                      e.target.style.color = '#ffffff';
                    }
                  }}
                >
                  <i className="fas fa-user me-2" style={{color: '#ffffff !important'}}></i>
                  <span style={{color: '#ffffff !important'}}>Personal Info</span>
                </button>
              </li>
              <li className="nav-item">
                <button
                  className={`nav-link border-0 fw-bold ${activeTab === 'academic' ? 'active' : ''}`}
                  onClick={() => setActiveTab('academic')}
                  style={{
                    color: '#ffffff !important',
                    backgroundColor: activeTab === 'academic' ? 'rgba(255, 255, 255, 0.3)' : 'rgba(255, 255, 255, 0.1)',
                    borderRadius: '10px 10px 0 0',
                    transition: 'all 0.3s ease',
                    padding: '12px 20px',
                    fontSize: '1rem',
                    textShadow: '0 1px 2px rgba(0, 0, 0, 0.5)',
                    boxShadow: activeTab === 'academic' ? '0 4px 8px rgba(0, 0, 0, 0.1)' : 'none',
                    fontWeight: '700',
                    border: '1px solid rgba(255, 255, 255, 0.3)'
                  }}
                  onMouseEnter={(e) => {
                    if (activeTab !== 'academic') {
                      e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.2)';
                      e.target.style.color = '#ffffff';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (activeTab !== 'academic') {
                      e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
                      e.target.style.color = '#ffffff';
                    }
                  }}
                >
                  <i className="fas fa-graduation-cap me-2" style={{color: '#ffffff !important'}}></i>
                  <span style={{color: '#ffffff !important'}}>Academic Records</span>
                </button>
              </li>
              <li className="nav-item">
                <button
                  className={`nav-link border-0 fw-bold ${activeTab === 'attendance' ? 'active' : ''}`}
                  onClick={() => setActiveTab('attendance')}
                  style={{
                    color: '#ffffff !important',
                    backgroundColor: activeTab === 'attendance' ? 'rgba(255, 255, 255, 0.3)' : 'rgba(255, 255, 255, 0.1)',
                    borderRadius: '10px 10px 0 0',
                    transition: 'all 0.3s ease',
                    padding: '12px 20px',
                    fontSize: '1rem',
                    textShadow: '0 1px 2px rgba(0, 0, 0, 0.5)',
                    boxShadow: activeTab === 'attendance' ? '0 4px 8px rgba(0, 0, 0, 0.1)' : 'none',
                    fontWeight: '700',
                    border: '1px solid rgba(255, 255, 255, 0.3)'
                  }}
                  onMouseEnter={(e) => {
                    if (activeTab !== 'attendance') {
                      e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.2)';
                      e.target.style.color = '#ffffff';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (activeTab !== 'attendance') {
                      e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
                      e.target.style.color = '#ffffff';
                    }
                  }}
                >
                  <i className="fas fa-calendar-check me-2" style={{color: '#ffffff !important'}}></i>
                  <span style={{color: '#ffffff !important'}}>Attendance</span>
                </button>
              </li>
              <li className="nav-item">
                <button
                  className={`nav-link border-0 fw-bold ${activeTab === 'fees' ? 'active' : ''}`}
                  onClick={() => setActiveTab('fees')}
                  style={{
                    color: '#ffffff !important',
                    backgroundColor: activeTab === 'fees' ? 'rgba(255, 255, 255, 0.3)' : 'rgba(255, 255, 255, 0.1)',
                    borderRadius: '10px 10px 0 0',
                    transition: 'all 0.3s ease',
                    padding: '12px 20px',
                    fontSize: '1rem',
                    textShadow: '0 1px 2px rgba(0, 0, 0, 0.5)',
                    boxShadow: activeTab === 'fees' ? '0 4px 8px rgba(0, 0, 0, 0.1)' : 'none',
                    fontWeight: '700',
                    border: '1px solid rgba(255, 255, 255, 0.3)'
                  }}
                  onMouseEnter={(e) => {
                    if (activeTab !== 'fees') {
                      e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.2)';
                      e.target.style.color = '#ffffff';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (activeTab !== 'fees') {
                      e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
                      e.target.style.color = '#ffffff';
                    }
                  }}
                >
                  <i className="fas fa-money-bill-wave me-2" style={{color: '#ffffff !important'}}></i>
                  <span style={{color: '#ffffff !important'}}>Fees</span>
                </button>
              </li>
            </ul>
          </div>

          <div className="card-body p-4">
            {/* Personal Information Tab */}
            {activeTab === 'personal' && (
              <div>
                <h5 className="mb-4">
                  <i className="fas fa-user me-2 text-primary"></i>
                  Personal Information
                </h5>
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <div className="card bg-light border-0">
                      <div className="card-body">
                        <h6 className="card-title text-primary mb-2">
                          <i className="fas fa-user me-2"></i>Full Name
                        </h6>
                        <p className="card-text h5 mb-0">{profile?.name || 'Not Available'}</p>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6 mb-3">
                    <div className="card bg-light border-0">
                      <div className="card-body">
                        <h6 className="card-title text-primary mb-2">
                          <i className="fas fa-envelope me-2"></i>Email Address
                        </h6>
                        <p className="card-text h5 mb-0">{profile?.email || 'Not Available'}</p>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6 mb-3">
                    <div className="card bg-light border-0">
                      <div className="card-body">
                        <h6 className="card-title text-primary mb-2">
                          <i className="fas fa-id-card me-2"></i>Roll Number
                        </h6>
                        <p className="card-text h5 mb-0">{profile?.rollNo || 'Not Available'}</p>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6 mb-3">
                    <div className="card bg-light border-0">
                      <div className="card-body">
                        <h6 className="card-title text-primary mb-2">
                          <i className="fas fa-phone me-2"></i>Phone Number
                        </h6>
                        <p className="card-text h5 mb-0">{profile?.phone || 'Not Available'}</p>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6 mb-3">
                    <div className="card bg-light border-0">
                      <div className="card-body">
                        <h6 className="card-title text-primary mb-2">
                          <i className="fas fa-calendar me-2"></i>Date of Birth
                        </h6>
                        <p className="card-text h5 mb-0">
                          {profile?.dateOfBirth ? new Date(profile.dateOfBirth).toLocaleDateString() : 'Not Available'}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6 mb-3">
                    <div className="card bg-light border-0">
                      <div className="card-body">
                        <h6 className="card-title text-primary mb-2">
                          <i className="fas fa-tint me-2"></i>Blood Group
                        </h6>
                        <p className="card-text h5 mb-0">{profile?.bloodGroup || 'Not Available'}</p>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6 mb-3">
                    <div className="card bg-light border-0">
                      <div className="card-body">
                        <h6 className="card-title text-primary mb-2">
                          <i className="fas fa-building me-2"></i>Department
                        </h6>
                        <p className="card-text h5 mb-0">{profile?.department || 'Not Available'}</p>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6 mb-3">
                    <div className="card bg-light border-0">
                      <div className="card-body">
                        <h6 className="card-title text-primary mb-2">
                          <i className="fas fa-calendar-alt me-2"></i>Academic Year
                        </h6>
                        <p className="card-text h5 mb-0">
                          Year {profile?.year || 'N/A'}, Semester {profile?.semester || 'N/A'}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Academic Records Tab */}
            {activeTab === 'academic' && (
              <div>
                <h5 className="mb-4">
                  <i className="fas fa-graduation-cap me-2 text-primary"></i>
                  Academic Records
                </h5>
                
                <div className="row mb-4">
                  <div className="col-md-3">
                    <div className="card bg-primary bg-opacity-10 border-0">
                      <div className="card-body text-center">
                        <i className="fas fa-star text-primary mb-2" style={{fontSize: '2rem'}}></i>
                        <h4 className="text-primary mb-1">{profile?.currentCGPA || 'N/A'}</h4>
                        <small className="text-muted">Current CGPA</small>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="card bg-success bg-opacity-10 border-0">
                      <div className="card-body text-center">
                        <i className="fas fa-book text-success mb-2" style={{fontSize: '2rem'}}></i>
                        <h4 className="text-success mb-1">{profile?.totalCredits || 0}</h4>
                        <small className="text-muted">Credits Earned</small>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="card bg-info bg-opacity-10 border-0">
                      <div className="card-body text-center">
                        <i className="fas fa-graduation-cap text-info mb-2" style={{fontSize: '2rem'}}></i>
                        <h4 className="text-info mb-1">Year {profile?.year || 'N/A'}</h4>
                        <small className="text-muted">Current Year</small>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="card bg-warning bg-opacity-10 border-0">
                      <div className="card-body text-center">
                        <i className="fas fa-calendar-alt text-warning mb-2" style={{fontSize: '2rem'}}></i>
                        <h4 className="text-warning mb-1">Sem {profile?.semester || 'N/A'}</h4>
                        <small className="text-muted">Current Semester</small>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Attendance Tab */}
            {activeTab === 'attendance' && (
              <div>
                <h5 className="mb-4">
                  <i className="fas fa-calendar-check me-2 text-primary"></i>
                  Attendance Details
                </h5>

                <div className="row mb-4">
                  <div className="col-md-12">
                    <div className="card bg-info bg-opacity-10 border-0">
                      <div className="card-body text-center">
                        <i className="fas fa-percentage text-info mb-3" style={{fontSize: '3rem'}}></i>
                        <h2 className="text-info mb-2">{profile?.attendance?.percentage || 'N/A'}%</h2>
                        <h5 className="text-muted mb-0">Overall Attendance</h5>
                        <div className="mt-3">
                          <div className="progress" style={{height: '10px'}}>
                            <div 
                              className="progress-bar bg-info" 
                              role="progressbar" 
                              style={{width: `${profile?.attendance?.percentage || 0}%`}}
                            ></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Fees Tab */}
            {activeTab === 'fees' && (
              <div>
                <h5 className="mb-4">
                  <i className="fas fa-money-bill-wave me-2 text-primary"></i>
                  Fee Structure & Payments
                </h5>

                <div className="row mb-4">
                  <div className="col-md-4">
                    <div className="card bg-primary bg-opacity-10 border-0">
                      <div className="card-body text-center">
                        <i className="fas fa-rupee-sign text-primary mb-2" style={{fontSize: '2rem'}}></i>
                        <h4 className="text-primary mb-1">₹{(profile?.totalFee || 0).toLocaleString()}</h4>
                        <small className="text-muted">Total Fee</small>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="card bg-success bg-opacity-10 border-0">
                      <div className="card-body text-center">
                        <i className="fas fa-check-circle text-success mb-2" style={{fontSize: '2rem'}}></i>
                        <h4 className="text-success mb-1">₹{(profile?.paidAmount || 0).toLocaleString()}</h4>
                        <small className="text-muted">Amount Paid</small>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="card bg-danger bg-opacity-10 border-0">
                      <div className="card-body text-center">
                        <i className="fas fa-exclamation-triangle text-danger mb-2" style={{fontSize: '2rem'}}></i>
                        <h4 className="text-danger mb-1">₹{((profile?.totalFee || 0) - (profile?.paidAmount || 0)).toLocaleString()}</h4>
                        <small className="text-muted">Outstanding Amount</small>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="card border-0 shadow-sm">
                  <div className="card-header bg-light">
                    <h6 className="mb-0">
                      <i className="fas fa-chart-pie me-2"></i>
                      Payment Progress
                    </h6>
                  </div>
                  <div className="card-body">
                    <div className="progress mb-3" style={{height: '20px'}}>
                      <div 
                        className="progress-bar bg-success" 
                        role="progressbar" 
                        style={{width: `${profile?.totalFee ? ((profile?.paidAmount || 0) / profile.totalFee) * 100 : 0}%`}}
                      >
                        {profile?.totalFee ? Math.round(((profile?.paidAmount || 0) / profile.totalFee) * 100) : 0}%
                      </div>
                    </div>
                    <p className="text-muted mb-0">
                      {profile?.totalFee && (profile?.paidAmount || 0) === profile?.totalFee ? 
                        "✅ All fees have been paid successfully!" :
                        `${profile?.totalFee ? Math.round(((profile?.paidAmount || 0) / profile.totalFee) * 100) : 0}% of total fees paid.`
                      }
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
