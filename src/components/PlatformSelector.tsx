import { PlatformTypes } from "../constants/enums";
import styles from "./AppVersionCrashReport.module.css";

interface PlatformSelectorProps {
  platform: PlatformTypes;
  setPlatform: (platform: PlatformTypes) => void;
}

export const PlatformSelector = ({
  platform,
  setPlatform,
}: PlatformSelectorProps) => {
  return (
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
  );
};
