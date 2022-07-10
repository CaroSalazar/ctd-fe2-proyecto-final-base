const capitalize = (word: string) => {
  return word[0] === "'"
    ? "'" + word[1].toUpperCase() + word.slice(2)
    : word[0].toUpperCase() + word.slice(1);
};

export const capitalizeAll = (word: string) => {
  return word
    .split(" ")
    .map((str) => capitalize(str))
    .join(" ");
};

export const getMinutes = (hour: any) => {
  const ahora = new Date();
  return Math.floor((ahora.getTime() - hour.getTime()) / 60000);
};
