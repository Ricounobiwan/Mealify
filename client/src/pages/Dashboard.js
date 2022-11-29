import React from "react";
import Wrapper from "../assets/wrappers/LandingPage";

import { Logo } from "../components";

const Dashboard = () => {
  return (
    <Wrapper>
      <nav>
        <Logo />
      </nav>

      <div className="container page">Dashboard</div>
    </Wrapper>
  );
};

export default Dashboard;
