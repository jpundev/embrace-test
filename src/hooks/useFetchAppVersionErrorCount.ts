import { useEffect, useState } from "react";

type FetchAppVersionCrashChartParams = {
  startDate: string;
  endDate: string;
  version?: string;
};

export type AppVersionCrashChartResponseDataType = {
  timestamp: number;
  [appVersion: string]: number;
};

export const useFetchAppVersionErrorCount = ({
  startDate,
  endDate,
  version,
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
        };
        if (version) {
          queryParams.version = version;
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
  }, [startDate, endDate, version]);

  return {
    loading,
    error,
    data,
  };
};

export type UseFetchAppVersionErrorCountReturnType = ReturnType<
  typeof useFetchAppVersionErrorCount
>;
