import React, { useState, useEffect } from 'react';

function About() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const stats = [
    { number: '60+', label: 'Years of Excellence', icon: 'fas fa-calendar-alt' },
    { number: '10,000+', label: 'Alumni Network', icon: 'fas fa-users' },
    { number: '500+', label: 'Faculty Members', icon: 'fas fa-chalkboard-teacher' },
    { number: '100+', label: 'Research Labs', icon: 'fas fa-microscope' }
  ];

  const facilities = [
    {
      title: 'Modern Classrooms',
      description: 'Smart classrooms equipped with the latest technology',
      icon: 'fas fa-chalkboard'
    },
    {
      title: 'Research Labs',
      description: 'State-of-the-art laboratories for cutting-edge research',
      icon: 'fas fa-flask'
    },
    {
      title: 'Digital Library',
      description: 'Extensive collection of books, journals, and digital resources',
      icon: 'fas fa-book'
    },
    {
      title: 'Sports Complex',
      description: 'World-class sports facilities and fitness centers',
      icon: 'fas fa-dumbbell'
    },
    {
      title: 'Student Centers',
      description: 'Modern spaces for collaboration and social activities',
      icon: 'fas fa-users'
    },
    {
      title: 'Innovation Hub',
      description: 'Startup incubators and entrepreneurship support',
      icon: 'fas fa-lightbulb'
    }
  ];

  return (
    <div className={`fade-in ${isVisible ? 'visible' : ''}`}>
      {/* Hero Section */}
      <div className="row align-items-center mb-5">
        <div className="col-lg-6 mb-4 mb-lg-0">
          <div className="about-content">
            <h1 className="display-4 fw-bold mb-4">About COE University</h1>
            <p className="lead mb-4">
              Founded in 1965, our university has a rich tradition of academic excellence, innovation, and community service. We are committed to nurturing talent and fostering research that makes a difference in the world.
            </p>
            <div className="highlight-box p-4 rounded-3 mb-4" style={{
              background: 'linear-gradient(135deg, #e3f2fd 0%, #f3e5f5 100%)',
              border: '1px solid #e1bee7'
            }}>
              <h4 className="text-primary mb-3">Our Commitment</h4>
              <ul className="list-unstyled mb-0">
                <li className="mb-2">
                  <i className="fas fa-check-circle text-success me-2"></i>
                  World-class education with industry relevance
                </li>
                <li className="mb-2">
                  <i className="fas fa-check-circle text-success me-2"></i>
                  Research-driven approach to learning
                </li>
                <li className="mb-2">
                  <i className="fas fa-check-circle text-success me-2"></i>
                  Strong industry partnerships and placements
                </li>
                <li className="mb-2">
                  <i className="fas fa-check-circle text-success me-2"></i>
                  Inclusive and diverse learning environment
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="col-lg-6">
          <div className="position-relative">
            <img 
              src="https://images.unsplash.com/photo-1562774053-701939374585?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
              alt="Campus" 
              className="img-fluid rounded-3 shadow-lg main-image"
            />
            <div className="image-overlay rounded-3">
              <div className="overlay-content text-white text-center">
                <h3 className="mb-2">Beautiful Campus</h3>
                <p className="mb-0">Modern facilities in a serene environment</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Statistics Section */}
      <div className="row mb-5">
        <div className="col-12">
          <div className="stats-section p-5 rounded-3 text-center" style={{
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: 'white'
          }}>
            <h2 className="mb-5">University by the Numbers</h2>
            <div className="row">
              {stats.map((stat, index) => (
                <div key={index} className="col-md-3 col-6 mb-3">
                  <div className="stat-card p-3 rounded-3">
                    <i className={`${stat.icon} fa-3x mb-3`}></i>
                    <h3 className="display-6 fw-bold mb-2">{stat.number}</h3>
                    <p className="mb-0">{stat.label}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Facilities Section */}
      <div className="row mb-5">
        <div className="col-12">
          <h2 className="text-center mb-5">World-Class Facilities</h2>
          <div className="row">
            {facilities.map((facility, index) => (
              <div key={index} className="col-lg-4 col-md-6 mb-4">
                <div className="card h-100 border-0 shadow-sm facility-card">
                  <div className="card-body text-center p-4">
                    <div className="facility-icon mb-3">
                      <i className={`${facility.icon} fa-3x text-primary`}></i>
                    </div>
                    <h5 className="card-title mb-3">{facility.title}</h5>
                    <p className="card-text text-muted">{facility.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Why Choose Us Section */}
      <div className="row mb-5">
        <div className="col-12">
          <div className="card border-0 shadow-lg">
            <div className="card-header bg-gradient text-white text-center py-4">
              <h2 className="mb-0">Why Choose COE University?</h2>
            </div>
            <div className="card-body p-5">
              <div className="row">
                <div className="col-md-6 mb-4">
                  <div className="reason-item d-flex align-items-start">
                    <div className="reason-icon me-3">
                      <i className="fas fa-trophy fa-2x text-warning"></i>
                    </div>
                    <div>
                      <h5>Academic Excellence</h5>
                      <p className="text-muted mb-0">Consistently ranked among the top universities with exceptional academic programs and faculty.</p>
                    </div>
                  </div>
                </div>
                <div className="col-md-6 mb-4">
                  <div className="reason-item d-flex align-items-start">
                    <div className="reason-icon me-3">
                      <i className="fas fa-globe fa-2x text-info"></i>
                    </div>
                    <div>
                      <h5>Global Perspective</h5>
                      <p className="text-muted mb-0">International partnerships and exchange programs with universities worldwide.</p>
                    </div>
                  </div>
                </div>
                <div className="col-md-6 mb-4">
                  <div className="reason-item d-flex align-items-start">
                    <div className="reason-icon me-3">
                      <i className="fas fa-handshake fa-2x text-success"></i>
                    </div>
                    <div>
                      <h5>Industry Connections</h5>
                      <p className="text-muted mb-0">Strong partnerships with leading companies ensuring excellent placement opportunities.</p>
                    </div>
                  </div>
                </div>
                <div className="col-md-6 mb-4">
                  <div className="reason-item d-flex align-items-start">
                    <div className="reason-icon me-3">
                      <i className="fas fa-rocket fa-2x text-danger"></i>
                    </div>
                    <div>
                      <h5>Innovation & Research</h5>
                      <p className="text-muted mb-0">Cutting-edge research facilities and support for entrepreneurial ventures.</p>
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
        
        .main-image {
          transition: transform 0.3s ease;
        }
        
        .main-image:hover {
          transform: scale(1.05);
        }
        
        .image-overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(45deg, rgba(0,0,0,0.7), rgba(0,0,0,0.3));
          opacity: 0;
          transition: opacity 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        .main-image:hover + .image-overlay,
        .image-overlay:hover {
          opacity: 1;
        }
        
        .stat-card {
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(10px);
          transition: transform 0.3s ease;
        }
        
        .stat-card:hover {
          transform: translateY(-5px);
        }
        
        .facility-card {
          transition: all 0.3s ease;
        }
        
        .facility-card:hover {
          transform: translateY(-10px);
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
        }
        
        .facility-icon {
          transition: transform 0.3s ease;
        }
        
        .facility-card:hover .facility-icon {
          transform: scale(1.1);
        }
        
        .reason-item {
          padding: 1rem;
          border-radius: 0.5rem;
          transition: background-color 0.3s ease;
        }
        
        .reason-item:hover {
          background: rgba(0, 0, 0, 0.02);
        }
        
        .bg-gradient {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        }
      `}</style>
    </div>
  );
}

export default About; 