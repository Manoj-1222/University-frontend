import React, { useState, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const ContactSchema = Yup.object().shape({
  name: Yup.string().min(2, 'Name too short').required('Required'),
  email: Yup.string().email('Invalid email').required('Required'),
  phone: Yup.string().matches(/^[0-9]{10}$/, 'Invalid phone number').required('Required'),
  subject: Yup.string().required('Required'),
  message: Yup.string().min(10, 'Message too short').required('Required'),
});

function Contact() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const contactInfo = [
    {
      icon: 'fas fa-map-marker-alt',
      title: 'Address',
      details: ['123 University Road', 'Education City, State 12345', 'India'],
      color: 'text-primary'
    },
    {
      icon: 'fas fa-phone',
      title: 'Phone',
      details: ['+91-1234567890', '+91-0987654321'],
      color: 'text-success'
    },
    {
      icon: 'fas fa-envelope',
      title: 'Email',
      details: ['admissions@eduverse.edu', 'info@eduverse.edu'],
      color: 'text-info'
    },
    {
      icon: 'fas fa-clock',
      title: 'Office Hours',
      details: ['Mon - Fri: 9:00 AM - 6:00 PM', 'Sat: 9:00 AM - 2:00 PM', 'Sun: Closed'],
      color: 'text-warning'
    }
  ];

  const departments = [
    {
      name: 'Admissions Office',
      email: 'admissions@eduverse.edu',
      phone: '+91-1234567890',
      description: 'For admission inquiries and application support'
    },
    {
      name: 'Academic Office',
      email: 'academics@eduverse.edu',
      phone: '+91-1234567891',
      description: 'For academic queries and course information'
    },
    {
      name: 'Student Services',
      email: 'student.services@eduverse.edu',
      phone: '+91-1234567892',
      description: 'For student support and welfare services'
    },
    {
      name: 'Placement Cell',
      email: 'placements@eduverse.edu',
      phone: '+91-1234567893',
      description: 'For career guidance and placement assistance'
    }
  ];

  return (
    <div className={`fade-in ${isVisible ? 'visible' : ''}`}>
      {/* Header Section */}
      <div className="text-center mb-5">
        <h1 className="display-4 fw-bold mb-3">Contact Us</h1>
        <p className="lead text-muted">Get in touch with us - we're here to help!</p>
      </div>

      <div className="row">
        {/* Contact Form */}
        <div className="col-lg-8 mb-5">
          <div className="card border-0 shadow-lg">
            <div className="card-header bg-gradient text-white text-center py-4">
              <h3 className="mb-0">
                <i className="fas fa-paper-plane me-2"></i>
                Send us a Message
              </h3>
            </div>
            <div className="card-body p-5">
              <Formik
                initialValues={{ name: '', email: '', phone: '', subject: '', message: '' }}
                validationSchema={ContactSchema}
                onSubmit={(values, { setSubmitting, resetForm }) => {
                  setTimeout(() => {
                    alert('Thank you for your message! We will get back to you within 24 hours.');
                    resetForm();
                    setSubmitting(false);
                  }, 1000);
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
                          Phone Number *
                        </label>
                        <Field 
                          name="phone" 
                          className={`form-control ${
                            touched.phone && errors.phone ? 'is-invalid' : 
                            touched.phone && !errors.phone ? 'is-valid' : ''
                          }`}
                          placeholder="Enter 10-digit mobile number"
                        />
                        <ErrorMessage name="phone" component="div" className="invalid-feedback" />
                      </div>
                      
                      <div className="col-md-6 mb-4">
                        <label className="form-label fw-semibold">
                          <i className="fas fa-tag me-2 text-primary"></i>
                          Subject *
                        </label>
                        <Field 
                          name="subject" 
                          as="select" 
                          className={`form-select ${
                            touched.subject && errors.subject ? 'is-invalid' : 
                            touched.subject && !errors.subject ? 'is-valid' : ''
                          }`}
                        >
                          <option value="">Select a subject</option>
                          <option value="admission">Admission Inquiry</option>
                          <option value="academic">Academic Information</option>
                          <option value="placement">Placement Services</option>
                          <option value="student-services">Student Services</option>
                          <option value="technical">Technical Support</option>
                          <option value="other">Other</option>
                        </Field>
                        <ErrorMessage name="subject" component="div" className="invalid-feedback" />
                      </div>
                    </div>

                    <div className="mb-4">
                      <label className="form-label fw-semibold">
                        <i className="fas fa-comment me-2 text-primary"></i>
                        Message *
                      </label>
                      <Field 
                        name="message" 
                        as="textarea" 
                        rows="5"
                        className={`form-control ${
                          touched.message && errors.message ? 'is-invalid' : 
                          touched.message && !errors.message ? 'is-valid' : ''
                        }`}
                        placeholder="Please describe your inquiry in detail..."
                      />
                      <ErrorMessage name="message" component="div" className="invalid-feedback" />
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
                            Sending...
                          </>
                        ) : (
                          <>
                            <i className="fas fa-paper-plane me-2"></i>
                            Send Message
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

        {/* Contact Information */}
        <div className="col-lg-4">
          <div className="row">
            {contactInfo.map((info, index) => (
              <div key={index} className="col-12 mb-4">
                <div className="card border-0 shadow-sm contact-card h-100">
                  <div className="card-body text-center p-4">
                    <div className={`contact-icon mb-3 ${info.color}`}>
                      <i className={`${info.icon} fa-2x`}></i>
                    </div>
                    <h5 className="fw-bold mb-3">{info.title}</h5>
                    {info.details.map((detail, idx) => (
                      <p key={idx} className="text-muted mb-1">{detail}</p>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Department Contacts */}
      <div className="row mt-5">
        <div className="col-12">
          <div className="card border-0 shadow-lg">
            <div className="card-header bg-gradient text-white text-center py-4">
              <h3 className="mb-0">
                <i className="fas fa-building me-2"></i>
                Department Contacts
              </h3>
            </div>
            <div className="card-body p-5">
              <div className="row">
                {departments.map((dept, index) => (
                  <div key={index} className="col-lg-6 mb-4">
                    <div className="department-card p-4 rounded-3 h-100">
                      <h5 className="fw-bold text-primary mb-3">{dept.name}</h5>
                      <p className="text-muted mb-3">{dept.description}</p>
                      <div className="contact-details">
                        <p className="mb-2">
                          <i className="fas fa-envelope text-info me-2"></i>
                          <a href={`mailto:${dept.email}`} className="text-decoration-none">
                            {dept.email}
                          </a>
                        </p>
                        <p className="mb-0">
                          <i className="fas fa-phone text-success me-2"></i>
                          <a href={`tel:${dept.phone}`} className="text-decoration-none">
                            {dept.phone}
                          </a>
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Map Section */}
      <div className="row mt-5">
        <div className="col-12">
          <div className="card border-0 shadow-lg">
            <div className="card-header bg-gradient text-white text-center py-4">
              <h3 className="mb-0">
                <i className="fas fa-map-marked-alt me-2"></i>
                Find Us
              </h3>
            </div>
            <div className="card-body p-0">
              <div className="map-container">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.9663095343008!2d-74.00425878459418!3d40.74844097932847!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c259bf5c1654f3%3A0xc80f9cfce5383d5d!2sGoogle!5e0!3m2!1sen!2sus!4v1234567890123"
                  width="100%"
                  height="300"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="University Location"
                ></iframe>
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
        
        .bg-gradient {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        }
        
        .contact-card {
          transition: all 0.3s ease;
        }
        
        .contact-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
        }
        
        .contact-icon {
          transition: transform 0.3s ease;
        }
        
        .contact-card:hover .contact-icon {
          transform: scale(1.1);
        }
        
        .department-card {
          background: rgba(102, 126, 234, 0.05);
          border: 1px solid rgba(102, 126, 234, 0.1);
          transition: all 0.3s ease;
        }
        
        .department-card:hover {
          background: rgba(102, 126, 234, 0.1);
          transform: translateY(-3px);
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
        }
        
        .map-container {
          border-radius: 0 0 0.75rem 0.75rem;
          overflow: hidden;
        }
        
        .contact-details a {
          color: inherit;
          transition: color 0.3s ease;
        }
        
        .contact-details a:hover {
          color: #667eea !important;
        }
      `}</style>
    </div>
  );
}

export default Contact; 