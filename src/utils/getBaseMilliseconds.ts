type Schedule = {
  day: number;
  second: number;
  minute: number;
  hour: number;
};

const INTERVAL = 7 * 24 * 60 * 60 * 1000; // 7 days in milliseconds

function getBaseMilliseconds({ day, hour, minute, second }: Schedule): number {
  const currentDate = new Date();

  let daysAhead = day - currentDate.getDay(); // Sunday is 0
  if (daysAhead < 0) {
    daysAhead += 7;
  }

  const base = new Date(
    currentDate.getTime() + daysAhead * 24 * 60 * 60 * 1000,
  );

  base.setUTCHours(hour); // in 24-hour format
  base.setUTCMinutes(minute); // Set the minutes
  base.setUTCSeconds(second); // Set the seconds

  return base.getTime();
}

export type { Schedule };
export { getBaseMilliseconds, INTERVAL };
