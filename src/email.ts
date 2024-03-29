import { render } from "@react-email/render";
import nodemailer from "nodemailer";
import {
  WorkoutReminderEmail,
  WorkoutReminderEmailProps,
} from "./template/reminder";

type SendWorkoutReminderPayload = WorkoutReminderEmailProps & { email: string };

async function sendWorkoutReminder(payload: SendWorkoutReminderPayload) {
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    auth: {
      user: process.env.SMTP_USERNAME,
      pass: process.env.SMTP_PASSWORD,
    },
  });

  const emailHtml = render(WorkoutReminderEmail(payload));
  const emailtext = render(WorkoutReminderEmail(payload), { plainText: true });

  const options = {
    from: "reminder@gigachad.buzz",
    to: payload.email,
    subject: "Your Daily Workout Reminder",
    html: emailHtml,
    text: emailtext,
  };

  return await transporter.sendMail(options);
}

export { sendWorkoutReminder };
export type { SendWorkoutReminderPayload };
