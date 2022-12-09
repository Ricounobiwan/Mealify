import moment from "moment";
import { FaLocationArrow, FaPizzaSlice, FaCalendarAlt } from "react-icons/fa";

import { Link } from "react-router-dom";
import { useAppContext } from "../context/appContext";
import Wrapper from "../assets/wrappers/Meal";
import MealInfo from "./MealInfo";

const Meal = ({
  _id,
  createdAt,
  createdBy,
  mealDate,
  mealLocation,
  mealScore,
  mealTitle,
  mealType,
  updatedAt,
}) => {
  const { setEditMeal, deleteMeal } = useAppContext();

  let date = moment(mealDate);
  date = date.format("MMM Do, YYYY");

  let mealScoreStyle = "";
  let mealScoreMsg = mealScore.split(" ")[0];
  switch (mealScore[0]) {
    case "N":
      mealScoreStyle = "no_score";
      mealScoreMsg = "TBD";
      break;
    case "8":
      mealScoreStyle = "good_score";
      break;
    case "5":
      mealScoreStyle = "med_score";
      break;
    case "1":
      mealScoreStyle = "bad_score";
      break;
    default:
      console.log(`Sorry, we are out of ${mealScore[0]}.`);
  }

  return (
    <Wrapper>
      <header>
        <div className="main-icon">{mealType[0]}</div>
        <div className="info">
          <h5>{mealTitle}</h5>
          <p>{date}</p>
        </div>
      </header>
      <div className="content">
        <div className="content-center">
          <MealInfo icon={<FaLocationArrow />} text={mealLocation} />
          <MealInfo icon={<FaCalendarAlt />} text={mealDate} />
          <MealInfo icon={<FaPizzaSlice />} text={mealType} />
          <div className={`mealScore ${mealScoreStyle}`}>
            Score: {mealScoreMsg}
          </div>
        </div>

        <footer>
          <div className="actions">
            <Link
              to="/add-meal"
              className="btn edit-btn"
              onClick={() => setEditMeal(_id)}
            >
              Edit
            </Link>
            <button
              type="button"
              className="btn delete-btn"
              onClick={() => deleteMeal(_id)}
            >
              Delete
            </button>
          </div>
        </footer>
      </div>
    </Wrapper>
  );
};
export default Meal;

/*
createdAt
createdBy
mealDate
mealLocation
mealScore
mealTitle
mealType
updatedAt
*/
