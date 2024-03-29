import * as restate from "@restatedev/restate-sdk";
import { Schedule, getBaseMilliseconds } from "./utils/getBaseMilliseconds";
import { reminderApi } from "./reminder";
import { SendWorkoutReminderPayload } from "./email";

type ScheduleWithID = Schedule & {
  scheduleID: string;
};

type ScheduleInput = {
  schedules: ScheduleWithID[];
  payload: SendWorkoutReminderPayload;
};

async function createSchedule(ctx: restate.RpcContext, request: ScheduleInput) {
  const { schedules, payload } = request;
  for (const schedule of schedules) {
    const { day, hour, minute, second, scheduleID } = schedule;
    const base = getBaseMilliseconds({ day, hour, minute, second });
    ctx.sendDelayed(reminderApi, base).remind(scheduleID, payload);
  }
}

export const scheduleRouter = restate.router({ createSchedule });

export const scheduleApi: restate.ServiceApi<typeof scheduleRouter> = {
  path: "Schedule",
};
