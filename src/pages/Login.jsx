import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import * as Yup from 'yup';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required')
});

function Login() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async (values, { setSubmitting }) => {
    setIsSubmitting(true);
    try {
      const success = await login(values.email, values.password);
      
      if (success) {
        toast.success('Login successful! Redirecting...');
        navigate('/dashboard');
      } else {
        toast.error('Invalid email or password');
      }
    } catch (err) {
      console.error('Login error:', err);
      toast.error('An error occurred during login');
    } finally {
      setIsSubmitting(false);
      setSubmitting(false);
    }
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-lg-6 col-md-8">
          <div className="card shadow-lg border-0">
            <div className="card-header bg-primary text-white text-center py-4">
              <h3>
                <i className="fas fa-user-graduate me-2"></i>
                Student Login
              </h3>
            </div>
            <div className="card-body p-5">
              <Formik
                initialValues={{ 
                  email: '', 
                  password: ''
                }}
                validationSchema={LoginSchema}
                onSubmit={handleLogin}
              >
                {({ errors, touched }) => (
                  <Form>
                    <div className="mb-4">
                      <label htmlFor="email" className="form-label fw-semibold">
                        <i className="fas fa-envelope me-2 text-primary"></i>
                        Email Address
                      </label>
                      <Field
                        name="email"
                        type="email"
                        className={`form-control form-control-lg ${
                          touched.email && errors.email ? 'is-invalid' : ''
                        }`}
                        placeholder="Enter your email"
                      />
                      <ErrorMessage name="email" component="div" className="invalid-feedback" />
                    </div>

                    <div className="mb-4">
                      <label htmlFor="password" className="form-label fw-semibold">
                        <i className="fas fa-lock me-2 text-primary"></i>
                        Password
                      </label>
                      <div className="position-relative">
                        <Field
                          name="password"
                          type={showPassword ? "text" : "password"}
                          className={`form-control form-control-lg ${
                            touched.password && errors.password ? 'is-invalid' : ''
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
                        <Field 
                          className="form-check-input" 
                          type="checkbox" 
                          id="rememberMe" 
                          name="rememberMe"
                        />
                        <label className="form-check-label text-muted" htmlFor="rememberMe">
                          Remember me
                        </label>
                      </div>
                      <a href="/forgot-password" className="text-decoration-none">
                        Forgot Password?
                      </a>
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
        </div>
      </div>

      <style jsx>{`
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
        
        .user-type-selector input[type="radio"]:checked + .selector-content {
          border-color: #667eea;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
        }
        
        .user-type-selector.is-invalid .selector-content {
          border-color: #dc3545;
        }
      `}</style>
      <ToastContainer
  position="top-right"
  autoClose={5000}
  hideProgressBar={false}
  newestOnTop={false}
  closeOnClick
  rtl={false}
  pauseOnFocusLoss
  draggable
  pauseOnHover
/>
    </div>
  );
}

export default Login;