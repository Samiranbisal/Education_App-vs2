import React from 'react';
import '../styles/Fitness.css'; // Create and style this file

const Fitness = () => {
  return (
    <div className="fitness-page">
      {/* Hero Section */}
      <section className="fitness-hero">
        <h1>Achieve Your Dream Body</h1>
        <p>Transform your life with personalized fitness plans and expert guidance.</p>
        <button className="cta-button">Join Now</button>
      </section>

      {/* Programs Section */}
      <section className="fitness-programs">
        <h2>Workout Programs</h2>
        <div className="program-list">
          <div className="program-card">
            <h3>Weight Loss</h3>
            <p>Burn fat and build lean muscle with high-intensity training.</p>
          </div>
          <div className="program-card">
            <h3>Muscle Gain</h3>
            <p>Structured workouts to help you bulk up and get strong.</p>
          </div>
          <div className="program-card">
            <h3>Yoga & Flexibility</h3>
            <p>Improve mobility and reduce stress through mindful movement.</p>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="fitness-benefits">
        <h2>Why Choose Us?</h2>
        <ul>
          <li>✅ Certified Trainers</li>
          <li>✅ Custom Meal Plans</li>
          <li>✅ Progress Tracking</li>
          <li>✅ 24/7 Support</li>
        </ul>
      </section>

      {/* Testimonials */}
      <section className="fitness-testimonials">
        <h2>What Our Members Say</h2>
        <div className="testimonial">
          <p>“I lost 10kg in 3 months! The coaches here are amazing.”</p>
          <h4>- Priya S.</h4>
        </div>
        <div className="testimonial">
          <p>“This program helped me build confidence and muscle.”</p>
          <h4>- Arjun P.</h4>
        </div>
      </section>

      {/* Call to Action */}
      <section className="fitness-cta">
        <h2>Ready to Transform?</h2>
        <button className="cta-button">Start Your Journey</button>
      </section>
    </div>
  );
};

export default Fitness;
