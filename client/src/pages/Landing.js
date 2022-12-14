import React from "react";
import main from "../assets/images/main.svg";
import Wrapper from "../assets/wrappers/LandingPage";
import { Logo } from "../components";
import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <React.Fragment>
      <Wrapper>
        <nav>
          <Logo className="logo" />
        </nav>

        <div className="container page">
          <div className="info">
            <h1>
              blood glucose <span>tracking</span> app
            </h1>
            <p>
              Stable glucose is the key to metabolic health. Mealify connects
              with your glucose in real-time, giving you personalized,
              actionable insights to improve your meals and therefore to improve
              your health.
              <br />
              Every body is different. Learn the right foods for you with
              Mealify’s in-depth meal analysis. <br />
              No more cookie-cutter diet advice. Mealify builds a library of
              your best and worst meals to help you discover your optimal diet.
              Better health isn't just about data, it's about growth through
              educational content and a community of like-minded people.
            </p>
            <Link to="/register" className="btn btn-hero">
              Login/Register
            </Link>
          </div>
          <img src={main} alt="health hunt" className="img main-img" />
        </div>
      </Wrapper>
    </React.Fragment>
  );
};

export default Landing;
