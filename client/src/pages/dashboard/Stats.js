import { useEffect, useInsertionEffect } from "react";
import {
  StatsContainer,
  Loading,
  ChartsContainer,
  ChartsContainerD3,
} from "../../components";

import { useAppContext } from "../../context/appContext";

const Stats = () => {
  const { showStats, isLoading, monthlyMeals, dailyGlucose } = useAppContext();
  useEffect(() => {
    showStats();
    // eslint-disable-next-line
  }, []);
  if (isLoading) {
    return <Loading center />;
  }

  return (
    <>
      <StatsContainer />
      {monthlyMeals.length > 0 && (
        <ChartsContainer chartTitle="Monthly Meals" chartData="monthlyMeals" />
      )}
      {dailyGlucose.length > 0 && (
        <ChartsContainer
          chartTitle="All Glucose Captures"
          chartData="dailyGlucose"
        />
      )}
      {dailyGlucose.length > 0 && (
        <ChartsContainer chartTitle="Daily Glucose" chartData="dailyGlucose" />
      )}
      <hr />
      {dailyGlucose.length > 0 && (
        <ChartsContainerD3 chartTitle="D3 Glucose" chartData="dailyGlucose" />
      )}
    </>
  );
};
export default Stats;
