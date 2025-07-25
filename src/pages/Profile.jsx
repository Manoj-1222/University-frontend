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
  const { logout, user } = useAuth();

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      setLoading(true);
      const data = await studentApi.getProfile();
      setProfile(data);
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
      <div className="container mt-5">
        <div className="alert alert-danger text-center">
          <i className="fas fa-exclamation-triangle me-2"></i>
          {error}
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
                  My Profile
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
                <div className="profile-avatar mx-auto mb-3">
                  <i className="fas fa-user-circle text-primary" style={{fontSize: '6rem'}}></i>
                </div>
                <h5 className="mb-1">{profile?.name || 'Student'}</h5>
                <p className="text-muted mb-0">{profile?.rollNo || 'N/A'}</p>
              </div>
              <div className="col-md-9">
                <div className="row g-3">
                  <div className="col-md-3">
                    <div className="stat-card text-center p-3 bg-primary bg-opacity-10 rounded">
                      <i className="fas fa-graduation-cap text-primary mb-2" style={{fontSize: '1.5rem'}}></i>
                      <div className="h4 mb-1 text-primary">{profile?.academic?.currentCGPA || 'N/A'}</div>
                      <small className="text-muted">Current CGPA</small>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="stat-card text-center p-3 bg-success bg-opacity-10 rounded">
                      <i className="fas fa-book text-success mb-2" style={{fontSize: '1.5rem'}}></i>
                      <div className="h4 mb-1 text-success">{profile?.academic?.totalCredits || 0}</div>
                      <small className="text-muted">Total Credits</small>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="stat-card text-center p-3 bg-info bg-opacity-10 rounded">
                      <i className="fas fa-calendar-check text-info mb-2" style={{fontSize: '1.5rem'}}></i>
                      <div className="h4 mb-1 text-info">{profile?.attendance?.percentage || 'N/A'}%</div>
                      <small className="text-muted">Attendance</small>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="stat-card text-center p-3 bg-warning bg-opacity-10 rounded">
                      <i className="fas fa-exclamation-triangle text-warning mb-2" style={{fontSize: '1.5rem'}}></i>
                      <div className="h4 mb-1 text-warning">{profile?.academic?.backlogs || 0}</div>
                      <small className="text-muted">Backlogs</small>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="card border-0 shadow-lg">
          <div className="card-header bg-white">
            <ul className="nav nav-tabs card-header-tabs">
              <li className="nav-item">
                <button
                  className={`nav-link ${activeTab === 'personal' ? 'active' : ''}`}
                  onClick={() => setActiveTab('personal')}
                >
                  <i className="fas fa-user me-2"></i>
                  Personal Info
                </button>
              </li>
              <li className="nav-item">
                <button
                  className={`nav-link ${activeTab === 'academic' ? 'active' : ''}`}
                  onClick={() => setActiveTab('academic')}
                >
                  <i className="fas fa-graduation-cap me-2"></i>
                  Academic Records
                </button>
              </li>
              <li className="nav-item">
                <button
                  className={`nav-link ${activeTab === 'attendance' ? 'active' : ''}`}
                  onClick={() => setActiveTab('attendance')}
                >
                  <i className="fas fa-calendar-check me-2"></i>
                  Attendance
                </button>
              </li>
              <li className="nav-item">
                <button
                  className={`nav-link ${activeTab === 'fees' ? 'active' : ''}`}
                  onClick={() => setActiveTab('fees')}
                >
                  <i className="fas fa-money-bill-wave me-2"></i>
                  Fees
                </button>
              </li>
              <li className="nav-item">
                <button
                  className={`nav-link ${activeTab === 'timetable' ? 'active' : ''}`}
                  onClick={() => setActiveTab('timetable')}
                >
                  <i className="fas fa-calendar-alt me-2"></i>
                  Timetable
                </button>
              </li>
              <li className="nav-item">
                <button
                  className={`nav-link ${activeTab === 'additional' ? 'active' : ''}`}
                  onClick={() => setActiveTab('additional')}
                >
                  <i className="fas fa-info-circle me-2"></i>
                  Additional Info
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
                </div>

                <div className="row">
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
                        <p className="card-text h5 mb-0">{profile?.contact || profile?.phone || 'Not Available'}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="row">
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
                          <i className="fas fa-venus-mars me-2"></i>Gender
                        </h6>
                        <p className="card-text h5 mb-0">{profile?.gender || 'Not Specified'}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="row">
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

                <div className="row">
                  <div className="col-12 mb-3">
                    <div className="card bg-light border-0">
                      <div className="card-body">
                        <h6 className="card-title text-primary mb-2">
                          <i className="fas fa-map-marker-alt me-2"></i>Address
                        </h6>
                        <p className="card-text h5 mb-0">
                          {profile?.address?.street ? 
                            `${profile.address.street}, ${profile.address.city}, ${profile.address.state} ${profile.address.zipCode}` : 
                            'Not Available'
                          }
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
                
                {/* Academic Summary */}
                <div className="row mb-4">
                  <div className="col-md-3">
                    <div className="card bg-primary bg-opacity-10 border-0">
                      <div className="card-body text-center">
                        <i className="fas fa-star text-primary mb-2" style={{fontSize: '2rem'}}></i>
                        <h4 className="text-primary mb-1">{profile?.academic?.currentCGPA || 'N/A'}</h4>
                        <small className="text-muted">Current CGPA</small>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="card bg-success bg-opacity-10 border-0">
                      <div className="card-body text-center">
                        <i className="fas fa-book text-success mb-2" style={{fontSize: '2rem'}}></i>
                        <h4 className="text-success mb-1">{profile?.academic?.totalCredits || 0}</h4>
                        <small className="text-muted">Credits Earned</small>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="card bg-info bg-opacity-10 border-0">
                      <div className="card-body text-center">
                        <i className="fas fa-trophy text-info mb-2" style={{fontSize: '2rem'}}></i>
                        <h4 className="text-info mb-1">{profile?.academic?.grades?.length || 0}</h4>
                        <small className="text-muted">Subjects</small>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="card bg-warning bg-opacity-10 border-0">
                      <div className="card-body text-center">
                        <i className="fas fa-exclamation-triangle text-warning mb-2" style={{fontSize: '2rem'}}></i>
                        <h4 className="text-warning mb-1">{profile?.academic?.backlogs || 0}</h4>
                        <small className="text-muted">Backlogs</small>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Grades Table */}
                {profile?.academic?.grades && profile.academic.grades.length > 0 && (
                  <div className="card border-0 shadow-sm">
                    <div className="card-header bg-light">
                      <h6 className="mb-0">
                        <i className="fas fa-list me-2"></i>
                        Grade Details
                      </h6>
                    </div>
                    <div className="card-body p-0">
                      <div className="table-responsive">
                        <table className="table table-hover mb-0">
                          <thead className="table-light">
                            <tr>
                              <th><i className="fas fa-book me-2"></i>Subject</th>
                              <th><i className="fas fa-star me-2"></i>Grade</th>
                              <th><i className="fas fa-coins me-2"></i>Credits</th>
                              <th><i className="fas fa-calendar me-2"></i>Semester</th>
                            </tr>
                          </thead>
                          <tbody>
                            {profile.academic.grades.map((grade, index) => (
                              <tr key={index}>
                                <td className="fw-medium">{grade.subject}</td>
                                <td>
                                  <span className={`badge ${
                                    ['A+', 'A', 'A-'].includes(grade.grade) ? 'bg-success' :
                                    ['B+', 'B', 'B-'].includes(grade.grade) ? 'bg-primary' :
                                    ['C+', 'C'].includes(grade.grade) ? 'bg-warning' :
                                    'bg-danger'
                                  }`}>
                                    {grade.grade}
                                  </span>
                                </td>
                                <td>{grade.credits}</td>
                                <td>{grade.semester}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                )}

                {/* Attendance Information */}
                {profile?.attendance && (
                  <div className="card border-0 shadow-sm mt-4">
                    <div className="card-header bg-light">
                      <h6 className="mb-0">
                        <i className="fas fa-calendar-check me-2"></i>
                        Attendance Summary
                      </h6>
                    </div>
                    <div className="card-body">
                      <div className="row">
                        <div className="col-md-4">
                          <div className="text-center">
                            <div className="h3 text-info">{profile?.attendance?.percentage || 'N/A'}%</div>
                            <small className="text-muted">Overall Attendance</small>
                          </div>
                        </div>
                        <div className="col-md-4">
                          <div className="text-center">
                            <div className="h3 text-success">{profile?.attendance?.attendedClasses || 0}</div>
                            <small className="text-muted">Days Present</small>
                          </div>
                        </div>
                        <div className="col-md-4">
                          <div className="text-center">
                            <div className="h3 text-danger">{(profile?.attendance?.totalClasses || 0) - (profile?.attendance?.attendedClasses || 0)}</div>
                            <small className="text-muted">Days Absent</small>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Attendance Tab */}
            {activeTab === 'attendance' && (
              <div>
                <h5 className="mb-4">
                  <i className="fas fa-calendar-check me-2 text-primary"></i>
                  Attendance Details
                </h5>

                {/* Attendance Overview */}
                <div className="row mb-4">
                  <div className="col-md-3">
                    <div className="card bg-info bg-opacity-10 border-0">
                      <div className="card-body text-center">
                        <i className="fas fa-percentage text-info mb-2" style={{fontSize: '2rem'}}></i>
                        <h4 className="text-info mb-1">{profile?.attendance?.percentage || 'N/A'}%</h4>
                        <small className="text-muted">Overall Attendance</small>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="card bg-success bg-opacity-10 border-0">
                      <div className="card-body text-center">
                        <i className="fas fa-check-circle text-success mb-2" style={{fontSize: '2rem'}}></i>
                        <h4 className="text-success mb-1">{profile?.attendance?.attendedClasses || 0}</h4>
                        <small className="text-muted">Classes Attended</small>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="card bg-warning bg-opacity-10 border-0">
                      <div className="card-body text-center">
                        <i className="fas fa-calendar text-warning mb-2" style={{fontSize: '2rem'}}></i>
                        <h4 className="text-warning mb-1">{profile?.attendance?.totalClasses || 0}</h4>
                        <small className="text-muted">Total Classes</small>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="card bg-danger bg-opacity-10 border-0">
                      <div className="card-body text-center">
                        <i className="fas fa-times-circle text-danger mb-2" style={{fontSize: '2rem'}}></i>
                        <h4 className="text-danger mb-1">{(profile?.attendance?.totalClasses || 0) - (profile?.attendance?.attendedClasses || 0)}</h4>
                        <small className="text-muted">Classes Missed</small>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Attendance Status */}
                <div className="card border-0 shadow-sm">
                  <div className="card-header bg-light">
                    <h6 className="mb-0">
                      <i className="fas fa-chart-line me-2"></i>
                      Attendance Status
                    </h6>
                  </div>
                  <div className="card-body">
                    <div className="row">
                      <div className="col-md-6">
                        <div className="mb-3">
                          <label className="fw-semibold mb-2">Current Status:</label>
                          <span className={`badge ms-2 fs-6 ${
                            (profile?.attendance?.percentage || 0) >= 85 ? 'bg-success' :
                            (profile?.attendance?.percentage || 0) >= 75 ? 'bg-warning' :
                            'bg-danger'
                          }`}>
                            {profile?.attendance?.status || 'Unknown'}
                          </span>
                        </div>
                        <div className="mb-3">
                          <label className="fw-semibold mb-2">Required Minimum:</label>
                          <span className="text-muted ms-2">75%</span>
                        </div>
                        <div className="mb-3">
                          <label className="fw-semibold mb-2">Classes to Attend for 75%:</label>
                          <span className="text-info ms-2">
                            {Math.max(0, Math.ceil((75 * (profile?.attendance?.totalClasses || 0) / 100) - (profile?.attendance?.attendedClasses || 0)))}
                          </span>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="progress mb-3" style={{height: '25px'}}>
                          <div 
                            className={`progress-bar ${
                              (profile?.attendance?.percentage || 0) >= 85 ? 'bg-success' :
                              (profile?.attendance?.percentage || 0) >= 75 ? 'bg-warning' :
                              'bg-danger'
                            }`}
                            style={{width: `${profile?.attendance?.percentage || 0}%`}}
                          >
                            {profile?.attendance?.percentage || 0}%
                          </div>
                        </div>
                        <small className="text-muted">
                          Attendance Progress Bar
                        </small>
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

                {/* Fee Overview */}
                <div className="row mb-4">
                  <div className="col-md-3">
                    <div className="card bg-primary bg-opacity-10 border-0">
                      <div className="card-body text-center">
                        <i className="fas fa-rupee-sign text-primary mb-2" style={{fontSize: '2rem'}}></i>
                        <h4 className="text-primary mb-1">₹{(profile?.feeStructure?.totalFee || 0).toLocaleString()}</h4>
                        <small className="text-muted">Total Fee</small>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="card bg-success bg-opacity-10 border-0">
                      <div className="card-body text-center">
                        <i className="fas fa-check-circle text-success mb-2" style={{fontSize: '2rem'}}></i>
                        <h4 className="text-success mb-1">₹{(profile?.feeStructure?.paidAmount || 0).toLocaleString()}</h4>
                        <small className="text-muted">Amount Paid</small>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="card bg-warning bg-opacity-10 border-0">
                      <div className="card-body text-center">
                        <i className="fas fa-clock text-warning mb-2" style={{fontSize: '2rem'}}></i>
                        <h4 className="text-warning mb-1">₹{(profile?.feeStructure?.dueAmount || 0).toLocaleString()}</h4>
                        <small className="text-muted">Amount Due</small>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="card bg-info bg-opacity-10 border-0">
                      <div className="card-body text-center">
                        <i className="fas fa-calendar text-info mb-2" style={{fontSize: '2rem'}}></i>
                        <h4 className="text-info mb-1">
                          {profile?.feeStructure?.lastPaymentDate ? 
                            new Date(profile.feeStructure.lastPaymentDate).toLocaleDateString() : 'N/A'}
                        </h4>
                        <small className="text-muted">Last Payment</small>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Fee Breakdown */}
                <div className="card border-0 shadow-sm mb-4">
                  <div className="card-header bg-light">
                    <h6 className="mb-0">
                      <i className="fas fa-list me-2"></i>
                      Fee Breakdown
                    </h6>
                  </div>
                  <div className="card-body">
                    <div className="row">
                      <div className="col-md-6">
                        <table className="table table-borderless">
                          <tbody>
                            <tr>
                              <td><i className="fas fa-book text-primary me-2"></i>Tuition Fee:</td>
                              <td className="text-end fw-semibold">₹{(profile?.feeStructure?.tuitionFee || 0).toLocaleString()}</td>
                            </tr>
                            <tr>
                              <td><i className="fas fa-building text-success me-2"></i>Development Fee:</td>
                              <td className="text-end fw-semibold">₹{(profile?.feeStructure?.developmentFee || 0).toLocaleString()}</td>
                            </tr>
                            <tr>
                              <td><i className="fas fa-clipboard-check text-info me-2"></i>Exam Fee:</td>
                              <td className="text-end fw-semibold">₹{(profile?.feeStructure?.examFee || 0).toLocaleString()}</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                      <div className="col-md-6">
                        <table className="table table-borderless">
                          <tbody>
                            <tr>
                              <td><i className="fas fa-book-open text-warning me-2"></i>Library Fee:</td>
                              <td className="text-end fw-semibold">₹{(profile?.feeStructure?.libraryFee || 0).toLocaleString()}</td>
                            </tr>
                            <tr>
                              <td><i className="fas fa-flask text-danger me-2"></i>Lab Fee:</td>
                              <td className="text-end fw-semibold">₹{(profile?.feeStructure?.labFee || 0).toLocaleString()}</td>
                            </tr>
                            <tr className="border-top">
                              <td><strong><i className="fas fa-calculator text-primary me-2"></i>Total Fee:</strong></td>
                              <td className="text-end fw-bold text-primary">₹{(profile?.feeStructure?.totalFee || 0).toLocaleString()}</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Payment Status */}
                <div className="card border-0 shadow-sm">
                  <div className="card-header bg-light">
                    <h6 className="mb-0">
                      <i className="fas fa-credit-card me-2"></i>
                      Payment Status
                    </h6>
                  </div>
                  <div className="card-body">
                    <div className="row align-items-center">
                      <div className="col-md-8">
                        <div className="progress mb-3" style={{height: '25px'}}>
                          <div 
                            className="progress-bar bg-success"
                            style={{width: `${((profile?.feeStructure?.paidAmount || 0) / (profile?.feeStructure?.totalFee || 1)) * 100}%`}}
                          >
                            {Math.round(((profile?.feeStructure?.paidAmount || 0) / (profile?.feeStructure?.totalFee || 1)) * 100)}%
                          </div>
                        </div>
                        <p className="mb-0">
                          <span className="text-success fw-semibold">₹{(profile?.feeStructure?.paidAmount || 0).toLocaleString()}</span>
                          <span className="text-muted"> of </span>
                          <span className="fw-semibold">₹{(profile?.feeStructure?.totalFee || 0).toLocaleString()}</span>
                          <span className="text-muted"> paid</span>
                        </p>
                      </div>
                      <div className="col-md-4 text-end">
                        <span className={`badge fs-6 ${
                          (profile?.feeStructure?.dueAmount || 0) === 0 ? 'bg-success' : 
                          (profile?.feeStructure?.dueAmount || 0) > 0 ? 'bg-warning' : 'bg-danger'
                        }`}>
                          {(profile?.feeStructure?.dueAmount || 0) === 0 ? 'Fully Paid' : 
                           (profile?.feeStructure?.dueAmount || 0) > 0 ? 'Partially Paid' : 'Overdue'}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Timetable Tab */}
            {activeTab === 'timetable' && (
              <div>
                <h5 className="mb-4">
                  <i className="fas fa-calendar-alt me-2 text-primary"></i>
                  Weekly Timetable
                </h5>

                {/* Timetable Display */}
                <div className="card border-0 shadow-sm">
                  <div className="card-header bg-light">
                    <h6 className="mb-0">
                      <i className="fas fa-clock me-2"></i>
                      Class Schedule - Semester {profile?.semester || 'N/A'}
                    </h6>
                  </div>
                  <div className="card-body p-0">
                    <div className="table-responsive">
                      <table className="table table-bordered mb-0">
                        <thead className="table-primary">
                          <tr>
                            <th style={{width: '12%'}}>Time</th>
                            <th style={{width: '17.6%'}}>Monday</th>
                            <th style={{width: '17.6%'}}>Tuesday</th>
                            <th style={{width: '17.6%'}}>Wednesday</th>
                            <th style={{width: '17.6%'}}>Thursday</th>
                            <th style={{width: '17.6%'}}>Friday</th>
                          </tr>
                        </thead>
                        <tbody>
                          {/* Sample timetable data - you can make this dynamic */}
                          <tr>
                            <td className="fw-semibold bg-light">9:00-10:00</td>
                            <td className="p-2">
                              <div className="small">
                                <strong className="text-primary">Data Structures</strong><br/>
                                <span className="text-muted">CS301 | Dr. Rajesh Kumar</span><br/>
                                <span className="badge bg-info">CSE-101</span>
                              </div>
                            </td>
                            <td className="p-2">
                              <div className="small">
                                <strong className="text-success">Algorithm Analysis</strong><br/>
                                <span className="text-muted">CS305 | Dr. Suresh Reddy</span><br/>
                                <span className="badge bg-info">CSE-104</span>
                              </div>
                            </td>
                            <td className="p-2">
                              <div className="small">
                                <strong className="text-primary">Data Structures</strong><br/>
                                <span className="text-muted">CS301 | Dr. Rajesh Kumar</span><br/>
                                <span className="badge bg-info">CSE-101</span>
                              </div>
                            </td>
                            <td className="p-2">
                              <div className="small">
                                <strong className="text-warning">Algorithm Analysis</strong><br/>
                                <span className="text-muted">CS305 | Dr. Suresh Reddy</span><br/>
                                <span className="badge bg-secondary">Tutorial</span>
                              </div>
                            </td>
                            <td className="p-2">
                              <div className="small">
                                <strong className="text-danger">Data Structures Lab</strong><br/>
                                <span className="text-muted">CS301 | Dr. Rajesh Kumar</span><br/>
                                <span className="badge bg-danger">Lab</span>
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <td className="fw-semibold bg-light">10:00-11:00</td>
                            <td className="p-2">
                              <div className="small">
                                <strong className="text-info">Computer Networks</strong><br/>
                                <span className="text-muted">CS302 | Prof. Anita Sharma</span><br/>
                                <span className="badge bg-info">CSE-102</span>
                              </div>
                            </td>
                            <td className="p-2">
                              <div className="small">
                                <strong className="text-primary">Operating Systems</strong><br/>
                                <span className="text-muted">CS306 | Prof. Kavitha Rao</span><br/>
                                <span className="badge bg-info">CSE-105</span>
                              </div>
                            </td>
                            <td className="p-2">
                              <div className="small">
                                <strong className="text-danger">Networks Lab</strong><br/>
                                <span className="text-muted">CS302 | Prof. Anita Sharma</span><br/>
                                <span className="badge bg-danger">Lab</span>
                              </div>
                            </td>
                            <td className="p-2">
                              <div className="small">
                                <strong className="text-danger">OS Lab</strong><br/>
                                <span className="text-muted">CS306 | Prof. Kavitha Rao</span><br/>
                                <span className="badge bg-danger">Lab</span>
                              </div>
                            </td>
                            <td className="p-2">
                              <div className="small">
                                <strong className="text-warning">Networks Tutorial</strong><br/>
                                <span className="text-muted">CS302 | Prof. Anita Sharma</span><br/>
                                <span className="badge bg-secondary">Tutorial</span>
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <td className="fw-semibold bg-light">11:30-12:30</td>
                            <td className="p-2">
                              <div className="small">
                                <strong className="text-danger">Database Lab</strong><br/>
                                <span className="text-muted">CS303 | Dr. Vikram Singh</span><br/>
                                <span className="badge bg-danger">Lab</span>
                              </div>
                            </td>
                            <td className="p-2">
                              <div className="small">
                                <strong className="text-danger">Web Tech Lab</strong><br/>
                                <span className="text-muted">CS307 | Dr. Amit Gupta</span><br/>
                                <span className="badge bg-danger">Lab</span>
                              </div>
                            </td>
                            <td className="p-2">
                              <div className="small">
                                <strong className="text-success">Database Systems</strong><br/>
                                <span className="text-muted">CS303 | Dr. Vikram Singh</span><br/>
                                <span className="badge bg-info">CSE-102</span>
                              </div>
                            </td>
                            <td className="p-2">
                              <div className="small">
                                <strong className="text-info">Web Technologies</strong><br/>
                                <span className="text-muted">CS307 | Dr. Amit Gupta</span><br/>
                                <span className="badge bg-info">CSE-107</span>
                              </div>
                            </td>
                            <td className="p-2">
                              <div className="small">
                                <strong className="text-success">Database Systems</strong><br/>
                                <span className="text-muted">CS303 | Dr. Vikram Singh</span><br/>
                                <span className="badge bg-info">CSE-103</span>
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <td className="fw-semibold bg-light">2:00-3:00</td>
                            <td className="p-2">
                              <div className="small">
                                <strong className="text-warning">Software Engineering</strong><br/>
                                <span className="text-muted">CS304 | Prof. Meera Patel</span><br/>
                                <span className="badge bg-info">CSE-103</span>
                              </div>
                            </td>
                            <td className="p-2">
                              <div className="small">
                                <strong className="text-warning">Machine Learning</strong><br/>
                                <span className="text-muted">CS308 | Prof. Priya Nair</span><br/>
                                <span className="badge bg-secondary">Tutorial</span>
                              </div>
                            </td>
                            <td className="p-2">
                              <div className="small">
                                <strong className="text-danger">Software Eng Lab</strong><br/>
                                <span className="text-muted">CS304 | Prof. Meera Patel</span><br/>
                                <span className="badge bg-danger">Lab</span>
                              </div>
                            </td>
                            <td className="p-2">
                              <div className="small">
                                <strong className="text-info">Machine Learning</strong><br/>
                                <span className="text-muted">CS308 | Prof. Priya Nair</span><br/>
                                <span className="badge bg-info">CSE-106</span>
                              </div>
                            </td>
                            <td className="p-2">
                              <div className="small">
                                <strong className="text-danger">Project Work</strong><br/>
                                <span className="text-muted">CS309 | Dr. Rajesh Kumar</span><br/>
                                <span className="badge bg-danger">Lab</span>
                              </div>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>

                {/* Legend */}
                <div className="mt-3">
                  <small className="text-muted">
                    <span className="badge bg-info me-2">Lecture</span>
                    <span className="badge bg-danger me-2">Lab</span>
                    <span className="badge bg-secondary me-2">Tutorial</span>
                  </small>
                </div>
              </div>
            )}

            {/* Additional Information Tab */}
            {activeTab === 'additional' && (
              <div>
                <h5 className="mb-4">
                  <i className="fas fa-info-circle me-2 text-primary"></i>
                  Additional Information
                </h5>

                <div className="row">
                  {/* Activities & Achievements */}
                  <div className="col-md-6 mb-4">
                    <div className="card border-0 shadow-sm h-100">
                      <div className="card-header bg-light">
                        <h6 className="mb-0">
                          <i className="fas fa-trophy me-2 text-warning"></i>
                          Activities & Achievements
                        </h6>
                      </div>
                      <div className="card-body">
                        {profile?.activities && profile.activities.length > 0 ? (
                          <ul className="list-unstyled">
                            {profile.activities.map((activity, index) => (
                              <li key={index} className="mb-2">
                                <i className="fas fa-medal text-warning me-2"></i>
                                <strong>{activity.title}</strong>
                                {activity.description && (
                                  <div className="text-muted small ms-3">{activity.description}</div>
                                )}
                              </li>
                            ))}
                          </ul>
                        ) : (
                          <p className="text-muted mb-0">No activities recorded</p>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Placement Information */}
                  <div className="col-md-6 mb-4">
                    <div className="card border-0 shadow-sm h-100">
                      <div className="card-header bg-light">
                        <h6 className="mb-0">
                          <i className="fas fa-briefcase me-2 text-success"></i>
                          Placement Status
                        </h6>
                      </div>
                      <div className="card-body">
                        {profile?.placements ? (
                          <div>
                            <div className="mb-3">
                              <span className={`badge ${profile.placements.placementStatus === 'Placed' ? 'bg-success' : 
                                profile.placements.placementStatus === 'In Process' ? 'bg-warning' : 'bg-secondary'} fs-6`}>
                                {profile.placements.placementStatus}
                              </span>
                            </div>
                            {profile.placements.company && (
                              <p className="mb-2">
                                <strong>Company:</strong> {profile.placements.company}
                              </p>
                            )}
                            {profile.placements.package && (
                              <p className="mb-2">
                                <strong>Package:</strong> ₹{profile.placements.package} LPA
                              </p>
                            )}
                          </div>
                        ) : (
                          <p className="text-muted mb-0">No placement information available</p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="row">
                  {/* Library Information */}
                  <div className="col-md-6 mb-4">
                    <div className="card border-0 shadow-sm h-100">
                      <div className="card-header bg-light">
                        <h6 className="mb-0">
                          <i className="fas fa-book-open me-2 text-info"></i>
                          Library Records
                        </h6>
                      </div>
                      <div className="card-body">
                        {profile?.library ? (
                          <div>
                            <p className="mb-2">
                              <strong>Books Issued:</strong> {profile.library.booksIssued || 0}
                            </p>
                            <p className="mb-2">
                              <strong>Books Returned:</strong> {profile.library.booksReturned || 0}
                            </p>
                            <p className="mb-0">
                              <strong>Fine Pending:</strong> ₹{profile.library.fineAmount || 0}
                            </p>
                          </div>
                        ) : (
                          <p className="text-muted mb-0">No library records available</p>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Hostel Information */}
                  <div className="col-md-6 mb-4">
                    <div className="card border-0 shadow-sm h-100">
                      <div className="card-header bg-light">
                        <h6 className="mb-0">
                          <i className="fas fa-bed me-2 text-primary"></i>
                          Hostel Information
                        </h6>
                      </div>
                      <div className="card-body">
                        {profile?.hostel ? (
                          <div>
                            <p className="mb-2">
                              <strong>Status:</strong> 
                              <span className={`badge ms-2 ${profile.hostel.allocated ? 'bg-success' : 'bg-secondary'}`}>
                                {profile.hostel.allocated ? 'Allocated' : 'Not Allocated'}
                              </span>
                            </p>
                            {profile.hostel.allocated && (
                              <>
                                {profile.hostel.blockName && (
                                  <p className="mb-2">
                                    <strong>Block:</strong> {profile.hostel.blockName}
                                  </p>
                                )}
                                {profile.hostel.roomNumber && (
                                  <p className="mb-0">
                                    <strong>Room:</strong> {profile.hostel.roomNumber}
                                  </p>
                                )}
                              </>
                            )}
                          </div>
                        ) : (
                          <p className="text-muted mb-0">No hostel information available</p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Recent Activity Card */}
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
                  {user?.loginTime ? new Date(user.loginTime).toLocaleString() : 'Welcome back!'}
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
  );
}

export default Profile;
