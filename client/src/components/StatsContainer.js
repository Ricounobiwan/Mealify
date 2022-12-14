import { useAppContext } from "../context/appContext";
import StatItem from "./StatItem";
import {
  FaRedoAlt,
  FaSun,
  FaCloudSunRain,
  FaCloudShowersHeavy,
} from "react-icons/fa";
import Wrapper from "../assets/wrappers/StatsContainer";

const StatsContainer = () => {
  const { stats } = useAppContext();

  const defaultStats = [
    {
      title: "Meals with no Score Yet",
      count: stats.noScoreYet || 0,
      icon: <FaRedoAlt />,
      color: "#e9b949",
      bcg: "#fcefc7",
    },
    {
      title: "Meals with stable Glucose Response",
      count: stats.stableGlucoseResponse || 0,
      icon: <FaSun />,
      color: "#649ccb",
      bcg: "#e0f9f9",
    },
    {
      title: "Meals with moderate Glucose Response",
      count: stats.moderateGlucoseResponse || 0,
      icon: <FaCloudSunRain />,
      color: "#5369ba",
      bcg: "#d0d7e8",
    },
    {
      title: "Meals with high Glucose Response",
      count: stats.highGlucoseResponse || 0,
      icon: <FaCloudShowersHeavy />,
      color: "#d66a6a",
      bcg: "#ffeeee",
    },
  ];

  return (
    <Wrapper>
      {defaultStats.map((item, index) => {
        return <StatItem key={index} {...item} />;
      })}
    </Wrapper>
  );
};
export default StatsContainer;
