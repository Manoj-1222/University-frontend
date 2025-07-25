import React, { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import { studentApi } from '../services/api';

function Dashboard() {
  const [isVisible, setIsVisible] = useState(false);
  const { user, logout } = useAuth();
  
  // State for student data
  const [studentData, setStudentData] = useState({
    profile: {},
    academic: {
      currentCGPA: 0,
      totalCredits: 0,
      backlogs: 0,
      grades: []
    },
    attendance: {},
    feeStructure: {},
    placements: {},
  });
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Calculate credits based on year and semester
  const calculateCredits = (year, semester) => {
    const creditsPerSemester = 22; // Average credits per semester
    const currentYear = parseInt(year) || 1;
    const currentSemester = parseInt(semester) || 1;
    
    // Calculate total semesters completed
    const totalSemesters = (currentYear - 1) * 2 + (currentSemester - 1);
    return totalSemesters * creditsPerSemester;
  };

  useEffect(() => {
    setIsVisible(true);
    
    // Only fetch data if user is logged in
    if (user) {
      const fetchStudentData = async () => {
        try {
          setLoading(true);
          
          // Fetch comprehensive profile data
          const profileResponse = await studentApi.getProfile();
          console.log('Dashboard received profile response:', profileResponse);
          
          const profileData = profileResponse.data || profileResponse;
          console.log('Extracted profile data:', profileData);
          
          setStudentData({
            profile: {
              name: profileData.name || 'N/A',
              email: profileData.email || 'N/A',
              rollNo: profileData.rollNo || 'N/A',
              department: profileData.department || 'N/A',
              year: profileData.year || 'N/A',
              semester: profileData.semester || 'N/A',
              phone: profileData.phone || 'N/A',
              bloodGroup: profileData.bloodGroup || 'N/A',
              dateOfBirth: profileData.dateOfBirth || null,
            },
            academic: {
              currentCGPA: profileData.currentCGPA || 0,
              totalCredits: profileData.totalCredits || calculateCredits(profileData.year, profileData.semester),
              backlogs: profileData.backlogs || 0,
              grades: profileData.grades || []
            },
            attendance: {
              percentage: profileData.attendance?.percentage || 0,
              totalClasses: profileData.attendance?.totalClasses || 0,
              attendedClasses: profileData.attendance?.attendedClasses || 0
            },
            feeStructure: {
              totalFee: profileData.totalFee || 0,
              paidAmount: profileData.paidAmount || 0,
              pendingAmount: (profileData.totalFee || 0) - (profileData.paidAmount || 0)
            },
            placements: {
              status: profileData.placementStatus || 'Not Placed',
              company: profileData.company || 'N/A',
              package: profileData.package || 0
            },
          });
          
        } catch (err) {
          console.error('Error fetching student data:', err);
          setError('Failed to load student data');
        } finally {
          setLoading(false);
        }
      };

      fetchStudentData();
    }
  }, [user]);

  // Handle logout
  const handleLogout = () => {
    logout();
  };

  const getCGPAColor = (cgpa) => {
    if (cgpa >= 8.5) return 'success';
    if (cgpa >= 7.0) return 'primary';
    if (cgpa >= 6.0) return 'warning';
    return 'danger';
  };

  const getAttendanceColor = (percentage) => {
    if (percentage >= 90) return 'success';
    if (percentage >= 75) return 'warning';
    return 'danger';
  };

  // Show loading state
  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '400px' }}>
        <div className="text-center">
          <div className="spinner-border text-primary mb-3" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="text-muted">Loading your profile...</p>
        </div>
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className="alert alert-danger mx-3">
        <i className="fas fa-exclamation-triangle me-2"></i>
        {error}
      </div>
    );
  }

  return (
    <div className={`dashboard-container ${isVisible ? 'fade-in' : ''}`}>
      {/* Header Section */}
      <div className="row mb-4">
        <div className="col-12">
          <div className="card border-0 shadow-sm">
            <div className="card-body p-4" style={{ background: 'linear-gradient(135deg, #2c3e50 0%, #3498db 100%)', color: 'white', borderRadius: '0.75rem' }}>
              <div className="row align-items-center">
                <div className="col-md-8">
                  <div className="d-flex align-items-center">
                    <div className="profile-avatar me-4">
                      <div className="avatar-circle d-flex align-items-center justify-content-center">
                        <i className="fas fa-user fa-2x text-white"></i>
                      </div>
                    </div>
                    <div>
                      <h2 className="mb-2 fw-bold" style={{ color: '#ffffff', textShadow: '1px 1px 2px rgba(0,0,0,0.3)' }}>Welcome, {studentData.profile.name}!</h2>
                      <p className="mb-1" style={{ 
                        color: '#ffffff', 
                        fontSize: '1.1rem', 
                        fontWeight: '600',
                        textShadow: '1px 1px 3px rgba(0,0,0,0.5)',
                        backgroundColor: 'rgba(0,0,0,0.2)',
                        padding: '0.4rem 1rem',
                        borderRadius: '20px',
                        display: 'inline-block',
                        border: '1px solid rgba(255,255,255,0.3)'
                      }}>
                        <i className="fas fa-id-badge me-2" style={{ color: '#ffffff' }}></i>
                        <span style={{ color: '#ffffff' }}>Roll No: {studentData.profile.rollNo}</span>
                      </p>
                      <br />
                      <p className="mb-0" style={{ 
                        color: '#ffffff', 
                        fontSize: '1rem',
                        fontWeight: '500',
                        textShadow: '1px 1px 3px rgba(0,0,0,0.5)',
                        backgroundColor: 'rgba(0,0,0,0.15)',
                        padding: '0.3rem 0.8rem',
                        borderRadius: '15px',
                        display: 'inline-block',
                        marginTop: '0.5rem',
                        border: '1px solid rgba(255,255,255,0.2)'
                      }}>
                        <i className="fas fa-graduation-cap me-2" style={{ color: '#ffffff' }}></i>
                        <span style={{ color: '#ffffff' }}>{studentData.profile.department} - Year {studentData.profile.year}, Semester {studentData.profile.semester}</span>
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-md-4 text-end">
                  <button 
                    className="btn btn-light btn-sm px-3 py-2 fw-semibold"
                    onClick={handleLogout}
                    title="Logout"
                    style={{ 
                      backgroundColor: '#ffffff', 
                      color: '#2c3e50', 
                      border: 'none',
                      borderRadius: '25px',
                      boxShadow: '0 2px 8px rgba(0,0,0,0.2)'
                    }}
                  >
                    <i className="fas fa-sign-out-alt me-2"></i>
                    Logout
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content - All Data in One View */}
      <div className="row">
        {/* Personal Information */}
        <div className="col-lg-4 mb-4">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-header border-0" style={{ backgroundColor: '#f8f9fa', borderBottom: '3px solid #007bff' }}>
              <h5 className="mb-0 fw-bold" style={{ color: '#2c3e50' }}>
                <i className="fas fa-user-circle me-2" style={{ color: '#007bff' }}></i>
                Personal Information
              </h5>
            </div>
            <div className="card-body">
              <div className="info-group mb-3">
                <label className="info-label">Full Name</label>
                <p className="info-value">{studentData.profile.name}</p>
              </div>
              <div className="info-group mb-3">
                <label className="info-label">Email Address</label>
                <p className="info-value">{studentData.profile.email}</p>
              </div>
              <div className="info-group mb-3">
                <label className="info-label">Phone Number</label>
                <p className="info-value">{studentData.profile.phone}</p>
              </div>
              <div className="info-group mb-3">
                <label className="info-label">Blood Group</label>
                <p className="info-value">{studentData.profile.bloodGroup}</p>
              </div>
              <div className="info-group mb-0">
                <label className="info-label">Date of Birth</label>
                <p className="info-value">
                  {studentData.profile.dateOfBirth 
                    ? new Date(studentData.profile.dateOfBirth).toLocaleDateString() 
                    : 'N/A'
                  }
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Academic Performance */}
        <div className="col-lg-4 mb-4">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-header border-0" style={{ backgroundColor: '#f8f9fa', borderBottom: '3px solid #28a745' }}>
              <h5 className="mb-0 fw-bold" style={{ color: '#2c3e50' }}>
                <i className="fas fa-chart-line me-2" style={{ color: '#28a745' }}></i>
                Academic Performance
              </h5>
            </div>
            <div className="card-body">
              <div className="row mb-3 g-3">
                <div className="col-6">
                  <div className="stat-box text-center p-4 rounded bg-light d-flex flex-column justify-content-center" style={{ minHeight: '110px' }}>
                    <h3 className={`mb-1 text-${getCGPAColor(studentData.academic.currentCGPA)} fw-bold`} style={{ fontSize: '2.2rem', lineHeight: '1.1' }}>
                      {studentData.academic.currentCGPA}
                    </h3>
                    <small className="text-muted fw-semibold">Current CGPA</small>
                  </div>
                </div>
                <div className="col-6">
                  <div className="stat-box text-center p-4 rounded bg-light d-flex flex-column justify-content-center" style={{ minHeight: '110px' }}>
                    <h3 className="mb-1 text-info fw-bold" style={{ fontSize: '2.2rem', lineHeight: '1.1' }}>{studentData.academic.totalCredits}</h3>
                    <small className="text-muted fw-semibold">Total Credits</small>
                  </div>
                </div>
              </div>
              <div className="info-group mb-3">
                <label className="info-label">Department</label>
                <p className="info-value">{studentData.profile.department}</p>
              </div>
              <div className="row">
                <div className="col-6">
                  <div className="info-group">
                    <label className="info-label">Year</label>
                    <p className="info-value">{studentData.profile.year}</p>
                  </div>
                </div>
                <div className="col-6">
                  <div className="info-group">
                    <label className="info-label">Semester</label>
                    <p className="info-value">{studentData.profile.semester}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Attendance & Status */}
        <div className="col-lg-4 mb-4">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-header border-0" style={{ backgroundColor: '#f8f9fa', borderBottom: '3px solid #ffc107' }}>
              <h5 className="mb-0 fw-bold" style={{ color: '#2c3e50' }}>
                <i className="fas fa-calendar-check me-2" style={{ color: '#ffc107' }}></i>
                Attendance & Status
              </h5>
            </div>
            <div className="card-body">
              <div className="attendance-circle mb-4 text-center">
                <div className={`circular-progress text-${getAttendanceColor(studentData.attendance.percentage)}`}>
                  <h2 className="mb-0">{studentData.attendance.percentage}%</h2>
                  <small className="text-muted">Attendance</small>
                </div>
              </div>
              <div className="info-group mb-3">
                <label className="info-label">Placement Status</label>
                <p className="info-value">
                  <span className={`badge bg-${studentData.placements.status === 'Placed' ? 'success' : 'secondary'} p-2`}>
                    {studentData.placements.status}
                  </span>
                </p>
              </div>
              {studentData.placements.status === 'Placed' && (
                <>
                  <div className="info-group mb-3">
                    <label className="info-label">Company</label>
                    <p className="info-value">{studentData.placements.company}</p>
                  </div>
                  <div className="info-group mb-0">
                    <label className="info-label">Package</label>
                    <p className="info-value text-success fw-bold">₹{studentData.placements.package?.toLocaleString()}</p>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Fee Information */}
        <div className="col-lg-12 mb-4">
          <div className="card border-0 shadow-sm">
            <div className="card-header border-0" style={{ backgroundColor: '#f8f9fa', borderBottom: '3px solid #17a2b8' }}>
              <h5 className="mb-0 fw-bold" style={{ color: '#2c3e50' }}>
                <i className="fas fa-money-bill me-2" style={{ color: '#17a2b8' }}></i>
                Fee Information
              </h5>
            </div>
            <div className="card-body">
              <div className="row g-3">
                <div className="col-md-3">
                  <div className="fee-stat text-center p-4 rounded bg-primary bg-opacity-10 d-flex flex-column justify-content-center" style={{ minHeight: '120px' }}>
                    <h4 className="text-primary mb-1 fw-bold" style={{ fontSize: '1.8rem', lineHeight: '1.2' }}>₹{studentData.feeStructure.totalFee?.toLocaleString()}</h4>
                    <small className="text-muted fw-semibold">Total Fee</small>
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="fee-stat text-center p-4 rounded bg-success bg-opacity-10 d-flex flex-column justify-content-center" style={{ minHeight: '120px' }}>
                    <h4 className="text-success mb-1 fw-bold" style={{ fontSize: '1.8rem', lineHeight: '1.2' }}>₹{studentData.feeStructure.paidAmount?.toLocaleString()}</h4>
                    <small className="text-muted fw-semibold">Paid Amount</small>
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="fee-stat text-center p-4 rounded bg-warning bg-opacity-10 d-flex flex-column justify-content-center" style={{ minHeight: '120px' }}>
                    <h4 className="text-warning mb-1 fw-bold" style={{ fontSize: '1.8rem', lineHeight: '1.2' }}>₹{studentData.feeStructure.pendingAmount?.toLocaleString()}</h4>
                    <small className="text-muted fw-semibold">Pending Amount</small>
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="fee-stat text-center p-4 rounded bg-info bg-opacity-10 d-flex flex-column justify-content-center" style={{ minHeight: '120px' }}>
                    <h4 className="text-info mb-1 fw-bold" style={{ fontSize: '1.8rem', lineHeight: '1.2' }}>
                      {studentData.feeStructure.totalFee > 0 
                        ? Math.round((studentData.feeStructure.paidAmount / studentData.feeStructure.totalFee) * 100) 
                        : 0
                      }%
                    </h4>
                    <small className="text-muted fw-semibold">Payment Progress</small>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .dashboard-container {
          opacity: 0;
          transform: translateY(20px);
          transition: all 0.5s ease;
        }
        
        .dashboard-container.fade-in {
          opacity: 1;
          transform: translateY(0);
        }
        
        .avatar-circle {
          width: 80px;
          height: 80px;
          background: rgba(255, 255, 255, 0.3);
          border-radius: 50%;
          backdrop-filter: blur(10px);
          border: 3px solid rgba(255, 255, 255, 0.5);
          box-shadow: 0 4px 15px rgba(0,0,0,0.2);
        }
        
        .info-label {
          font-size: 0.875rem;
          color: #495057;
          font-weight: 700;
          margin-bottom: 0.5rem;
          display: block;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }
        
        .info-value {
          font-size: 1.1rem;
          color: #212529;
          font-weight: 600;
          margin-bottom: 0;
          line-height: 1.4;
        }
        
        .info-group {
          padding: 1rem 0;
          border-bottom: 2px solid #e9ecef;
          transition: all 0.2s ease;
        }
        
        .info-group:hover {
          background-color: #f8f9fa;
          border-radius: 8px;
          padding-left: 1rem;
          padding-right: 1rem;
        }
        
        .info-group:last-child {
          border-bottom: none;
          padding-bottom: 0.5rem;
        }
        
        .stat-box {
          transition: all 0.3s ease;
          border: 2px solid #e9ecef;
          min-height: 110px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }
        
        .stat-box:hover {
          transform: translateY(-4px);
          box-shadow: 0 8px 20px rgba(0,0,0,0.15);
          border-color: #007bff;
        }
        
        .stat-box h3 {
          font-weight: 800;
          font-size: 2.2rem;
          line-height: 1.1;
          margin: 0;
        }
        
        .stat-box small {
          font-weight: 600;
          font-size: 0.85rem;
          color: #495057;
          margin-top: 0.25rem;
        }
        
        .circular-progress {
          width: 120px;
          height: 120px;
          border-radius: 50%;
          background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          margin: 0 auto;
          border: 4px solid #007bff;
          box-shadow: 0 4px 15px rgba(0,123,255,0.2);
        }
        
        .circular-progress h2 {
          font-weight: 800;
          font-size: 1.8rem;
        }
        
        .circular-progress small {
          font-weight: 600;
          color: #495057;
        }
        
        .fee-stat {
          transition: all 0.3s ease;
          border: 2px solid transparent;
          min-height: 120px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }
        
        .fee-stat:hover {
          transform: translateY(-4px);
          box-shadow: 0 8px 25px rgba(0,0,0,0.15);
          border-color: rgba(0,0,0,0.1);
        }
        
        .fee-stat h4 {
          font-weight: 800;
          font-size: 1.8rem;
          line-height: 1.2;
          margin: 0;
        }
        
        .fee-stat small {
          font-weight: 600;
          color: #495057;
          font-size: 0.9rem;
          margin-top: 0.25rem;
        }
        
        .card {
          transition: all 0.3s ease;
          border: 1px solid #e9ecef;
        }
        
        .card:hover {
          box-shadow: 0 12px 35px rgba(0,0,0,0.1) !important;
          transform: translateY(-2px);
        }
        
        .card-body {
          padding: 1.5rem;
        }
      `}</style>
    </div>
  );
}

export default Dashboard;