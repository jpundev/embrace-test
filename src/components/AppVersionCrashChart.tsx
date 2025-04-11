import {
  Label,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { lineColors } from "../constants/colorArray";
import { formatDate } from "../helpers/helper";
import { AppVersionCrashChartResponseDataType } from "../hooks/useFetchAppVersionErrorCount";

type AppVersionCrashChartProps = {
  data: AppVersionCrashChartResponseDataType[];
};

export const AppVersionCrashChart = ({ data }: AppVersionCrashChartProps) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart
        data={data}
        margin={{ top: 20, right: 30, left: 10, bottom: 5 }}
      >
        <XAxis
          dataKey="timestamp"
          tick={{ fontSize: 12 }}
          tickFormatter={formatDate} // Applying the formatter
        >
          <Label value="Time" position="insideBottom" />
        </XAxis>
        <YAxis allowDecimals={false}>
          <Label value="# of Crashes" angle={-90} position="insideLeft" />
        </YAxis>
        <Tooltip labelFormatter={formatDate} />
        <Legend layout="horizontal" align="center" verticalAlign="top" />
        {Object.keys(data[0])
          .filter((key) => key !== "timestamp") // Filter out the timestamp key
          .map((key, index) => (
            <Line
              key={key}
              type="monotone"
              dataKey={key}
              strokeWidth={2}
              stroke={lineColors[index]}
              dot={false}
            />
          ))}
      </LineChart>
    </ResponsiveContainer>
  );
};
