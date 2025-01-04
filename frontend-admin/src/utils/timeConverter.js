export function convertToAMPM(time) {
  let [hour, min, second] = time.split(":");
  const period = hour >= 12 ? "PM" : "AM";

  if (period === "PM") {
    if (hour !== "12") hour = hour - 12;
  }

  return `${hour}:${min}${period}`;
}
