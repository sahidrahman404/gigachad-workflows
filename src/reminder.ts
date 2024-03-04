import * as restate from "@restatedev/restate-sdk";
import { SendWorkoutReminderPayload, sendWorkoutReminder } from "./email";
import { WEEKLY_INTERVAL } from "./utils/getBaseMilliseconds";

async function remind(
  ctx: restate.RpcContext,
  scheduleID: string,
  payload: SendWorkoutReminderPayload,
) {
  const removed = (await ctx.get<boolean>("REMOVED")) ?? false;
  if (!removed) {
    const retrySettings = { maxRetries: 2 };
    await ctx.sideEffect(
      async () => await sendWorkoutReminder(payload),
      retrySettings,
    );
    ctx.sendDelayed(reminderApi, WEEKLY_INTERVAL).remind(scheduleID, payload);
  }
}

async function removeReminder(ctx: restate.RpcContext, _: string) {
  ctx.set<boolean>("REMOVED", true);
}

export const reminderRouter = restate.keyedRouter({ remind, removeReminder });

export const reminderApi: restate.ServiceApi<typeof reminderRouter> = {
  path: "Reminder",
};
