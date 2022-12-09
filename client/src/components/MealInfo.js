import Wrapper from "../assets/wrappers/MealInfo";

const MealInfo = ({ icon, text }) => {
  return (
    <Wrapper>
      <span className="icon">{icon}</span>
      <span className="text">{text}</span>
    </Wrapper>
  );
};
export default MealInfo;
