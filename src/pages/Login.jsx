import React, { useState, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';

const LoginSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string().required('Required'),
  userType: Yup.string().required('Please select user type'),
});

function Login() {
  const [isVisible, setIsVisible] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className={`fade-in ${isVisible ? 'visible' : ''}`}>
      <div className="row justify-content-center">
        <div className="col-lg-5 col-md-7">
          <div className="login-container">
            {/* Header Section */}
            <div className="text-center mb-5">
              <div className="login-icon mb-4">
                <i className="fas fa-graduation-cap fa-4x text-primary"></i>
              </div>
              <h2 className="fw-bold mb-2">Welcome Back!</h2>
              <p className="text-muted">Sign in to access your account</p>
            </div>

            {/* User Type Selection */}
            <div className="row mb-4">
              <div className="col-6">
                <div className="user-type-card text-center p-3 rounded-3" style={{ background: 'rgba(102, 126, 234, 0.1)', border: '2px solid rgba(102, 126, 234, 0.2)' }}>
                  <i className="fas fa-user-graduate fa-2x text-primary mb-2"></i>
                  <h6 className="fw-semibold">Student Portal</h6>
                  <small className="text-muted">Access your ERP</small>
                </div>
              </div>
              <div className="col-6">
                <div className="user-type-card text-center p-3 rounded-3" style={{ background: 'rgba(108, 117, 125, 0.1)', border: '2px solid rgba(108, 117, 125, 0.2)' }}>
                  <i className="fas fa-chalkboard-teacher fa-2x text-secondary mb-2"></i>
                  <h6 className="fw-semibold">Faculty Portal</h6>
                  <small className="text-muted">Staff Access</small>
                </div>
              </div>
            </div>

            {/* Login Form */}
            <div className="card border-0 shadow-lg">
              <div className="card-body p-5">
                <Formik
                  initialValues={{ email: '', password: '', userType: 'student' }}
                  validationSchema={LoginSchema}
                  onSubmit={(values, { setSubmitting }) => {
                    setTimeout(() => {
                      // Mock login - in real app this would call API
                      const userData = {
                        id: values.userType === 'student' ? 'STU001' : 'FAC001',
                        name: values.userType === 'student' ? 'John Doe' : 'Dr. Smith',
                        email: values.email,
                        userType: values.userType,
                        loginTime: new Date().toISOString()
                      };

                      // Store user data in localStorage
                      localStorage.setItem('user', JSON.stringify(userData));
                      localStorage.setItem('isLoggedIn', 'true');

                      if (values.userType === 'student') {
                        // Redirect to student dashboard
                        navigate('/dashboard');
                      } else {
                        alert('Faculty portal functionality will be added soon!');
                        navigate('/dashboard');
                      }
                      setSubmitting(false);
                    }, 1000);
                  }}
                >
                  {({ isSubmitting, touched, errors, values }) => (
                    <Form>
                      <div className="mb-4">
                        <label className="form-label fw-semibold">
                          <i className="fas fa-users me-2 text-primary"></i>
                          Login As
                        </label>
                        <div className="row">
                          <div className="col-6">
                            <label className={`user-type-selector ${values.userType === 'student' ? 'active' : ''}`}>
                              <Field 
                                type="radio" 
                                name="userType" 
                                value="student" 
                                className="d-none"
                              />
                              <div className="selector-content text-center p-3 rounded-3">
                                <i className="fas fa-user-graduate fa-2x mb-2"></i>
                                <div className="fw-semibold">Student</div>
                              </div>
                            </label>
                          </div>
                          <div className="col-6">
                            <label className={`user-type-selector ${values.userType === 'faculty' ? 'active' : ''}`}>
                              <Field 
                                type="radio" 
                                name="userType" 
                                value="faculty" 
                                className="d-none"
                              />
                              <div className="selector-content text-center p-3 rounded-3">
                                <i className="fas fa-chalkboard-teacher fa-2x mb-2"></i>
                                <div className="fw-semibold">Faculty</div>
                              </div>
                            </label>
                          </div>
                        </div>
                        <ErrorMessage name="userType" component="div" className="text-danger mt-2" />
                      </div>
                      <div className="mb-4">
                        <label className="form-label fw-semibold">
                          <i className="fas fa-envelope me-2 text-primary"></i>
                          Email Address
                        </label>
                        <Field 
                          name="email" 
                          type="email" 
                          className={`form-control form-control-lg ${
                            touched.email && errors.email ? 'is-invalid' : 
                            touched.email && !errors.email ? 'is-valid' : ''
                          }`}
                          placeholder="Enter your email"
                        />
                        <ErrorMessage name="email" component="div" className="invalid-feedback" />
                      </div>

                      <div className="mb-4">
                        <label className="form-label fw-semibold">
                          <i className="fas fa-lock me-2 text-primary"></i>
                          Password
                        </label>
                        <div className="position-relative">
                          <Field 
                            name="password" 
                            type={showPassword ? "text" : "password"} 
                            className={`form-control form-control-lg ${
                              touched.password && errors.password ? 'is-invalid' : 
                              touched.password && !errors.password ? 'is-valid' : ''
                            }`}
                            placeholder="Enter your password"
                          />
                          <button
                            type="button"
                            className="btn btn-link position-absolute top-50 end-0 translate-middle-y me-2"
                            onClick={() => setShowPassword(!showPassword)}
                            style={{ zIndex: 10 }}
                          >
                            <i className={`fas ${showPassword ? 'fa-eye-slash' : 'fa-eye'} text-muted`}></i>
                          </button>
                        </div>
                        <ErrorMessage name="password" component="div" className="invalid-feedback" />
                      </div>

                      <div className="mb-4 d-flex justify-content-between align-items-center">
                        <div className="form-check">
                          <input className="form-check-input" type="checkbox" id="rememberMe" />
                          <label className="form-check-label text-muted" htmlFor="rememberMe">
                            Remember me
                          </label>
                        </div>
                        <a href="#" className="text-decoration-none">Forgot Password?</a>
                      </div>

                      <button 
                        type="submit" 
                        className="btn btn-primary btn-lg w-100 mb-4" 
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? (
                          <>
                            <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                            Signing In...
                          </>
                        ) : (
                          <>
                            <i className="fas fa-sign-in-alt me-2"></i>
                            Sign In
                          </>
                        )}
                      </button>

                      <div className="text-center">
                        <p className="text-muted mb-0">
                          Don't have an account? 
                          <a href="/admissions" className="text-decoration-none ms-1 fw-semibold">
                            Apply for Admission
                          </a>
                        </p>
                      </div>
                    </Form>
                  )}
                </Formik>
              </div>
            </div>

            {/* Additional Info */}
            <div className="row mt-5">
              <div className="col-md-4 text-center mb-3">
                <div className="info-card p-3">
                  <i className="fas fa-shield-alt fa-2x text-success mb-2"></i>
                  <h6>Secure Login</h6>
                  <small className="text-muted">Your data is protected</small>
                </div>
              </div>
              <div className="col-md-4 text-center mb-3">
                <div className="info-card p-3">
                  <i className="fas fa-clock fa-2x text-info mb-2"></i>
                  <h6>24/7 Access</h6>
                  <small className="text-muted">Available anytime</small>
                </div>
              </div>
              <div className="col-md-4 text-center mb-3">
                <div className="info-card p-3">
                  <i className="fas fa-headset fa-2x text-warning mb-2"></i>
                  <h6>Support</h6>
                  <small className="text-muted">Help when you need it</small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

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
        
        .login-container {
          max-width: 100%;
          margin: 0 auto;
        }
        
        .login-icon {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          width: 80px;
          height: 80px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto;
        }
        
        .login-icon i {
          background: linear-gradient(135deg, #ffffff, #f8fafc);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        
        .form-control-lg {
          padding: 1rem;
          font-size: 1rem;
        }
        
        .form-control:focus {
          border-color: #667eea;
          box-shadow: 0 0 0 0.2rem rgba(102, 126, 234, 0.25);
        }
        
        .btn-primary {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          border: none;
          font-weight: 600;
          padding: 1rem;
          transition: all 0.3s ease;
        }
        
        .btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(102, 126, 234, 0.3);
        }
        
        .btn-primary:disabled {
          opacity: 0.7;
          transform: none;
        }
        
        .info-card {
          background: rgba(255, 255, 255, 0.8);
          border-radius: 1rem;
          transition: all 0.3s ease;
        }
        
        .info-card:hover {
          background: white;
          transform: translateY(-5px);
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
        }
        
        .form-check-input:checked {
          background-color: #667eea;
          border-color: #667eea;
        }
        
        .is-valid {
          border-color: #10b981;
        }
        
        .is-invalid {
          border-color: #ef4444;
        }
        
        .btn-link {
          color: #6b7280;
          text-decoration: none;
          padding: 0.25rem;
        }
        
        .btn-link:hover {
          color: #374151;
        }
        
        .user-type-selector {
          cursor: pointer;
          display: block;
          width: 100%;
        }
        
        .user-type-selector .selector-content {
          border: 2px solid #e5e7eb;
          transition: all 0.3s ease;
          background: #f8fafc;
        }
        
        .user-type-selector:hover .selector-content {
          border-color: #667eea;
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(102, 126, 234, 0.15);
        }
        
        .user-type-selector.active .selector-content {
          border-color: #667eea;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
        }
        
        .user-type-card {
          transition: all 0.3s ease;
          cursor: pointer;
        }
        
        .user-type-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(102, 126, 234, 0.15);
        }
      `}</style>
    </div>
  );
}

export default Login; 