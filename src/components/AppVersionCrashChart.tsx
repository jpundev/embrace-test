import { useMemo } from "react";
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
import { formatDate, getRandomLineColors } from "../helpers/helper";
import { AppVersionCrashChartResponseDataType } from "../hooks/useFetchAppVersionErrorCount";
export const AppVersionCrashChart = ({
  data,
}: {
  data: AppVersionCrashChartResponseDataType[];
}) => {
  // Function to format the timestamp to a human-readable date without using an external library

  const lineColors = useMemo(() => {
    return getRandomLineColors(data.length);
  }, [data]);
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
