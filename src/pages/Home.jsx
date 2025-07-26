import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import universityBg from '../assets/University Background.webp';

function Home() {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleApplyNow = () => {
    navigate('/admissions');
    setTimeout(() => {
      const form = document.getElementById('admission-form-section');
      if (form) form.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const features = [
    {
      icon: 'fas fa-trophy',
      title: 'Academic Excellence',
      description: 'Top-ranked programs with world-class faculty and cutting-edge research opportunities.',
      color: 'text-warning'
    },
    {
      icon: 'fas fa-users',
      title: 'Diverse Community',
      description: 'Students from over 50 countries creating a rich, multicultural learning environment.',
      color: 'text-info'
    },
    {
      icon: 'fas fa-rocket',
      title: 'Innovation Hub',
      description: 'State-of-the-art labs, incubators, and partnerships with leading tech companies.',
      color: 'text-success'
    }
  ];

  return (
    <div 
      className={`fade-in ${isVisible ? 'visible' : ''}`}
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url(${universityBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
        minHeight: '100vh'
      }}
    >
      {/* Hero Carousel */}
      <div id="carouselExample" className="carousel slide mb-5" data-bs-ride="carousel">
        <div className="carousel-indicators">
          <button type="button" data-bs-target="#carouselExample" data-bs-slide-to="0" className="active"></button>
          <button type="button" data-bs-target="#carouselExample" data-bs-slide-to="1"></button>
          <button type="button" data-bs-target="#carouselExample" data-bs-slide-to="2"></button>
          <button type="button" data-bs-target="#carouselExample" data-bs-slide-to="3"></button>
        </div>
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img src={universityBg} className="d-block w-100 carousel-image" alt="University Campus" />
            <div className="carousel-caption d-md-block">
              <div className="hero-content">
                <h1 className="display-4 fw-bold mb-3 text-contrast">Welcome to COE University</h1>
                <p className="lead mb-4 text-contrast">Excellence in Education • Innovation • Character Development</p>
                <div className="hero-stats mb-4">
                  <div className="row text-center">
                    <div className="col-4">
                      <div className="stat-item">
                        <h3 className="text-contrast fw-bold">50+</h3>
                        <small className="text-contrast">Years of Excellence</small>
                      </div>
                    </div>
                    <div className="col-4">
                      <div className="stat-item">
                        <h3 className="text-contrast fw-bold">10K+</h3>
                        <small className="text-contrast">Alumni Worldwide</small>
                      </div>
                    </div>
                    <div className="col-4">
                      <div className="stat-item">
                        <h3 className="text-contrast fw-bold">95%</h3>
                        <small className="text-contrast">Placement Rate</small>
                      </div>
                    </div>
                  </div>
                </div>
                <button 
                  className="btn btn-lg px-5 py-3 rounded-pill me-3" 
                  onClick={handleApplyNow}
                  style={{
                    background: 'linear-gradient(135deg, #c8aa6e, #b8860b)',
                    color: 'white',
                    fontWeight: '700',
                    border: 'none',
                    boxShadow: '0 6px 20px rgba(200, 170, 110, 0.4)',
                    textTransform: 'uppercase',
                    letterSpacing: '1px'
                  }}
                >
                  <i className="fas fa-graduation-cap me-2"></i>
                  Apply Now
                </button>
                <button 
                  className="btn btn-outline-light btn-lg px-5 py-3 rounded-pill"
                  style={{
                    borderWidth: '2px',
                    fontWeight: '600'
                  }}
                >
                  <i className="fas fa-play-circle me-2"></i>
                  Virtual Tour
                </button>
              </div>
            </div>
          </div>
          <div className="carousel-item">
            <img src="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80" className="d-block w-100 carousel-image" alt="Academics" />
            <div className="carousel-caption d-md-block">
              <div className="hero-content">
                <h2 className="display-5 fw-bold mb-3 text-contrast">Academic Excellence</h2>
                <p className="lead mb-4 text-contrast">World-class education with industry-relevant curriculum and research opportunities</p>
              </div>
            </div>
          </div>
          <div className="carousel-item">
            <img src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80" className="d-block w-100 carousel-image" alt="Innovation" />
            <div className="carousel-caption d-md-block">
              <div className="hero-content">
                <h2 className="display-5 fw-bold mb-3 text-contrast">Innovation & Research</h2>
                <p className="lead mb-4 text-contrast">Cutting-edge research facilities and startup incubation programs</p>
              </div>
            </div>
          </div>
          <div className="carousel-item">
            <img src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80" className="d-block w-100 carousel-image" alt="Campus Life" />
            <div className="carousel-caption d-md-block">
              <div className="hero-content">
                <h2 className="display-5 fw-bold mb-3 text-contrast">Vibrant Campus Life</h2>
                <p className="lead mb-4 text-contrast">Dynamic student community with over 100 clubs and organizations</p>
              </div>
            </div>
          </div>
        </div>
        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>

      {/* Quick Apply Section */}
      <div className="text-center mb-5">
        <div className="apply-now-section p-5 rounded-3" style={{
          background: 'linear-gradient(135deg, rgba(248, 249, 250, 0.95) 0%, rgba(255, 255, 255, 0.9) 100%)',
          border: '2px solid rgba(15, 42, 92, 0.1)',
          boxShadow: '0 10px 30px rgba(15, 42, 92, 0.15)'
        }}>
          <h3 className="mb-3 fw-bold" style={{color: 'var(--primary-color)'}}>Ready to Shape Your Future?</h3>
          <p className="mb-4 lead text-muted">Join a legacy of excellence at COE University - Where Leaders Are Made</p>
          <div className="row text-center mb-4">
            <div className="col-md-3 col-6 mb-3">
              <div className="achievement-stat">
                <h4 className="fw-bold mb-1" style={{color: 'var(--primary-color)'}}>50+</h4>
                <small className="text-muted">Years of Legacy</small>
              </div>
            </div>
            <div className="col-md-3 col-6 mb-3">
              <div className="achievement-stat">
                <h4 className="fw-bold mb-1" style={{color: 'var(--primary-color)'}}>200+</h4>
                <small className="text-muted">Expert Faculty</small>
              </div>
            </div>
            <div className="col-md-3 col-6 mb-3">
              <div className="achievement-stat">
                <h4 className="fw-bold mb-1" style={{color: 'var(--primary-color)'}}>15K+</h4>
                <small className="text-muted">Proud Alumni</small>
              </div>
            </div>
            <div className="col-md-3 col-6 mb-3">
              <div className="achievement-stat">
                <h4 className="fw-bold mb-1" style={{color: 'var(--primary-color)'}}>98%</h4>
                <small className="text-muted">Success Rate</small>
              </div>
            </div>
          </div>
          <button 
            className="btn btn-lg px-5 py-3 rounded-pill me-3" 
            onClick={handleApplyNow}
            style={{
              background: 'var(--academic-gold)',
              color: 'white',
              fontWeight: '700',
              border: 'none',
              boxShadow: '0 6px 20px rgba(184, 134, 11, 0.4)',
              textTransform: 'uppercase',
              letterSpacing: '1px'
            }}
          >
            <i className="fas fa-graduation-cap me-2"></i>
            Apply for Admission
          </button>
          <button 
            className="btn btn-lg px-5 py-3 rounded-pill"
            onClick={() => navigate('/about')}
            style={{
              background: 'transparent',
              color: 'var(--primary-color)',
              border: '2px solid var(--primary-color)',
              fontWeight: '600',
              textTransform: 'uppercase',
              letterSpacing: '0.5px',
              transition: 'all 0.3s ease'
            }}
          >
            <i className="fas fa-info-circle me-2"></i>
            Learn More
          </button>
        </div>
      </div>
      {/* Features Section */}
      <div className="row mb-5">
        {features.map((feature, index) => (
          <div key={index} className="col-md-4 mb-4">
            <div className="card h-100 border-0 shadow-sm feature-card" style={{
              transition: 'all 0.3s ease',
              border: '1px solid rgba(15, 42, 92, 0.1) !important'
            }}>
              <div className="card-body text-center p-4">
                <div className="feature-icon mb-3" style={{
                  fontSize: '3rem',
                  color: 'var(--primary-color)',
                  marginBottom: '1.5rem'
                }}>
                  <i className={feature.icon}></i>
                </div>
                <h4 className="card-title mb-3 institutional-text fw-bold">{feature.title}</h4>
                <p className="card-text text-muted">{feature.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Statistics Section */}
      <div className="row mb-5">
        <div className="col-12">
          <div className="stats-section p-5 rounded-3 text-center institutional-header">
            <h3 className="mb-5 text-white fw-bold">Excellence in Numbers</h3>
            <div className="row">
              <div className="col-md-3 col-6 mb-4">
                <div className="achievement-stat">
                  <h2 className="text-white fw-bold mb-2">50+</h2>
                  <p className="text-white opacity-90 mb-0">Years of Educational Excellence</p>
                </div>
              </div>
              <div className="col-md-3 col-6 mb-4">
                <div className="achievement-stat">
                  <h2 className="text-white fw-bold mb-2">15,000+</h2>
                  <p className="text-white opacity-90 mb-0">Students Graduated</p>
                </div>
              </div>
              <div className="col-md-3 col-6 mb-4">
                <div className="achievement-stat">
                  <h2 className="text-white fw-bold mb-2">200+</h2>
                  <p className="text-white opacity-90 mb-0">Expert Faculty Members</p>
                </div>
              </div>
              <div className="col-md-3 col-6 mb-4">
                <div className="achievement-stat">
                  <h2 className="text-white fw-bold mb-2">98%</h2>
                  <p className="text-white opacity-90 mb-0">Graduate Success Rate</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mission, Vision, Values Section */}
      <div className="row mb-5">
        <div className="col-md-4 mb-4">
          <div className="card h-100 border-0 shadow-sm" style={{
            border: '1px solid rgba(15, 42, 92, 0.15) !important',
            transition: 'all 0.3s ease'
          }}>
            <div className="card-header text-center py-4 institutional-header">
              <i className="fas fa-bullseye fa-2x text-white mb-3"></i>
              <h5 className="text-white fw-bold mb-0">Our Mission</h5>
            </div>
            <div className="card-body p-4">
              <p className="text-muted mb-0 text-center">
                To provide world-class education that empowers students with knowledge, skills, and values 
                necessary to excel in their chosen fields and contribute meaningfully to society.
              </p>
            </div>
          </div>
        </div>
        <div className="col-md-4 mb-4">
          <div className="card h-100 border-0 shadow-sm" style={{
            border: '1px solid rgba(15, 42, 92, 0.15) !important',
            transition: 'all 0.3s ease'
          }}>
            <div className="card-header text-center py-4 institutional-header">
              <i className="fas fa-eye fa-2x text-white mb-3"></i>
              <h5 className="text-white fw-bold mb-0">Our Vision</h5>
            </div>
            <div className="card-body p-4">
              <p className="text-muted mb-0 text-center">
                To be a globally recognized institution of higher learning, fostering innovation, 
                research excellence, and developing leaders who shape the future.
              </p>
            </div>
          </div>
        </div>
        <div className="col-md-4 mb-4">
          <div className="card h-100 border-0 shadow-sm" style={{
            border: '1px solid rgba(15, 42, 92, 0.15) !important',
            transition: 'all 0.3s ease'
          }}>
            <div className="card-header text-center py-4 institutional-header">
              <i className="fas fa-heart fa-2x text-white mb-3"></i>
              <h5 className="text-white fw-bold mb-0">Our Values</h5>
            </div>
            <div className="card-body p-4">
              <ul className="list-unstyled text-center mb-0">
                <li className="mb-2"><i className="fas fa-check-circle me-2" style={{color: 'var(--accent-color)'}}></i>Integrity & Excellence</li>
                <li className="mb-2"><i className="fas fa-check-circle me-2" style={{color: 'var(--accent-color)'}}></i>Innovation & Research</li>
                <li className="mb-2"><i className="fas fa-check-circle me-2" style={{color: 'var(--accent-color)'}}></i>Inclusivity & Diversity</li>
                <li className="mb-2"><i className="fas fa-check-circle me-2" style={{color: 'var(--accent-color)'}}></i>Social Responsibility</li>
                <li className="mb-0"><i className="fas fa-check-circle me-2" style={{color: 'var(--accent-color)'}}></i>Global Collaboration</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Upcoming Events Section */}
      <div className="row mb-5">
        <div className="col-12">
          <div className="card border-0 shadow-sm" style={{
            border: '1px solid rgba(15, 42, 92, 0.1) !important'
          }}>
            <div className="card-header text-center py-4 institutional-header">
              <i className="fas fa-calendar-alt fa-2x mb-3 text-white"></i>
              <h4 className="text-white fw-bold mb-0">Upcoming Events</h4>
            </div>
            <div className="card-body p-4">
              <div className="row">
                <div className="col-md-6">
                  <div className="event-item p-4 mb-3 rounded" style={{
                    background: 'linear-gradient(135deg, rgba(15, 42, 92, 0.05) 0%, rgba(200, 170, 110, 0.05) 100%)',
                    border: '1px solid rgba(15, 42, 92, 0.1)',
                    transition: 'all 0.3s ease'
                  }}>
                    <div className="d-flex align-items-center">
                      <div className="event-date text-white rounded p-3 me-3 institutional-header">
                        <div className="text-center">
                          <div className="fs-6 fw-bold">AUG</div>
                          <div className="fs-3 fw-bold">01</div>
                        </div>
                      </div>
                      <div>
                        <h5 className="mb-2 institutional-text fw-bold">Orientation Program</h5>
                        <p className="text-muted mb-0">Welcome new students to our academic community</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="event-item p-4 mb-3 rounded" style={{
                    background: 'linear-gradient(135deg, rgba(15, 42, 92, 0.05) 0%, rgba(200, 170, 110, 0.05) 100%)',
                    border: '1px solid rgba(15, 42, 92, 0.1)',
                    transition: 'all 0.3s ease'
                  }}>
                    <div className="d-flex align-items-center">
                      <div className="event-date text-white rounded p-3 me-3 institutional-header">
                        <div className="text-center">
                          <div className="fs-6 fw-bold">SEP</div>
                          <div className="fs-3 fw-bold">15</div>
                        </div>
                      </div>
                      <div>
                        <h5 className="mb-2 institutional-text fw-bold">Academic Excellence Awards</h5>
                        <p className="text-muted mb-0">Celebrating outstanding student achievements</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="event-item p-4 mb-3 rounded" style={{
                    background: 'linear-gradient(135deg, rgba(15, 42, 92, 0.05) 0%, rgba(200, 170, 110, 0.05) 100%)',
                    border: '1px solid rgba(15, 42, 92, 0.1)',
                    transition: 'all 0.3s ease'
                  }}>
                    <div className="d-flex align-items-center">
                      <div className="event-date text-white rounded p-3 me-3 institutional-header">
                        <div className="text-center">
                          <div className="fs-6 fw-bold">OCT</div>
                          <div className="fs-3 fw-bold">10</div>
                        </div>
                      </div>
                      <div>
                        <h5 className="mb-2 institutional-text fw-bold">Research Symposium</h5>
                        <p className="text-muted mb-0">Showcasing innovative research and discoveries</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="event-item p-4 mb-3 rounded" style={{
                    background: 'linear-gradient(135deg, rgba(15, 42, 92, 0.05) 0%, rgba(200, 170, 110, 0.05) 100%)',
                    border: '1px solid rgba(15, 42, 92, 0.1)',
                    transition: 'all 0.3s ease'
                  }}>
                    <div className="d-flex align-items-center">
                      <div className="event-date text-white rounded p-3 me-3 institutional-header">
                        <div className="text-center">
                          <div className="fs-6 fw-bold">DEC</div>
                          <div className="fs-3 fw-bold">15</div>
                        </div>
                      </div>
                      <div>
                        <h5 className="mb-2 institutional-text fw-bold">Convocation Ceremony</h5>
                        <p className="text-muted mb-0">Graduation ceremony for our accomplished graduates</p>
                      </div>
                    </div>
                  </div>
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
        
        .carousel-image {
          height: 500px;
          object-fit: cover;
          filter: brightness(0.8);
        }
        
        .hero-content {
          background: rgba(0, 0, 0, 0.6);
          padding: 2rem;
          border-radius: 1rem;
          backdrop-filter: blur(10px);
        }
        
        .feature-card {
          transition: all 0.3s ease;
        }
        
        .feature-card:hover {
          transform: translateY(-10px);
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
        }
        
        .feature-icon {
          font-size: 3rem;
        }
        
        .stat-item {
          padding: 1rem;
          border-radius: 1rem;
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(10px);
        }
        
        .event-item {
          transition: all 0.3s ease;
        }
        
        .event-item:hover {
          transform: translateX(5px);
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
        }
        
        .bg-gradient {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        }
      `}</style>
    </div>
  );
}

export default Home; 