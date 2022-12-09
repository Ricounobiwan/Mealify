import moment from "moment";
import { FaLocationArrow, FaBriefcase, FaCalendarAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useAppContext } from "../context/appContext";
import Wrapper from "../assets/wrappers/Glucose";
import GlucoseInfo from "./GlucoseInfo";

const Glucose = ({
  base_time_string,
  base_time_unix,
  base_type,
  createdAt,
  customEvent_duration_min,
  customEvent_title,
  exercise_duration_min,
  exercise_title,
  glucose_value,
  meal_score,
  meal_tags,
  meal_title,
  note_note,
  sleep_duration_min,
  updatedAt,
}) => {
  let date = moment(base_time_string);
  date = date.format("MMM Do, YYYY");

  let displayed_title = "";

  switch (base_type) {
    case "meal":
      displayed_title = `${meal_title}: ${meal_tags}`;
      break;
    case "customEvent":
      displayed_title = customEvent_title;
      break;
    case "exercise":
      displayed_title = exercise_title;
      break;
    case "glucose":
      displayed_title = glucose_value;
      break;
    case "sleep":
      displayed_title = `Duration: ${sleep_duration_min} min`;
      break;
    case "note":
      displayed_title = note_note;
      break;
    default:
      console.log(`Sorry, we are out of ${base_type}.`);
  }

  return (
    <Wrapper>
      <header>
        <div className="main-icon">{base_type[0]}</div>
        <div className="info">
          <h5>{base_type}</h5>
          <h5>{displayed_title}</h5>
          <p>{date}</p>
        </div>
      </header>
    </Wrapper>

    // <Wrapper>
    //   <header>
    //     <div className="main-icon">{base_type.charAt[0]}</div>
    //   </header>
    //   {/* <h5>{mealTitle}</h5>
    // <h5>{date}</h5> */}
    //   <div>
    //     <h4>
    //       {date} - {base_type}
    //     </h4>
    //     <p>
    //       {base_type === "customEvent"
    //         ? `customEvent_title: ${customEvent_title}`
    //         : ""}
    //     </p>
    //     <p>
    //       {base_type === "customEvent"
    //         ? `customEvent_duration_min: ${customEvent_duration_min}`
    //         : ""}
    //     </p>

    //     <p>
    //       {base_type === "exercise"
    //         ? `exercise_title: ${exercise_title} - ${exercise_duration_min} min`
    //         : ""}
    //     </p>

    //     <p>
    //       {base_type === "glucose" ? `glucose_value: ${glucose_value}` : ""}
    //     </p>

    //     <p>
    //       {base_type === "meal"
    //         ? `meal_title: ${meal_title} - Score: ${meal_score}`
    //         : ""}
    //     </p>
    //     <p>{base_type === "meal" ? `meal_tags: ${meal_tags}` : ""}</p>

    //     <p>{base_type === "note" ? `note_note: ${note_note}` : ""}</p>

    //     <p>
    //       {base_type === "sleep"
    //         ? `sleep_duration_min: ${sleep_duration_min}`
    //         : ""}
    //     </p>
    //     <p>
    //       Created At: {moment(createdAt).format("MMM Do, YYYY")} - Last Updated
    //       At: {moment(updatedAt).format("MMM Do, YYYY")}
    //     </p>
    //   </div>
    // </Wrapper>
  );

  // {base_type === "glucose" && base_type}
};
export default Glucose;

/*
base_time_string
base_time_unix
base_type
createdAt
createdBy
customEvent_duration_min
customEvent_title
exercise_duration_min
exercise_title
glucose_value
meal_score
meal_tags
meal_title
note_note
sleep_duration_min
updatedAt
*/
