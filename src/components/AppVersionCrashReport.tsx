import { useState } from "react";
import { PlatformTypes } from "../constants/enums";
import { useFetchAppVersionErrorCount } from "../hooks/useFetchAppVersionErrorCount";
import { AppVersionCrashChart } from "./AppVersionCrashChart";
import styles from "./AppVersionCrashReport.module.css";

const tempParams = {
  startDate: "2025-03-17",
  endDate: "2025-03-19",
};

export const AppVersionCrashReport = () => {
  const [platform, setPlatform] = useState<PlatformTypes>(PlatformTypes.ALL);

  const { data, loading, error } = useFetchAppVersionErrorCount({
    startDate: tempParams.startDate,
    endDate: tempParams.endDate,
    platform,
  });

  if (loading)
    return (
      <div className={styles.container}>
        <p className={styles.statusMessage}>Loading crash data...</p>
      </div>
    );

  if (error)
    return (
      <div className={styles.container}>
        <p className={styles.statusMessage} style={{ color: "red" }}>
          Error: {error}
        </p>
      </div>
    );

  if (data.length === 0) {
    return (
      <div className={styles.container}>
        <p className={styles.statusMessage}>
          There is no data for this time period
        </p>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>📊 App Version Crash Report</h1>
      <h2 className={styles.subtitle}>
        From {tempParams.startDate} to {tempParams.endDate}
      </h2>
      <div className={styles.platformFilter}>
        <label htmlFor="platform">Platform:</label>
        <select
          id="platform"
          value={platform}
          onChange={(e) => setPlatform(e.target.value as PlatformTypes)}
        >
          <option value={PlatformTypes.ALL}>All</option>
          <option value={PlatformTypes.IOS}>iOS</option>
          <option value={PlatformTypes.ANDROID}>Android</option>
        </select>
      </div>
      <div className={styles.chartContainer}>
        <AppVersionCrashChart data={data} />
      </div>
    </div>
  );
};
