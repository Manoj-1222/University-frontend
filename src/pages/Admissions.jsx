import React, { useState, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { admissionsApi } from '../services/api';

const AdmissionSchema = Yup.object().shape({
  name: Yup.string().min(2, 'Name too short').required('Required'),
  email: Yup.string().email('Invalid email').required('Required'),
  contact: Yup.string().matches(/^[0-9]{10}$/, 'Invalid phone number').required('Required'),
  course: Yup.string().required('Required'),
  address: Yup.string().required('Required'),
  previousEducation: Yup.string().required('Required'),
});

function Admissions() {
  const [activeTab, setActiveTab] = useState('form');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const courses = [
    { value: 'CS', label: 'Computer Science & Engineering', duration: '4 years', description: 'Cutting-edge programming, AI, and software development' },
    { value: 'EE', label: 'Electrical Engineering', duration: '4 years', description: 'Power systems, electronics, and renewable energy' },
    { value: 'ME', label: 'Mechanical Engineering', duration: '4 years', description: 'Design, manufacturing, and automotive engineering' },
    { value: 'CE', label: 'Civil Engineering', duration: '4 years', description: 'Infrastructure, construction, and urban planning' },
    { value: 'ECE', label: 'Electronics & Communication', duration: '4 years', description: 'Communication systems and embedded technologies' },
    { value: 'MBA', label: 'Master of Business Administration', duration: '2 years', description: 'Leadership, strategy, and business management' }
  ];

  const admissionSteps = [
    {
      step: 1,
      title: 'Online Application',
      description: 'Fill out the comprehensive online application form with all required details',
      icon: 'fas fa-edit',
      color: 'text-primary'
    },
    {
      step: 2,
      title: 'Document Upload',
      description: 'Upload all required documents including certificates and photographs',
      icon: 'fas fa-upload',
      color: 'text-info'
    },
    {
      step: 3,
      title: 'Application Fee',
      description: 'Pay the application fee through our secure online payment gateway',
      icon: 'fas fa-credit-card',
      color: 'text-success'
    },
    {
      step: 4,
      title: 'Entrance Exam',
      description: 'Appear for the entrance exam (if applicable for your chosen course)',
      icon: 'fas fa-graduation-cap',
      color: 'text-warning'
    },
    {
      step: 5,
      title: 'Result & Admission',
      description: 'Check your email for admission status and further instructions',
      icon: 'fas fa-trophy',
      color: 'text-danger'
    }
  ];

  const faqs = [
    {
      question: 'What documents are required for admission?',
      answer: '10th & 12th marksheets, transfer certificate, ID proof (Aadhar/Passport), passport size photographs, and caste certificate (if applicable).'
    },
    {
      question: 'Is there an entrance exam for all courses?',
      answer: 'Most undergraduate programs require entrance exams. MBA and some specialized courses have separate entrance criteria. Details will be provided after application submission.'
    },
    {
      question: 'What is the application fee structure?',
      answer: 'Application fee varies by course: ₹500 for UG programs, ₹750 for PG programs. Fee is non-refundable and must be paid online.'
    },
    {
      question: 'How can I check my application status?',
      answer: 'You will receive regular updates via email and SMS. You can also login to the admission portal with your application number to track status.'
    },
    {
      question: 'What is the selection criteria?',
      answer: 'Selection is based on entrance exam scores (60%), academic performance (30%), and personal interview (10%). Specific weightage may vary by course.'
    },
    {
      question: 'Are there any scholarships available?',
      answer: 'Yes, we offer merit-based scholarships, need-based financial aid, and special scholarships for sports and cultural activities. Details available on our scholarship page.'
    }
  ];

  return (
    <div className={`fade-in ${isVisible ? 'visible' : ''}`}>
      {/* Header Section */}
      <div className="text-center mb-5">
        <h1 className="display-4 fw-bold mb-3">Admissions</h1>
        <p className="lead text-muted">Join COE University and begin your journey towards excellence</p>
      </div>

      {/* Navigation Tabs */}
      <div className="row mb-4">
        <div className="col-12">
          <ul className="nav nav-pills nav-fill bg-light rounded-3 p-2">
            <li className="nav-item">
              <button 
                className={`nav-link rounded-3 ${activeTab === 'form' ? 'active' : ''}`} 
                onClick={() => setActiveTab('form')}
              >
                <i className="fas fa-edit me-2"></i>
                Admission Form
              </button>
            </li>
            <li className="nav-item">
              <button 
                className={`nav-link rounded-3 ${activeTab === 'process' ? 'active' : ''}`} 
                onClick={() => setActiveTab('process')}
              >
                <i className="fas fa-list-ol me-2"></i>
                Admission Process
              </button>
            </li>
            <li className="nav-item">
              <button 
                className={`nav-link rounded-3 ${activeTab === 'faq' ? 'active' : ''}`} 
                onClick={() => setActiveTab('faq')}
              >
                <i className="fas fa-question-circle me-2"></i>
                FAQs
              </button>
            </li>
          </ul>
        </div>
      </div>

      {/* Admission Form Tab */}
      {activeTab === 'form' && (
        <div className="row">
          <div className="col-lg-8 mb-4">
            <div className="card border-0 shadow-lg" id="admission-form-section">
              <div className="card-header bg-gradient text-white text-center py-4">
                <h3 className="mb-0">
                  <i className="fas fa-user-graduate me-2"></i>
                  Admission Application Form
                </h3>
              </div>
              <div className="card-body p-5">
                <Formik
                  initialValues={{ 
                    name: '', 
                    email: '', 
                    contact: '', 
                    course: '', 
                    address: '', 
                    previousEducation: '' 
                  }}
                  validationSchema={AdmissionSchema}
                  onSubmit={(values, { setSubmitting, resetForm }) => {
                    // Create form data for file upload
                    const formData = new FormData();
                    
                    // Add text fields
                    Object.keys(values).forEach(key => {
                      formData.append(key, values[key]);
                    });
                    
                    // Submit using our API service
                    admissionsApi.submitApplication(formData)
                      .then(() => {
                        alert('Application submitted successfully! You will receive a confirmation email shortly.');
                        resetForm();
                      })
                      .catch(error => {
                        alert('There was an error submitting your application. Please try again.');
                        console.error('Error:', error);
                      })
                      .finally(() => {
                        setSubmitting(false);
                      });
                  }}
                >
                  {({ isSubmitting, touched, errors }) => (
                    <Form>
                      <div className="row">
                        <div className="col-md-6 mb-4">
                          <label className="form-label fw-semibold">
                            <i className="fas fa-user me-2 text-primary"></i>
                            Full Name *
                          </label>
                          <Field 
                            name="name" 
                            className={`form-control ${
                              touched.name && errors.name ? 'is-invalid' : 
                              touched.name && !errors.name ? 'is-valid' : ''
                            }`}
                            placeholder="Enter your full name"
                          />
                          <ErrorMessage name="name" component="div" className="invalid-feedback" />
                        </div>
                        
                        <div className="col-md-6 mb-4">
                          <label className="form-label fw-semibold">
                            <i className="fas fa-envelope me-2 text-primary"></i>
                            Email Address *
                          </label>
                          <Field 
                            name="email" 
                            type="email" 
                            className={`form-control ${
                              touched.email && errors.email ? 'is-invalid' : 
                              touched.email && !errors.email ? 'is-valid' : ''
                            }`}
                            placeholder="Enter your email"
                          />
                          <ErrorMessage name="email" component="div" className="invalid-feedback" />
                        </div>
                      </div>

                      <div className="row">
                        <div className="col-md-6 mb-4">
                          <label className="form-label fw-semibold">
                            <i className="fas fa-phone me-2 text-primary"></i>
                            Contact Number *
                          </label>
                          <Field 
                            name="contact" 
                            className={`form-control ${
                              touched.contact && errors.contact ? 'is-invalid' : 
                              touched.contact && !errors.contact ? 'is-valid' : ''
                            }`}
                            placeholder="Enter 10-digit mobile number"
                          />
                          <ErrorMessage name="contact" component="div" className="invalid-feedback" />
                        </div>
                        
                        <div className="col-md-6 mb-4">
                          <label className="form-label fw-semibold">
                            <i className="fas fa-graduation-cap me-2 text-primary"></i>
                            Course *
                          </label>
                          <Field 
                            name="course" 
                            as="select" 
                            className={`form-select ${
                              touched.course && errors.course ? 'is-invalid' : 
                              touched.course && !errors.course ? 'is-valid' : ''
                            }`}
                          >
                            <option value="">Select a course</option>
                            {courses.map(course => (
                              <option key={course.value} value={course.value}>
                                {course.label}
                              </option>
                            ))}
                          </Field>
                          <ErrorMessage name="course" component="div" className="invalid-feedback" />
                        </div>
                      </div>

                      <div className="mb-4">
                        <label className="form-label fw-semibold">
                          <i className="fas fa-map-marker-alt me-2 text-primary"></i>
                          Address *
                        </label>
                        <Field 
                          name="address" 
                          as="textarea" 
                          rows="3"
                          className={`form-control ${
                            touched.address && errors.address ? 'is-invalid' : 
                            touched.address && !errors.address ? 'is-valid' : ''
                          }`}
                          placeholder="Enter your complete address"
                        />
                        <ErrorMessage name="address" component="div" className="invalid-feedback" />
                      </div>

                      <div className="mb-4">
                        <label className="form-label fw-semibold">
                          <i className="fas fa-book me-2 text-primary"></i>
                          Previous Education *
                        </label>
                        <Field 
                          name="previousEducation" 
                          as="textarea" 
                          rows="2"
                          className={`form-control ${
                            touched.previousEducation && errors.previousEducation ? 'is-invalid' : 
                            touched.previousEducation && !errors.previousEducation ? 'is-valid' : ''
                          }`}
                          placeholder="Mention your highest qualification, school/college name, and percentage"
                        />
                        <ErrorMessage name="previousEducation" component="div" className="invalid-feedback" />
                      </div>

                      <div className="text-center">
                        <button 
                          type="submit" 
                          className="btn btn-primary btn-lg px-5" 
                          disabled={isSubmitting}
                        >
                          {isSubmitting ? (
                            <>
                              <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                              Submitting...
                            </>
                          ) : (
                            <>
                              <i className="fas fa-paper-plane me-2"></i>
                              Submit Application
                            </>
                          )}
                        </button>
                      </div>
                    </Form>
                  )}
                </Formik>
              </div>
            </div>
          </div>
          
          <div className="col-lg-4">
            <div className="card border-0 shadow-sm">
              <div className="card-header bg-light">
                <h5 className="mb-0">
                  <i className="fas fa-info-circle me-2 text-info"></i>
                  Available Courses
                </h5>
              </div>
              <div className="card-body">
                {courses.map((course, index) => (
                  <div key={index} className="course-item p-3 mb-3 rounded-3 bg-light">
                    <h6 className="fw-bold text-primary mb-2">{course.label}</h6>
                    <p className="text-muted small mb-1">
                      <i className="fas fa-clock me-1"></i>
                      Duration: {course.duration}
                    </p>
                    <p className="text-muted small mb-0">{course.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Admission Process Tab */}
      {activeTab === 'process' && (
        <div className="row">
          <div className="col-12">
            <div className="card border-0 shadow-lg">
              <div className="card-header bg-gradient text-white text-center py-4">
                <h3 className="mb-0">
                  <i className="fas fa-route me-2"></i>
                  Admission Process
                </h3>
              </div>
              <div className="card-body p-5">
                <div className="row">
                  {admissionSteps.map((item, index) => (
                    <div key={index} className="col-lg-4 col-md-6 mb-4">
                      <div className="process-card h-100 p-4 rounded-3 text-center">
                        <div className={`process-icon mb-3 ${item.color}`}>
                          <i className={`${item.icon} fa-3x`}></i>
                        </div>
                        <div className="step-number mb-3">
                          <span className="badge bg-primary rounded-pill px-3 py-2">
                            Step {item.step}
                          </span>
                        </div>
                        <h5 className="fw-bold mb-3">{item.title}</h5>
                        <p className="text-muted">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* FAQ Tab */}
      {activeTab === 'faq' && (
        <div className="row">
          <div className="col-12">
            <div className="card border-0 shadow-lg">
              <div className="card-header bg-gradient text-white text-center py-4">
                <h3 className="mb-0">
                  <i className="fas fa-question-circle me-2"></i>
                  Frequently Asked Questions
                </h3>
              </div>
              <div className="card-body p-5">
                <div className="accordion" id="faqAccordion">
                  {faqs.map((faq, index) => (
                    <div key={index} className="accordion-item border-0 shadow-sm mb-3">
                      <h2 className="accordion-header">
                        <button 
                          className="accordion-button collapsed fw-semibold" 
                          type="button" 
                          data-bs-toggle="collapse" 
                          data-bs-target={`#faq${index}`}
                        >
                          <i className="fas fa-question text-primary me-2"></i>
                          {faq.question}
                        </button>
                      </h2>
                      <div 
                        id={`faq${index}`} 
                        className="accordion-collapse collapse" 
                        data-bs-parent="#faqAccordion"
                      >
                        <div className="accordion-body text-muted">
                          <i className="fas fa-answer text-success me-2"></i>
                          {faq.answer}
                        </div>
                      </div>
                    </div>
                  ))}
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
        
        .course-item {
          transition: all 0.3s ease;
          border: 1px solid #e5e7eb;
        }
        
        .course-item:hover {
          background: white !important;
          transform: translateY(-2px);
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
        }
        
        .process-card {
          background: rgba(255, 255, 255, 0.8);
          border: 1px solid #e5e7eb;
          transition: all 0.3s ease;
        }
        
        .process-card:hover {
          background: white;
          transform: translateY(-5px);
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
        }
        
        .process-icon {
          transition: transform 0.3s ease;
        }
        
        .process-card:hover .process-icon {
          transform: scale(1.1);
        }
        
        .accordion-button {
          background: #f8fafc;
          border: none;
        }
        
        .accordion-button:not(.collapsed) {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
        }
        
        .accordion-button:focus {
          box-shadow: none;
        }
      `}</style>
    </div>
  );
}

export default Admissions;