import * as restate from "@restatedev/restate-sdk";
import { WEEKLY_INTERVAL } from "./utils/getBaseMilliseconds";
import { SendWorkoutReminderPayload, sendWorkoutReminder } from "./email";

type ReminderPayload = SendWorkoutReminderPayload & {
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
    const retrySettings = { maxRetries: 2 };
    await ctx.sideEffect(
      async () => await sendWorkoutReminder(request),
      retrySettings,
    );
    ctx
      .sendDelayed(reminderApi, baseMilliseconds + WEEKLY_INTERVAL)
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
