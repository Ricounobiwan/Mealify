import { FormRow, FormRowSelect } from ".";
import { useAppContext } from "../context/appContext";
import Wrapper from "../assets/wrappers/SearchContainer";

const SearchMealsContainer = () => {
  const {
    isLoading,
    search,
    searchMealScore,
    searchMealType,
    sort,
    sortOptions,
    handleChange,
    clearFilters,
    mealTypeOptions,
    mealScoreOptions,
  } = useAppContext();

  const handleSearch = (e) => {
    if (isLoading) return;
    handleChange({ name: e.target.name, value: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    clearFilters();
  };

  return (
    <Wrapper>
      <form className="form">
        <h4> search form</h4>
        <div className="form-center">
          {/* search mealTitle */}
          <FormRow
            type="text"
            name="search"
            value={search}
            handleChange={handleSearch}
          />
          {/* search by mealScore */}
          <FormRowSelect
            labelText="meal score"
            name="searchMealScore"
            value={searchMealScore}
            handleChange={handleSearch}
            list={["all", ...mealScoreOptions]}
          />

          {/* search by mealType */}
          <FormRowSelect
            labelText="meal type"
            name="searchMealType"
            value={searchMealType}
            handleChange={handleSearch}
            list={["all", ...mealTypeOptions]}
          />

          {/* sort */}
          <FormRowSelect
            name="sort"
            value={sort}
            handleChange={handleSearch}
            list={sortOptions}
          />
          <button
            className="btn btn-block btn-danger"
            disabled={isLoading}
            onClick={handleSubmit}
          >
            clear filters
          </button>
        </div>
      </form>
    </Wrapper>
  );
};
export default SearchMealsContainer;
