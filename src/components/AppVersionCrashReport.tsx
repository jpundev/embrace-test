import { useState } from "react";
import { PlatformTypes } from "../constants/enums";
import { UseFetchAppVersionErrorCountReturnType } from "../hooks/useFetchAppVersionErrorCount";
import { useMockFetchAppVersionVersionErrorCount } from "../hooks/useMockFetchAppVersionVersionErrorCount";
import { AppVersionCrashChart } from "./AppVersionCrashChart";
import styles from "./AppVersionCrashReport.module.css";
import { PlatformSelector } from "./PlatformSelector";

const tempParams = {
  startDate: "2025-03-17",
  endDate: "2025-03-19",
};

export const AppVersionCrashReport = () => {
  const [platform, setPlatform] = useState<PlatformTypes>(PlatformTypes.ALL);

  const { data, loading, error } = useMockFetchAppVersionVersionErrorCount({
    startDate: tempParams.startDate,
    endDate: tempParams.endDate,
    platform,
  });

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>📊 App Version Crash Report</h1>
      <h2 className={styles.subtitle}>
        From {tempParams.startDate} to {tempParams.endDate}
      </h2>
      <PlatformSelector platform={platform} setPlatform={setPlatform} />
      <CrashReportContent loading={loading} error={error} data={data} />
    </div>
  );
};

const CrashReportContent = ({
  loading,
  error,
  data,
}: UseFetchAppVersionErrorCountReturnType) => {
  if (loading)
    return (
      <div className={styles.contentContainer}>
        <span className={styles.spinner} />
      </div>
    );

  if (error)
    return (
      <div className={styles.contentContainer}>
        <span className={styles.errorIcon}>⚠️</span>
        <p className={`${styles.statusMessage} ${styles.errorText}`}>
          Error: Can't fetch Data
        </p>
      </div>
    );

  if (data.length === 0)
    return (
      <div className={styles.contentContainer}>
        <span className={styles.emptyIcon}>📅</span>
        <p className={styles.statusMessage}>
          There is no data for this time period
        </p>
      </div>
    );
  return (
    <div className={styles.contentContainer}>
      <AppVersionCrashChart data={data} />
    </div>
  );
};
