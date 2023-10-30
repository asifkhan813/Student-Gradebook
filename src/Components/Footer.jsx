import React from "react";
import { FaTwitter, FaFacebook, FaInstagram } from "react-icons/fa";
import "./css/footer.css";
const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-container">
                <div className="footer-social-icons">
                    <a href="https://twitter.com">
                        <FaTwitter />
                    </a>
                    <a href="https://facebook.com">
                        <FaFacebook />
                    </a>
                    <a href="https://instagram.com">
                        <FaInstagram />
                    </a>
                </div>
                <div className="footer-text">
                    <p>Subscribe to our newsletter</p>
                    <input type="email" placeholder="Enter your email" />
                    <button>Subscribe</button>
                </div>
            </div>
            <div className="footer-bottom">
                <p>&copy; 2023 My Company. All Rights Reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;
