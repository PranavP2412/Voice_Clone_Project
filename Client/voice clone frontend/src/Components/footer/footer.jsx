import React from 'react';
import './footer.css';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-container">
                <div className="footer-section">
                    <h4>About</h4>
                    <ul>
                        <li><a href="/about">About Us</a></li>
                        <li><a href="#privacy">Privacy Policy</a></li>
                        <li><a href="#terms">Terms of Service</a></li>
                    </ul>
                </div>
                
                <div className="footer-section">
                    <h4>Contact</h4>
                    <ul>
                        <li><a href="mailto:pranavpatil24126@gmail.com">Email</a></li>
                        <li><a href="#support">Support</a></li>
                        <li><a href="/contact">Contact Us</a></li>
                    </ul>
                </div>
                
                <div className="footer-section">
                    <h4>Follow Us</h4>
                    <ul>
                        <li><a href="https://github.com/PranavP2412/Voice_Clone_Project">GitHub</a></li>
                        <li><a href="https://www.linkedin.com/in/pranav-patil-3106ab1b1/">LinkedIn</a></li>
                    </ul>
                </div>
            </div>
            
            <div className="footer-bottom">
                <p>&copy; 2024 Voice Clone Project. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;