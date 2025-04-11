import { format } from "date-fns";

const generateHexColor = () => {
  const hexChars = "0123456789abcdef";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    const randIndex = Math.floor(Math.random() * 16);
    color += hexChars[randIndex];
  }
  return color;
};
export const formatDate = (timestamp: number) => {
  return format(new Date(timestamp * 1000), "HH:mm");
};

export const getRandomLineColors = (length: number) => {
  const colors: string[] = [];

  for (let i = 0; i < length; i++) {
    colors.push(generateHexColor());
  }

  return colors;
};
