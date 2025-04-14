import { useEffect, useState } from "react";
import { PlatformTypes } from "../constants/enums";
import { AppVersionCrashChartResponseDataType } from "./useFetchAppVersionErrorCount";

type MockFetchAppVersionCrashChartParams = {
  startDate: string;
  endDate: string;
  version?: string;
  platform?: PlatformTypes;
};
// prettier-ignore
const mockResponse = {
  "end": "2025-03-17T12:30:00Z",
  "start": "2025-03-16T12:30:00Z",
  "step": 600,
  "data": [
    {
      "app_version": "25.11.0.1",
      "platform": "IOS",
      "crash.count": [2, 1, 4, 0],
      "timestamp": [1742143800, 1742161800, 1742180600, 1742199000]
    },
    {
      "app_version": "25.11.0.2",
      "platform": "IOS",
      "crash.count": [0, 3, 2, 5],
      "timestamp": [1742143800, 1742161800, 1742180600, 1742199000]
    },
    {
      "app_version": "25.11.0.3",
      "platform": "ANDROID",
      "crash.count": [1, 2, 3, 1],
      "timestamp": [1742143800, 1742161800, 1742180600, 1742199000]
    },
    {
      "app_version": "25.12.0.1",
      "platform": "ANDROID",
      "crash.count": [3, 1, 0, 2],
      "timestamp": [1742143800, 1742161800, 1742180600, 1742199000]
    }
  ]
}

export const useMockFetchAppVersionVersionErrorCount = ({
  platform,
}: MockFetchAppVersionCrashChartParams) => {
  const [data, setData] = useState<AppVersionCrashChartResponseDataType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    setLoading(true);

    const processMockData = () => {
      // I need to flatten the data for recharts into a format thats easy to use

      const platformFiltered = mockResponse.data.filter((entry) => {
        if (platform === PlatformTypes.ALL) return true;
        return entry.platform === platform;
      });

      const flattened: AppVersionCrashChartResponseDataType[] = [];

      platformFiltered.forEach(({ app_version, timestamp, ...rest }) => {
        const crash_count = rest["crash.count"];

        timestamp.forEach((time, i) => {
          // Check if this timestamp already exists
          const existing = flattened.find((entry) => entry.timestamp === time);

          if (existing) {
            // Add crash count under app_version key
            existing[app_version] = crash_count[i];
          } else {
            // Create new entry with app_version crash count
            flattened.push({
              timestamp: time,
              [app_version]: crash_count[i],
            });
          }
        });
      });
      setData(flattened);
    };
    const timeout = setTimeout(() => {
      processMockData();
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timeout);
  }, [platform]);

  return {
    loading,
    error,
    data,
  };
};

export type UseMockFetchAppVersionErrorCountReturnType = ReturnType<
  typeof useMockFetchAppVersionVersionErrorCount
>;
