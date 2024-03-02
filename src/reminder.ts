import * as restate from "@restatedev/restate-sdk";
import { RoutineExercise } from "./schedule";
import { INTERVAL } from "./utils/getBaseMilliseconds";

type ReminderPayload = {
  email: string;
  fullName: string;
  routineExercises: RoutineExercise[];
  baseMilliseconds: number;
};

async function remind(
  ctx: restate.RpcContext,
  scheduleID: string,
  request: ReminderPayload,
) {
  const { baseMilliseconds } = request;
  const removed = (await ctx.get<boolean>("REMOVED")) ?? false;
  if (!removed) {
    ctx
      .sendDelayed(reminderApi, baseMilliseconds + INTERVAL)
      .remind(scheduleID, request);
  }
}

async function removeReminder(ctx: restate.RpcContext, scheduleID: string) {
  ctx.set<boolean>("REMOVED", true);
}

export { ReminderPayload };

export const reminderRouter = restate.keyedRouter({ remind, removeReminder });

export const reminderApi: restate.ServiceApi<typeof reminderRouter> = {
  path: "Reminder",
};
