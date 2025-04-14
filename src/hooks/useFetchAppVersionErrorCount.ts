import { useEffect, useState } from "react";
import { PlatformTypes } from "../constants/enums";

type FetchAppVersionCrashChartParams = {
  startDate: string;
  endDate: string;
  step: string;
  platform?: PlatformTypes;
  app_version?: string;
};

export type AppVersionCrashChartResponseDataType = {
  timestamp: number;
  [appVersion: string]: number;
};

export const useFetchAppVersionErrorCount = ({
  startDate,
  endDate,
  step,
  platform,
  app_version,
}: FetchAppVersionCrashChartParams) => {
  //Typically would handle fetch states via a library but for the purpose of this
  // project, just handle these states here

  const [data, setData] = useState<AppVersionCrashChartResponseDataType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const queryParams: Record<string, string> = {
          startDate,
          endDate,
          step,
        };
        if (app_version) {
          queryParams.app_version = app_version;
        }
        if (platform) {
          queryParams.platform = platform;
        }

        const queryString = new URLSearchParams(queryParams).toString();

        const res = await fetch(
          `https://embrace-io.com/endpoint?${queryString}`
        );
        if (!res.ok) throw new Error("Theres an error fetching your data");
        const jsonData = await res.json();
        setData(jsonData);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("Unknown Error has occured");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [startDate, endDate, app_version, platform, step]);

  return {
    loading,
    error,
    data,
  };
};

export type UseFetchAppVersionErrorCountReturnType = ReturnType<
  typeof useFetchAppVersionErrorCount
>;
