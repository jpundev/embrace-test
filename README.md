# Embrace.io Interview

## Key Assumptions:
- No fetch endpoint was provided; the data is simulated.
- The indexes of the crash count match the index of the data point's timestamp.
- Minimal library usage.

## Key Features:
- **Recharts** is used to emulate the Embrace.io stack for data visualization.
- **React Query** was not used since there is no endpoint available to fetch the data.
- **Platform Filter**: Ability to filter the crash data by mobile platforms (iOS and Android).
- **Simulated Loading/Error**: Basic simulated loading state and error handling to provide a better user experience.
  
---

## Suggested Improvements:
- Mobile View could use some love
- For expanded time frames, conditionally format the date so that it will MM/DD instead of HH:MM (eg. If Start Date endDate Diff is 1, do HH:MM otherwise do MMDD? )
- If there are more elements perhaps the legend and chart may be too cluttered.
  

## Project Setup:

1. Clone the repository:
    ```bash
    git clone https://github.com/your-username/embrace-io-interview.git
    ```

2. Install dependencies:
    ```bash
    yarn install
    ```

3. Run the project:
    ```bash
    yarn dev
    ```

## Libraries Used:
- **React** for building the UI.
- **Recharts** for data visualization.
- **date-fns** for date formatting.

## Screenshots:

![Screenshot 2025-04-14 030943](https://github.com/user-attachments/assets/f23e41c6-3bd9-4ec3-9414-fa1a144d955c)
![Screenshot 2025-04-14 031012](https://github.com/user-attachments/assets/b341634a-a713-496d-a778-9192b34a9ebf)


https://github.com/user-attachments/assets/ff11c379-55de-481a-9132-2a24ea7a4103


---





