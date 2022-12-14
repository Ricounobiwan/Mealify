import React, { useState } from "react";

import BarChart from "./BarChart";
import AreaChart from "./AreaChart";
import { useAppContext } from "../context/appContext";
import Wrapper from "../assets/wrappers/ChartsContainer";

const ChartsContainer = ({ chartTitle, chartData }) => {
  const [barChart, setBarChart] = useState(true);
  let { [chartData]: data } = useAppContext();

  if (chartTitle === "Daily Glucose") {
    let newData = data.map((item) => {
      let date = item.base_time_string;
      let count = item.glucose_value;

      return { date, count };
    });

    data = newData;
    console.log(newData);
  }

  return (
    <Wrapper>
      <h4>
        {chartTitle}
        {chartTitle === "Daily Glucose" ? " (mg/dL)" : ""}
      </h4>
      <button type="button" onClick={() => setBarChart(!barChart)}>
        {barChart ? "Area Chart" : "Bar Chart"}
      </button>
      {barChart ? <BarChart data={data} /> : <AreaChart data={data} />}
    </Wrapper>
  );
};
export default ChartsContainer;
