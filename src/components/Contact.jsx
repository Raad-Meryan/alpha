import React, { useState } from 'react';
import './Contact.css';
import ShinyText from '../assets/ShinyText';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Thank you for your message! We will get back to you soon.');
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <div className="contact">
      <div className="contact-container">
        <ShinyText 
          text="Get In Touch"
          disabled={false}
          speed={4}
          className="section-title"
          baseColor="#ffffff"
          highlightColor="rgba(172, 49, 49, 0.95)"
        />
        <div className="contact-content">
          <div className="contact-info">
            <div className="info-item">
              {/* <div className="info-icon">✉</div> */}
              <div className="info-details">
                <h3>Email</h3>
                <a href="mailto:ALPHAPROJECTJO@OUTLOOK.COM">ALPHAPROJECTJO@OUTLOOK.COM</a>
              </div>
            </div>
            <div className="info-item">
              {/* <div className="info-icon">📱</div> */}
              <div className="info-details">
                <h3>Phone</h3>
                <a href="tel:+96278108282">+962 78 1082828</a>
              </div>
            </div>
            <div className="info-item">
              {/* <div className="info-icon">📸</div> */}
              <div className="info-details">
                <h3>Instagram</h3>
                <a href="https://instagram.com/alphaprojectjo" target="_blank" rel="noopener noreferrer">@alphaprojectjo</a>
              </div>
            </div>
            <div className="info-item">
              {/* <div className="info-icon">📍</div> */}
              <div className="info-details">
                <h3>Location</h3>
                <p>The Core | KHBP | Amman | Jordan</p>
              </div>
            </div>
          </div>
          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <textarea
                name="message"
                placeholder="Your Message"
                rows="5"
                value={formData.message}
                onChange={handleChange}
                required
              ></textarea>
            </div>
            <button type="submit" className="submit-btn">Send Message</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
