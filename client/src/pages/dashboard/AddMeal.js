import { FormRow, FormRowSelect, Alert } from "../../components";
import { useAppContext } from "../../context/appContext";
import Wrapper from "../../assets/wrappers/DashboardFormPage";

const AddMeal = () => {
  const {
    isLoading,
    isEditing,
    showAlert,
    displayAlert,
    mealTitle,
    mealDate,
    mealLocation,
    mealType,
    mealTypeOptions,
    mealScore,
    mealScoreOptions,
    handleChange,
    clearValues,
    createMeal,
    editMeal,
  } = useAppContext();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!mealTitle || !mealDate || !mealLocation) {
      displayAlert();
      return;
    }
    if (isEditing) {
      editMeal();
      return;
    }

    createMeal();
  };

  const handleMealInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    handleChange({ name, value });
  };

  return (
    <Wrapper>
      <h3>{isEditing ? "edit meal" : "add meal"}</h3>
      {showAlert && <Alert />}
      <div className="form-center">
        {/* mealTitle */}
        <FormRow
          type="text"
          name="mealTitle"
          labelText="title"
          value={mealTitle}
          handleChange={handleMealInput}
        />
        {/* mealTitle */}
        <FormRow
          type="date"
          labelText="date"
          name="mealDate"
          value={mealDate}
          handleChange={handleMealInput}
        />
        {/* mealLocation */}
        <FormRow
          type="text"
          labelText="location"
          name="mealLocation"
          value={mealLocation}
          handleChange={handleMealInput}
        />

        {/* mealScore */}
        <FormRowSelect
          name="mealScore"
          labelText="meal score"
          value={mealScore}
          handleChange={handleMealInput}
          list={mealScoreOptions}
        />

        {/* mealType */}
        <FormRowSelect
          name="mealType"
          labelText="meal type"
          value={mealType}
          handleChange={handleMealInput}
          list={mealTypeOptions}
        />

        {/* btn container */}
        <div className="btn-container">
          <button
            type="submit"
            className="btn btn-block submit-btn"
            onClick={handleSubmit}
            disabled={isLoading}
          >
            submit
          </button>
          <button
            className="btn btn-block clear-btn"
            onClick={(e) => {
              e.preventDefault();
              clearValues();
            }}
          >
            clear
          </button>
        </div>
      </div>
    </Wrapper>
  );
};

export default AddMeal;
