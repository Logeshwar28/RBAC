import React from 'react';

const Footer = () => {
  return (
    <div className="footer">
      <p>Copyright &copy; {new Date().getFullYear()} Access-Hub</p>
      <p>
        Contact us: <a href="mailto:support@accesshub.com">support@accesshub.com</a>
      </p>
      <div className="social-links">
        <p>Follow us</p>
        <a className="social-logo" href="https://facebook.com" target="_blank" rel="noopener noreferrer">
          <img alt="Facebook" src="facebook logo.png" />
        </a>
        <a className="social-logo" href="https://twitter.com" target="_blank" rel="noopener noreferrer">
          <img alt="Twitter" src="Twitter logo.png" />
        </a>
        <a className="social-logo" href="https://instagram.com" target="_blank" rel="noopener noreferrer">
          <img alt="Instagram" src="Instagram.jpg" />
        </a>
        <a className="social-logo" href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
          <img alt="LinkedIn" src="LinkedIn.png" />
        </a>
      </div>
      <div className="quick-links">
        <a href="/privacy-policy">Privacy Policy</a> |
        <a href="/terms-of-service"> Terms of Service</a> |
        <a href="/about-us"> About Us</a>
      </div>
      <p>Version: 1.0.0 | Built for seamless role-based access control</p>
    </div>
  );
};

export default Footer;
