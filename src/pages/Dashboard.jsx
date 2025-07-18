import React, { useState, useEffect } from 'react';

function Dashboard() {
  const [isVisible, setIsVisible] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Mock student data - in real app, this would come from API
  const studentData = {
    profile: {
      name: 'John Doe',
      rollNo: 'CS21001',
      studentId: '2021CS001',
      department: 'Computer Science & Engineering',
      semester: '6th Semester',
      year: '3rd Year',
      email: 'john.doe@student.eduverse.edu',
      phone: '+91-9876543210',
      dateOfBirth: '15/08/2003',
      bloodGroup: 'B+',
      address: '123 Student Hostel, University Campus',
      guardian: 'Robert Doe',
      guardianPhone: '+91-9876543211'
    },
    academics: {
      cgpa: 8.5,
      sgpa: 8.8,
      totalCredits: 150,
      completedCredits: 120,
      subjects: [
        { code: 'CS301', name: 'Data Structures & Algorithms', credits: 4, grade: 'A', marks: 92 },
        { code: 'CS302', name: 'Database Management Systems', credits: 4, grade: 'A-', marks: 88 },
        { code: 'CS303', name: 'Computer Networks', credits: 3, grade: 'B+', marks: 85 },
        { code: 'CS304', name: 'Software Engineering', credits: 3, grade: 'A', marks: 90 },
        { code: 'MA301', name: 'Discrete Mathematics', credits: 3, grade: 'B+', marks: 82 }
      ]
    },
    attendance: {
      overall: 88,
      subjects: [
        { name: 'Data Structures & Algorithms', present: 42, total: 48, percentage: 87.5 },
        { name: 'Database Management Systems', present: 40, total: 45, percentage: 88.9 },
        { name: 'Computer Networks', present: 38, total: 42, percentage: 90.5 },
        { name: 'Software Engineering', present: 35, total: 40, percentage: 87.5 },
        { name: 'Discrete Mathematics', present: 36, total: 42, percentage: 85.7 }
      ]
    },
    fees: {
      totalFee: 150000,
      paidAmount: 100000,
      pendingAmount: 50000,
      nextDueDate: '2025-08-15',
      transactions: [
        { date: '2025-06-15', amount: 50000, type: 'Semester Fee', status: 'Paid' },
        { date: '2025-03-15', amount: 50000, type: 'Semester Fee', status: 'Paid' },
        { date: '2025-08-15', amount: 50000, type: 'Semester Fee', status: 'Pending' }
      ]
    },
    timetable: [
      { day: 'Monday', time: '9:00-10:00', subject: 'Data Structures', room: 'CS-101' },
      { day: 'Monday', time: '10:00-11:00', subject: 'Database Systems', room: 'CS-102' },
      { day: 'Monday', time: '11:30-12:30', subject: 'Computer Networks', room: 'CS-103' },
      { day: 'Tuesday', time: '9:00-10:00', subject: 'Software Engineering', room: 'CS-104' },
      { day: 'Tuesday', time: '10:00-11:00', subject: 'Discrete Mathematics', room: 'MA-201' },
      { day: 'Wednesday', time: '9:00-10:00', subject: 'Data Structures Lab', room: 'CS-Lab1' },
      { day: 'Wednesday', time: '10:00-12:00', subject: 'Database Lab', room: 'CS-Lab2' }
    ]
  };

  const getAttendanceColor = (percentage) => {
    if (percentage >= 90) return 'success';
    if (percentage >= 75) return 'warning';
    return 'danger';
  };

  const getGradeColor = (grade) => {
    if (grade === 'A' || grade === 'A+') return 'success';
    if (grade === 'A-' || grade === 'B+') return 'info';
    if (grade === 'B' || grade === 'B-') return 'warning';
    return 'danger';
  };

  return (
    <div className={`fade-in ${isVisible ? 'visible' : ''}`}>
      {/* Header Section */}
      <div className="row mb-4">
        <div className="col-12">
          <div className="card border-0 shadow-lg dashboard-header">
            <div className="card-body p-4">
              <div className="row align-items-center">
                <div className="col-md-8">
                  <div className="d-flex align-items-center">
                    <div className="profile-avatar me-4">
                      <img 
                        src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face" 
                        alt="Profile" 
                        className="rounded-circle"
                        width="80" 
                        height="80"
                      />
                    </div>
                    <div>
                      <h2 className="mb-1">Welcome, {studentData.profile.name}!</h2>
                      <p className="text-muted mb-1">
                        <i className="fas fa-id-badge me-2"></i>
                        Roll No: {studentData.profile.rollNo} | Student ID: {studentData.profile.studentId}
                      </p>
                      <p className="text-muted mb-0">
                        <i className="fas fa-graduation-cap me-2"></i>
                        {studentData.profile.department} - {studentData.profile.semester}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-md-4 text-end">
                  <div className="quick-stats">
                    <div className="stat-item mb-2">
                      <span className="badge bg-primary fs-6">CGPA: {studentData.academics.cgpa}</span>
                    </div>
                    <div className="stat-item">
                      <span className="badge bg-success fs-6">Attendance: {studentData.attendance.overall}%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="row mb-4">
        <div className="col-12">
          <ul className="nav nav-pills nav-fill bg-light rounded-3 p-2">
            <li className="nav-item">
              <button 
                className={`nav-link rounded-3 ${activeTab === 'overview' ? 'active' : ''}`} 
                onClick={() => setActiveTab('overview')}
              >
                <i className="fas fa-chart-line me-2"></i>
                Overview
              </button>
            </li>
            <li className="nav-item">
              <button 
                className={`nav-link rounded-3 ${activeTab === 'profile' ? 'active' : ''}`} 
                onClick={() => setActiveTab('profile')}
              >
                <i className="fas fa-user me-2"></i>
                Profile
              </button>
            </li>
            <li className="nav-item">
              <button 
                className={`nav-link rounded-3 ${activeTab === 'academics' ? 'active' : ''}`} 
                onClick={() => setActiveTab('academics')}
              >
                <i className="fas fa-book me-2"></i>
                Academics
              </button>
            </li>
            <li className="nav-item">
              <button 
                className={`nav-link rounded-3 ${activeTab === 'attendance' ? 'active' : ''}`} 
                onClick={() => setActiveTab('attendance')}
              >
                <i className="fas fa-calendar-check me-2"></i>
                Attendance
              </button>
            </li>
            <li className="nav-item">
              <button 
                className={`nav-link rounded-3 ${activeTab === 'fees' ? 'active' : ''}`} 
                onClick={() => setActiveTab('fees')}
              >
                <i className="fas fa-money-bill me-2"></i>
                Fees
              </button>
            </li>
            <li className="nav-item">
              <button 
                className={`nav-link rounded-3 ${activeTab === 'timetable' ? 'active' : ''}`} 
                onClick={() => setActiveTab('timetable')}
              >
                <i className="fas fa-clock me-2"></i>
                Timetable
              </button>
            </li>
          </ul>
        </div>
      </div>

      {/* Overview Tab */}
      {activeTab === 'overview' && (
        <div className="row">
          <div className="col-lg-3 col-md-6 mb-4">
            <div className="card border-0 shadow-sm overview-card">
              <div className="card-body text-center p-4">
                <div className="overview-icon text-primary mb-3">
                  <i className="fas fa-trophy fa-3x"></i>
                </div>
                <h5 className="card-title">CGPA</h5>
                <h3 className="text-primary">{studentData.academics.cgpa}</h3>
                <p className="text-muted small">Current Semester: {studentData.academics.sgpa}</p>
              </div>
            </div>
          </div>
          
          <div className="col-lg-3 col-md-6 mb-4">
            <div className="card border-0 shadow-sm overview-card">
              <div className="card-body text-center p-4">
                <div className="overview-icon text-success mb-3">
                  <i className="fas fa-calendar-check fa-3x"></i>
                </div>
                <h5 className="card-title">Attendance</h5>
                <h3 className="text-success">{studentData.attendance.overall}%</h3>
                <p className="text-muted small">This Semester</p>
              </div>
            </div>
          </div>
          
          <div className="col-lg-3 col-md-6 mb-4">
            <div className="card border-0 shadow-sm overview-card">
              <div className="card-body text-center p-4">
                <div className="overview-icon text-info mb-3">
                  <i className="fas fa-books fa-3x"></i>
                </div>
                <h5 className="card-title">Credits</h5>
                <h3 className="text-info">{studentData.academics.completedCredits}/{studentData.academics.totalCredits}</h3>
                <p className="text-muted small">Completed</p>
              </div>
            </div>
          </div>
          
          <div className="col-lg-3 col-md-6 mb-4">
            <div className="card border-0 shadow-sm overview-card">
              <div className="card-body text-center p-4">
                <div className="overview-icon text-warning mb-3">
                  <i className="fas fa-rupee-sign fa-3x"></i>
                </div>
                <h5 className="card-title">Fees Due</h5>
                <h3 className="text-warning">₹{studentData.fees.pendingAmount.toLocaleString()}</h3>
                <p className="text-muted small">Due: {studentData.fees.nextDueDate}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Profile Tab */}
      {activeTab === 'profile' && (
        <div className="row">
          <div className="col-lg-8 mb-4">
            <div className="card border-0 shadow-lg">
              <div className="card-header bg-gradient text-white">
                <h4 className="mb-0">
                  <i className="fas fa-user me-2"></i>
                  Personal Information
                </h4>
              </div>
              <div className="card-body p-4">
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label className="form-label fw-semibold">Full Name</label>
                    <p className="form-control-plaintext">{studentData.profile.name}</p>
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label fw-semibold">Student ID</label>
                    <p className="form-control-plaintext">{studentData.profile.studentId}</p>
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label fw-semibold">Roll Number</label>
                    <p className="form-control-plaintext">{studentData.profile.rollNo}</p>
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label fw-semibold">Department</label>
                    <p className="form-control-plaintext">{studentData.profile.department}</p>
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label fw-semibold">Email</label>
                    <p className="form-control-plaintext">{studentData.profile.email}</p>
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label fw-semibold">Phone</label>
                    <p className="form-control-plaintext">{studentData.profile.phone}</p>
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label fw-semibold">Date of Birth</label>
                    <p className="form-control-plaintext">{studentData.profile.dateOfBirth}</p>
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label fw-semibold">Blood Group</label>
                    <p className="form-control-plaintext">{studentData.profile.bloodGroup}</p>
                  </div>
                  <div className="col-12 mb-3">
                    <label className="form-label fw-semibold">Address</label>
                    <p className="form-control-plaintext">{studentData.profile.address}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="col-lg-4 mb-4">
            <div className="card border-0 shadow-lg">
              <div className="card-header bg-gradient text-white">
                <h5 className="mb-0">
                  <i className="fas fa-users me-2"></i>
                  Guardian Details
                </h5>
              </div>
              <div className="card-body p-4">
                <div className="mb-3">
                  <label className="form-label fw-semibold">Guardian Name</label>
                  <p className="form-control-plaintext">{studentData.profile.guardian}</p>
                </div>
                <div className="mb-3">
                  <label className="form-label fw-semibold">Guardian Phone</label>
                  <p className="form-control-plaintext">{studentData.profile.guardianPhone}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Academics Tab */}
      {activeTab === 'academics' && (
        <div className="row">
          <div className="col-12 mb-4">
            <div className="card border-0 shadow-lg">
              <div className="card-header bg-gradient text-white">
                <h4 className="mb-0">
                  <i className="fas fa-graduation-cap me-2"></i>
                  Academic Performance
                </h4>
              </div>
              <div className="card-body p-4">
                <div className="row mb-4">
                  <div className="col-md-3 text-center">
                    <h3 className="text-primary">{studentData.academics.cgpa}</h3>
                    <p className="text-muted">CGPA</p>
                  </div>
                  <div className="col-md-3 text-center">
                    <h3 className="text-success">{studentData.academics.sgpa}</h3>
                    <p className="text-muted">Current SGPA</p>
                  </div>
                  <div className="col-md-3 text-center">
                    <h3 className="text-info">{studentData.academics.completedCredits}</h3>
                    <p className="text-muted">Credits Completed</p>
                  </div>
                  <div className="col-md-3 text-center">
                    <h3 className="text-warning">{studentData.academics.totalCredits - studentData.academics.completedCredits}</h3>
                    <p className="text-muted">Credits Remaining</p>
                  </div>
                </div>
                
                <div className="table-responsive">
                  <table className="table table-hover">
                    <thead className="table-dark">
                      <tr>
                        <th>Subject Code</th>
                        <th>Subject Name</th>
                        <th>Credits</th>
                        <th>Marks</th>
                        <th>Grade</th>
                      </tr>
                    </thead>
                    <tbody>
                      {studentData.academics.subjects.map((subject, index) => (
                        <tr key={index}>
                          <td className="fw-semibold">{subject.code}</td>
                          <td>{subject.name}</td>
                          <td>{subject.credits}</td>
                          <td>{subject.marks}</td>
                          <td>
                            <span className={`badge bg-${getGradeColor(subject.grade)}`}>
                              {subject.grade}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Attendance Tab */}
      {activeTab === 'attendance' && (
        <div className="row">
          <div className="col-12 mb-4">
            <div className="card border-0 shadow-lg">
              <div className="card-header bg-gradient text-white">
                <h4 className="mb-0">
                  <i className="fas fa-calendar-check me-2"></i>
                  Attendance Record
                </h4>
              </div>
              <div className="card-body p-4">
                <div className="row mb-4">
                  <div className="col-12 text-center">
                    <h2 className="text-success mb-2">{studentData.attendance.overall}%</h2>
                    <p className="text-muted">Overall Attendance</p>
                  </div>
                </div>
                
                <div className="table-responsive">
                  <table className="table table-hover">
                    <thead className="table-dark">
                      <tr>
                        <th>Subject</th>
                        <th>Present</th>
                        <th>Total Classes</th>
                        <th>Percentage</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {studentData.attendance.subjects.map((subject, index) => (
                        <tr key={index}>
                          <td>{subject.name}</td>
                          <td>{subject.present}</td>
                          <td>{subject.total}</td>
                          <td>{subject.percentage}%</td>
                          <td>
                            <span className={`badge bg-${getAttendanceColor(subject.percentage)}`}>
                              {subject.percentage >= 75 ? 'Good' : 'Low'}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Fees Tab */}
      {activeTab === 'fees' && (
        <div className="row">
          <div className="col-lg-4 mb-4">
            <div className="card border-0 shadow-lg">
              <div className="card-header bg-gradient text-white">
                <h5 className="mb-0">
                  <i className="fas fa-chart-pie me-2"></i>
                  Fee Summary
                </h5>
              </div>
              <div className="card-body p-4">
                <div className="mb-3">
                  <label className="form-label fw-semibold">Total Fee</label>
                  <p className="fs-4 text-primary">₹{studentData.fees.totalFee.toLocaleString()}</p>
                </div>
                <div className="mb-3">
                  <label className="form-label fw-semibold">Paid Amount</label>
                  <p className="fs-5 text-success">₹{studentData.fees.paidAmount.toLocaleString()}</p>
                </div>
                <div className="mb-3">
                  <label className="form-label fw-semibold">Pending Amount</label>
                  <p className="fs-5 text-danger">₹{studentData.fees.pendingAmount.toLocaleString()}</p>
                </div>
                <div className="mb-3">
                  <label className="form-label fw-semibold">Next Due Date</label>
                  <p className="text-warning">{studentData.fees.nextDueDate}</p>
                </div>
                {studentData.fees.pendingAmount > 0 && (
                  <button className="btn btn-primary w-100">
                    <i className="fas fa-credit-card me-2"></i>
                    Pay Now
                  </button>
                )}
              </div>
            </div>
          </div>
          
          <div className="col-lg-8 mb-4">
            <div className="card border-0 shadow-lg">
              <div className="card-header bg-gradient text-white">
                <h5 className="mb-0">
                  <i className="fas fa-history me-2"></i>
                  Payment History
                </h5>
              </div>
              <div className="card-body p-4">
                <div className="table-responsive">
                  <table className="table table-hover">
                    <thead className="table-dark">
                      <tr>
                        <th>Date</th>
                        <th>Description</th>
                        <th>Amount</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {studentData.fees.transactions.map((transaction, index) => (
                        <tr key={index}>
                          <td>{transaction.date}</td>
                          <td>{transaction.type}</td>
                          <td>₹{transaction.amount.toLocaleString()}</td>
                          <td>
                            <span className={`badge bg-${transaction.status === 'Paid' ? 'success' : 'warning'}`}>
                              {transaction.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Timetable Tab */}
      {activeTab === 'timetable' && (
        <div className="row">
          <div className="col-12 mb-4">
            <div className="card border-0 shadow-lg">
              <div className="card-header bg-gradient text-white">
                <h4 className="mb-0">
                  <i className="fas fa-clock me-2"></i>
                  Class Timetable
                </h4>
              </div>
              <div className="card-body p-4">
                <div className="table-responsive">
                  <table className="table table-hover">
                    <thead className="table-dark">
                      <tr>
                        <th>Day</th>
                        <th>Time</th>
                        <th>Subject</th>
                        <th>Room</th>
                      </tr>
                    </thead>
                    <tbody>
                      {studentData.timetable.map((schedule, index) => (
                        <tr key={index}>
                          <td className="fw-semibold">{schedule.day}</td>
                          <td>{schedule.time}</td>
                          <td>{schedule.subject}</td>
                          <td>
                            <span className="badge bg-info">{schedule.room}</span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        .fade-in {
          opacity: 0;
          transform: translateY(30px);
          transition: all 0.8s ease;
        }
        
        .fade-in.visible {
          opacity: 1;
          transform: translateY(0);
        }
        
        .dashboard-header {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
        }
        
        .overview-card {
          transition: all 0.3s ease;
        }
        
        .overview-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
        }
        
        .overview-icon {
          transition: transform 0.3s ease;
        }
        
        .overview-card:hover .overview-icon {
          transform: scale(1.1);
        }
        
        .nav-pills .nav-link {
          color: #6b7280;
          font-weight: 500;
          transition: all 0.3s ease;
        }
        
        .nav-pills .nav-link.active {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
        }
        
        .bg-gradient {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        }
        
        .table th {
          border-top: none;
          font-weight: 600;
        }
        
        .profile-avatar img {
          border: 3px solid white;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        }
      `}</style>
    </div>
  );
}

export default Dashboard; 