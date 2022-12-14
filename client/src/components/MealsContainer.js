import { useAppContext } from "../context/appContext";
import { useEffect } from "react";
import Loading from "./Loading";
import Meal from "./Meal";
import Wrapper from "../assets/wrappers/MealsContainer";
import PageBtnContainer from "./PageBtnContainer";

const MealsContainer = () => {
  const {
    getMeals,
    meals,
    isLoading,
    page,
    totalMeals,
    search,
    searchMealScore,
    searchMealType,
    sort,
    numOfPages,
  } = useAppContext();

  useEffect(() => {
    getMeals();
    // eslint-disable-next-line
  }, [page, search, searchMealScore, searchMealType, sort]);

  if (isLoading) {
    return <Loading center />;
  }

  if (meals.length === 0) {
    return (
      <Wrapper>
        <h2>No meals to display</h2>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <h5>
        {totalMeals} meal{meals.length > 1 && "s"} found
      </h5>
      <div className="meals">
        {meals.map((meal) => {
          return <Meal key={meal._id} {...meal} />;
        })}
      </div>
      {numOfPages > 1 && <PageBtnContainer />}
    </Wrapper>
  );
};
export default MealsContainer;
