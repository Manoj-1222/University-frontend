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

  const achievements = [
    { number: '10,000+', label: 'Students' },
    { number: '500+', label: 'Faculty' },
    { number: '95%', label: 'Placement Rate' },
    { number: '150+', label: 'Programs' }
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
                <p className="lead mb-4 text-contrast">Shaping tomorrow's leaders through excellence in education and innovation</p>
                <button className="btn btn-light btn-lg px-5 py-3 rounded-pill" onClick={handleApplyNow}>
                  <i className="fas fa-graduation-cap me-2"></i>
                  Start Your Journey
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
          color: '#1f2937'
        }}>
          <h3 className="mb-3 fw-bold text-primary">Ready to Begin Your Journey?</h3>
          <p className="mb-4 lead text-secondary">Join thousands of students who have transformed their lives at COE University</p>
          <button className="btn btn-primary btn-lg px-5 py-3 rounded-pill shadow-lg" onClick={handleApplyNow}>
            <i className="fas fa-rocket me-2"></i>
            Apply Now - Fast Track
          </button>
        </div>
      </div>
      {/* Features Section */}
      <div className="row mb-5">
        {features.map((feature, index) => (
          <div key={index} className="col-md-4 mb-4">
            <div className="card h-100 border-0 shadow-sm feature-card">
              <div className="card-body text-center p-4">
                <div className={`feature-icon mb-3 ${feature.color}`}>
                  <i className={feature.icon}></i>
                </div>
                <h4 className="card-title mb-3">{feature.title}</h4>
                <p className="card-text text-muted">{feature.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Statistics Section */}
      <div className="row mb-5">
        <div className="col-12">
          <div className="stats-section p-5 rounded-3 text-center" style={{
            background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
            color: 'white'
          }}>
            <h3 className="mb-5">Our Achievements</h3>
            <div className="row">
              {achievements.map((stat, index) => (
                <div key={index} className="col-md-3 col-6 mb-3">
                  <div className="stat-item">
                    <h2 className="display-6 fw-bold mb-2">{stat.number}</h2>
                    <p className="mb-0 fs-5">{stat.label}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Mission, Vision, Values Section */}
      <div className="row mb-5">
        <div className="col-md-4 mb-4">
          <div className="card h-100 border-0 shadow-sm">
            <div className="card-header bg-primary text-white text-center">
              <i className="fas fa-bullseye fa-2x mb-2"></i>
              <h3>Our Mission</h3>
            </div>
            <div className="card-body">
              <p className="text-center">To provide quality education, foster research, and nurture innovation for a better tomorrow. We are committed to developing leaders who will shape the future.</p>
            </div>
          </div>
        </div>
        <div className="col-md-4 mb-4">
          <div className="card h-100 border-0 shadow-sm">
            <div className="card-header bg-success text-white text-center">
              <i className="fas fa-eye fa-2x mb-2"></i>
              <h3>Our Vision</h3>
            </div>
            <div className="card-body">
              <p className="text-center">To be a leading university recognized for excellence in teaching, learning, and societal impact, creating a sustainable future for all.</p>
            </div>
          </div>
        </div>
        <div className="col-md-4 mb-4">
          <div className="card h-100 border-0 shadow-sm">
            <div className="card-header bg-warning text-white text-center">
              <i className="fas fa-heart fa-2x mb-2"></i>
              <h3>Core Values</h3>
            </div>
            <div className="card-body">
              <ul className="list-unstyled text-center">
                <li className="mb-2"><i className="fas fa-check-circle text-primary me-2"></i>Integrity</li>
                <li className="mb-2"><i className="fas fa-check-circle text-primary me-2"></i>Inclusivity</li>
                <li className="mb-2"><i className="fas fa-check-circle text-primary me-2"></i>Innovation</li>
                <li className="mb-2"><i className="fas fa-check-circle text-primary me-2"></i>Excellence</li>
                <li className="mb-2"><i className="fas fa-check-circle text-primary me-2"></i>Collaboration</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Upcoming Events Section */}
      <div className="row mb-5">
        <div className="col-12">
          <div className="card border-0 shadow-sm">
            <div className="card-header bg-gradient text-white text-center">
              <i className="fas fa-calendar-alt fa-2x mb-2"></i>
              <h3>Upcoming Events</h3>
            </div>
            <div className="card-body">
              <div className="row">
                <div className="col-md-6">
                  <div className="event-item p-3 mb-3 rounded bg-light">
                    <div className="d-flex align-items-center">
                      <div className="event-date bg-primary text-white rounded p-2 me-3">
                        <div className="text-center">
                          <div className="fs-6">AUG</div>
                          <div className="fs-4 fw-bold">01</div>
                        </div>
                      </div>
                      <div>
                        <h5 className="mb-1">Orientation Program</h5>
                        <p className="text-muted mb-0">Welcome new students to our university family</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="event-item p-3 mb-3 rounded bg-light">
                    <div className="d-flex align-items-center">
                      <div className="event-date bg-success text-white rounded p-2 me-3">
                        <div className="text-center">
                          <div className="fs-6">SEP</div>
                          <div className="fs-4 fw-bold">15</div>
                        </div>
                      </div>
                      <div>
                        <h5 className="mb-1">Annual Sports Meet</h5>
                        <p className="text-muted mb-0">Inter-college competitions and athletics</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="event-item p-3 mb-3 rounded bg-light">
                    <div className="d-flex align-items-center">
                      <div className="event-date bg-warning text-white rounded p-2 me-3">
                        <div className="text-center">
                          <div className="fs-6">OCT</div>
                          <div className="fs-4 fw-bold">10</div>
                        </div>
                      </div>
                      <div>
                        <h5 className="mb-1">National Hackathon</h5>
                        <p className="text-muted mb-0">48-hour coding marathon with exciting prizes</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="event-item p-3 mb-3 rounded bg-light">
                    <div className="d-flex align-items-center">
                      <div className="event-date bg-danger text-white rounded p-2 me-3">
                        <div className="text-center">
                          <div className="fs-6">DEC</div>
                          <div className="fs-4 fw-bold">20</div>
                        </div>
                      </div>
                      <div>
                        <h5 className="mb-1">Convocation</h5>
                        <p className="text-muted mb-0">Graduation ceremony for our accomplished students</p>
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