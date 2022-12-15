import {
  BarChart,
  Bar,
  Label,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const BarChartComponent = ({ data, chartTitle }) => {
  const Xlabel =
    chartTitle === "All Glucose Captures" || chartTitle === "Daily Glucose"
      ? "Glucose Data Captures From The Sensor"
      : "Month";
  const YLabel =
    chartTitle === "All Glucose Captures" || chartTitle === "Daily Glucose"
      ? "mg/dL blood sugar"
      : "Nb of Meals";

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data} margin={{ top: 50, bottom: 20 }}>
        <CartesianGrid strokeDasharray="3 3 " />
        <XAxis dataKey="date">
          <Label value={Xlabel} offset={-10} position="insideBottom" />
        </XAxis>
        <YAxis
          allowDecimals={false}
          label={{
            value: YLabel,
            angle: -90,
            position: "insideLeft",
          }}
        />
        <Tooltip />
        <Bar dataKey="count" fill="#2cb1bc" barSize={75} />
      </BarChart>
    </ResponsiveContainer>
  );
};
export default BarChartComponent;
