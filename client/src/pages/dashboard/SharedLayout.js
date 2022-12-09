import { Outlet, Link } from "react-router-dom";
import Wrapper from "../../assets/wrappers/SharedLayout";
import { Navbar, BigSidebar, SmallSidebar } from "../../components";

const SharedLayout = () => {
  return (
    <Wrapper>
      <main className="dashboard">
        <SmallSidebar />
        <BigSidebar />
        <div>
          <Navbar />
          <div className="dashboard-page">
            <Outlet />
          </div>
        </div>
      </main>
      {/* <nav>
        <Link to="add-meal">Add meal</Link>
        <Link to="all-meals">All meals</Link>
        <Link to="all-glucose">All glucose</Link>
      </nav> */}
    </Wrapper>
  );
};
export default SharedLayout;
