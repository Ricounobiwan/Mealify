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
  let mealScoreMsg = "TBD";

  switch (mealScore) {
    case "noScoreYet":
      mealScoreStyle = "no_score";
      mealScoreMsg = "No Score Yet";
      break;
    case "stableGlucoseResponse":
      mealScoreStyle = "good_score";
      mealScoreMsg = "Score: 8-10";
      break;
    case "moderateGlucoseResponse":
      mealScoreStyle = "med_score";
      mealScoreMsg = "Score: 5-7";
      break;
    case "highGlucoseResponse":
      mealScoreStyle = "bad_score";
      mealScoreMsg = "Score: 1-4";
      break;
    default:
      console.log(`Sorry, we are out of ${mealScore}.`);
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
          <div className={`mealScore ${mealScoreStyle}`}>{mealScoreMsg}</div>
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
