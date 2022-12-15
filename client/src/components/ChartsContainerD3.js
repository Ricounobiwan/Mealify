import React, { useState, Component, useRef, useEffect } from "react";

// import BarChart from "./BarChart";
// import AreaChart from "./AreaChart";
import { useAppContext } from "../context/appContext";
import Wrapper from "../assets/wrappers/ChartsContainer";

import * as d3 from "d3";
import { render } from "react-dom";

// export default
function VerticalBar() {
  const data = [12, 36, 55, 25, 35, 10, 40];
  const barRef = useRef(null);
  const w = 600;
  const h = 400;

  useEffect(() => {
    let currentRef = d3
      .select(barRef.current)
      .append("svg")
      .attr("width", w)
      .attr("height", h)
      .style("padding", 10)
      .style("background-color", "white")
      .style("margin-left", 50);

    currentRef
      .selectAll("bar")
      .data(data)
      .enter()
      .append("rect")
      .attr("x", (d, i) => i * 70)
      .attr("y", (d, i) => h - 10 * d)
      .attr("width", 65)
      .attr("height", (d, i) => d * 10)
      .attr("fill", (d, i) => (d > 35 ? "gray" : "light-gray"));
  });
  return (
    <div className="parent">
      <div ref={barRef}></div>
    </div>
  );
}

class BarChartD3 extends Component {
  constructor(props) {
    super(props);
    this.myRef = React.createRef();
  }

  componentDidMount() {
    let accessToRef = d3.select(this.myRef.current);
    accessToRef.style("background-color", "green");
  }

  render() {
    return (
      <>
        <div ref={this.myRef}>Testing Refs</div>
        <VerticalBar />
      </>
    );
  }
}

const ChartsContainerD3 = ({ chartTitle, chartData }) => {
  const [barChart, setBarChart] = useState(true);
  let { [chartData]: data } = useAppContext();
  console.log(data);
  if (chartTitle === "Daily Glucose" || chartTitle === "All Glucose Captures") {
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
      <h4>{chartTitle}</h4>
      <BarChartD3 />
      {/*
      <button type="button" onClick={() => setBarChart(!barChart)}>
        {barChart ? "Area Chart" : "Bar Chart"}
      </button>
      {barChart ? <BarChart data={data} /> : <AreaChart data={data} />} */}
    </Wrapper>
  );
};
export default ChartsContainerD3;

/*
// D3 selectors
import * as d3 from d3
d3.selectAll('p').style('color','red')
d3.select('body')
d3.select('h3')


*/
