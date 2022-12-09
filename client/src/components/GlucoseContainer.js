import { useAppContext } from "../context/appContext";
import { useEffect } from "react";
import Loading from "./Loading";
import Glucose from "./Glucose";
import Wrapper from "../assets/wrappers/GlucoseContainer";

const GlucoseContainer = () => {
  const { getGlucose, glucose, isLoading, pageGlucose, totalGlucose } =
    useAppContext();
  useEffect(() => {
    getGlucose();
  }, []);
  if (isLoading) {
    return <Loading center />;
  }

  if (glucose.length === 0) {
    return (
      <Wrapper>
        <h2>No glucose data to display</h2>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <h5>
        {totalGlucose} event{glucose.length > 1 && "s"} found
      </h5>
      <div className="glucose">
        {glucose.map((item) => {
          return <Glucose key={item._id} {...item} />;
        })}
      </div>
    </Wrapper>
  );
};
export default GlucoseContainer;
