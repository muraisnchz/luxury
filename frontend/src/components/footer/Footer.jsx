import React from 'react';
import './Footer.css';

const Footer = ({ year, companyName }) => {
  return (
    <footer className="footer">
      <p>&copy; {year} {companyName}. Todos los derechos reservados.</p>
    </footer>
  );
};

export default Footer;