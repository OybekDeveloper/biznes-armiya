export const TimeFormatFunction = (time) => {
  if(!time){
    return "pending..."
  }
  const date = new Date(time);

  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const formattedDate = `${day < 10 ? `0${day}` : day}.${
    month < 10 ? `0${month}` : month
  }.${year} ${hours}:${minutes}`;

  return formattedDate;
};
