import { test, expect, describe } from "vitest";
import { getBaseMilliseconds } from "./getBaseMilliseconds";

describe("get base milliseconds", () => {
  test("should return the same day if the schedule hasn't passed the current date", () => {
    const currDate = new Date();
    currDate.setUTCMinutes(currDate.getUTCMinutes() + 10); // add 10 minutes

    const base = getBaseMilliseconds({
      day: currDate.getUTCDay(),
      hour: currDate.getUTCHours(),
      minute: currDate.getUTCMinutes(),
      second: currDate.getUTCSeconds(),
    });

    const expected = new Date(currDate);

    expect(base).toStrictEqual(expected.getTime());
  });

  test("should return the next week if the schedule has passed the current date", () => {
    const currDate = new Date();
    currDate.setUTCMinutes(currDate.getUTCMinutes() - 10); // subtract 10 minutes

    const base = getBaseMilliseconds({
      day: currDate.getUTCDay(),
      hour: currDate.getUTCHours(),
      minute: currDate.getUTCMinutes(),
      second: currDate.getUTCSeconds(),
    });

    const expected = new Date(currDate);

    expect(base).toStrictEqual(expected.getTime());
  });

  test("should return the next week if the schedule has passed the current date", () => {
    const currDate = new Date();
    currDate.setDate(currDate.getDate() - 1); // subtract 1 day

    const base = getBaseMilliseconds({
      day: currDate.getUTCDay(),
      hour: currDate.getUTCHours(),
      minute: currDate.getUTCMinutes(),
      second: currDate.getUTCSeconds(),
    });

    const expected = new Date(currDate);
    expected.setDate(currDate.getDate() + 7);

    expect(base).toStrictEqual(expected.getTime());
  });
});
