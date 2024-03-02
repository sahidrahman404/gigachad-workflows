import { render } from "@react-email/render";
import nodemailer from "nodemailer";
import { NotionMagicLinkEmail } from "./template/reminder";
import * as restate from "@restatedev/restate-sdk";

async function send(ctx: restate.RpcContext, request: {}) {
  const transporter = nodemailer.createTransport({
    host: "",
    port: 0,
    secure: false,
  });

  const emailHtml = render(NotionMagicLinkEmail({}));

  const options = {
    from: "you@example.com",
    to: "user@gmail.com",
    subject: "hello world",
    html: emailHtml,
  };

  await transporter.sendMail(options);
}

export const emailRouter = restate.router({ send });

export const emailApi: restate.ServiceApi<typeof emailRouter> = {
  path: "Email",
};
