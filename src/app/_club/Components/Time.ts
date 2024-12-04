import { Timestamp } from "firebase/firestore";

export function timeValue(timeParam: Timestamp) {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const time = new Date(
    timeParam?.seconds * 1000 + timeParam?.nanoseconds / 1000000
  );

  const hour = time?.getHours();
  const minute = time?.getMinutes();
  const seconds = time?.getSeconds();
  const date = time?.getDate();
  const month = time?.getMonth() + 1;
  const year = time?.getFullYear();

  return {
    hour: hour,
    minute: minute,
    seconds: seconds,
    date: date,
    month: month,
    monthText: months[month - 1],
    year: year,
    time: time,
  };
}
