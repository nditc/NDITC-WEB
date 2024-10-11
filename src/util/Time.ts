import { timeValue } from "@/app/club/Components/Time";

export const RemainingTimeHM = (before: any, after: any) => {
  let hours = timeValue(after).hour - timeValue(before).hour;
  let mins = timeValue(after).minute - timeValue(before).minute;

  if (mins < 0) {
    mins = 60 + mins;
    hours--;
  }

  return {
    hours,
    mins,
  };
};
