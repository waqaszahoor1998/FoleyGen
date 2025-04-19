import React from "react";
import { Link } from "react-router-dom";
import { Button } from "./Button";
import "./Footer.css";
import logo from "../images/myLogo.png";

function Footer() {
  return (
    <div className="footer-container">
      <section className="footer-subscription">
        <p className="footer-subscription-heading">
          Get the most LIVELY videos with one click
        </p>

        <p className="footer-subscription-text">You can start at any time.</p>
        {/* <div className="input-areas">
          <form>
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              className="footer-input"
            />
            <Button buttonStyle="btn--outline">Subscribe</Button>
          </form>
        </div> */}
      </section>
      <div className="footer-links">
        {/* first wrapper */}
        <div className="footer-link-wrapper">
          <div className="footer-link-items">
            <h2>About Us</h2>
            <Link to="/about">How it works</Link>
          </div>
        </div>

        <div className="footer-link-wrapper">
          <div className="footer-link-items">
            <h2>Videos</h2>
            <Link to="/edit">Edit Video</Link>
          </div>
        </div>
      </div>
      <section className="social-media">
        <div className="social-media-wrap">
          <div className="footer-logo">
            <Link to="/" className="social-logo">
              FoleyGen
              <img src={logo} alt="logo" width={40} height={40}></img>
            </Link>
          </div>
          <small className="website-rights">FoleyGen © 2022</small>
        </div>
      </section>
    </div>
  );
}

export default Footer;
