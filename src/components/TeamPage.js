import React from 'react';

const TeamPage = () => {
  const coreCommittee = [
    {
      name: "Prayani Raina",
      role: "Core Committee",
      phone: "87448 81057",
      phoneLink: "tel:+918744881057"
    },
    {
      name: "Pulkit Verma",
      role: "Core Committee",
      phone: "98108 13730",
      phoneLink: "tel:+919810813730"
    },
    {
      name: "Saanvi Sah",
      role: "Core Committee",
      phone: "84488 48210",
      phoneLink: "tel:+918448848210"
    },
    {
      name: "Shivansh Mehrotra",
      role: "Core Committee",
      phone: "93159 00566",
      phoneLink: "tel:+919315900566"
    },
    {
      name: "Soumyata Ghosh",
      role: "Core Committee",
      phone: "82526 22725",
      phoneLink: "tel:+918252622725"
    },
    {
      name: "Kshitij Gupta",
      role: "Core Committee",
      phone: "82878 53215",
      phoneLink: "tel:+918287853125"
    }
  ];

  return (
    <div className="team-page">
      {/* Hero Section */}
      <div className="team-hero">
        <h1 className="team-title">Our Team</h1>
        <p className="team-subtitle">The Organizing Committee</p>
      </div>

      {/* Core Committee Section */}
      <div className="container">
        <div className="team-section">
          <div className="section-header">
            <h2 className="section-title" style={{ color: 'var(--primary)' }}>Core Committee</h2>
            <div className="title-line"></div>
          </div>

          <div className="team-grid">
            {coreCommittee.map((member, index) => (
              <div 
                key={index} 
                className="team-member-card"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="member-avatar">
                  <span className="avatar-initial">
                    {member.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <div className="member-info">
                  <h3 className="member-name">{member.name}</h3>
                  <p className="member-role">{member.role}</p>
                  <a href={member.phoneLink} className="member-phone">
                    <span className="phone-icon">📱</span>
                    <span className="phone-number">{member.phone}</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        .team-page {
          min-height: calc(100vh - 70px);
          background: var(--bg-primary);
        }

        /* Hero Section */
        .team-hero {
          padding: 3rem 0;
          text-align: center;
          background: var(--gradient-warm);
          border-bottom: 1px solid rgba(160, 61, 55, 0.1);
          margin-bottom: 3rem;
        }

        .team-title {
          font-size: 3rem;
          font-weight: 700;
          font-family: 'Playfair Display', serif;
          color: var(--primary);
          margin-bottom: 0.5rem;
          background: var(--gradient-primary);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .team-subtitle {
          color: var(--text-secondary);
          font-size: 1.1rem;
          font-weight: 400;
        }

        /* Team Section */
        .team-section {
          padding: 2rem 0 4rem;
        }

        .section-header {
          text-align: center;
          margin-bottom: 3rem;
        }

        .section-title {
          font-size: 2.5rem;
          font-weight: 700;
          font-family: 'Playfair Display', serif;
          color: var(--primary);
          margin-bottom: 1rem;
          position: relative;
        }

        .title-line {
          width: 100px;
          height: 3px;
          background: var(--gradient-primary);
          margin: 0 auto;
          border-radius: 2px;
          position: relative;
        }

        .title-line::before,
        .title-line::after {
          content: '';
          position: absolute;
          height: 100%;
          width: 30px;
          background: var(--accent);
          border-radius: 2px;
        }

        .title-line::before {
          left: -40px;
        }

        .title-line::after {
          right: -40px;
        }

        /* Team Grid */
        .team-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 2rem;
          max-width: 1200px;
          margin: 0 auto;
        }

        /* Team Member Card */
        .team-member-card {
          background: var(--bg-card);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(160, 61, 55, 0.15);
          border-radius: 16px;
          padding: 2rem;
          text-align: center;
          transition: all 0.3s ease;
          box-shadow: var(--shadow-md);
          animation: fadeInUp 0.5s ease forwards;
          opacity: 0;
          position: relative;
          overflow: hidden;
        }

        .team-member-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 4px;
          background: var(--gradient-primary);
          transform: scaleX(0);
          transition: transform 0.3s ease;
        }

        .team-member-card:hover {
          transform: translateY(-5px);
          box-shadow: var(--shadow-lg);
          border-color: var(--primary);
        }

        .team-member-card:hover::before {
          transform: scaleX(1);
        }

        /* Member Avatar */
        .member-avatar {
          width: 100px;
          height: 100px;
          margin: 0 auto 1.5rem;
          background: var(--gradient-primary);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 15px rgba(160, 61, 55, 0.3);
          position: relative;
        }

        .avatar-initial {
          font-size: 2rem;
          font-weight: 700;
          color: var(--text-light);
          text-transform: uppercase;
        }

        /* Member Info */
        .member-info {
          text-align: center;
        }

        .member-name {
          font-size: 1.3rem;
          font-weight: 600;
          color: var(--primary);
          margin-bottom: 0.5rem;
          font-family: 'Playfair Display', serif;
        }

        .member-role {
          font-size: 0.9rem;
          color: var(--text-secondary);
          margin-bottom: 1rem;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          font-weight: 500;
        }

        /* Phone Link */
        .member-phone {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.6rem 1.2rem;
          background: rgba(192, 125, 103, 0.1);
          border: 1px solid var(--accent);
          border-radius: 25px;
          color: var(--accent-dark);
          text-decoration: none;
          font-size: 0.95rem;
          font-weight: 500;
          transition: all 0.3s ease;
        }

        .member-phone:hover {
          background: var(--gradient-primary);
          color: var(--text-light);
          transform: translateY(-2px);
          box-shadow: 0 4px 15px rgba(160, 61, 55, 0.3);
        }

        .phone-icon {
          font-size: 1.1rem;
        }

        .phone-number {
          font-family: 'Inter', sans-serif;
          letter-spacing: 0.05em;
        }

        /* Animations */
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        /* Responsive Design */
        @media (max-width: 768px) {
          .team-title {
            font-size: 2rem;
          }

          .section-title {
            font-size: 1.8rem;
          }

          .team-grid {
            grid-template-columns: 1fr;
            gap: 1.5rem;
          }

          .team-member-card {
            padding: 1.5rem;
          }

          .member-avatar {
            width: 80px;
            height: 80px;
          }

          .avatar-initial {
            font-size: 1.5rem;
          }

          .member-name {
            font-size: 1.1rem;
          }

          .member-phone {
            padding: 0.5rem 1rem;
            font-size: 0.9rem;
          }
        }

        @media (max-width: 480px) {
          .team-hero {
            padding: 2rem 1rem;
          }

          .team-title {
            font-size: 1.8rem;
          }

          .team-subtitle {
            font-size: 1rem;
          }

          .title-line::before,
          .title-line::after {
            display: none;
          }

          .member-phone {
            width: 100%;
            justify-content: center;
          }
        }
      `}</style>
    </div>
  );
};

export default TeamPage;
