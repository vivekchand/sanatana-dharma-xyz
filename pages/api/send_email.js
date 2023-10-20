import { Email } from './email';
import { render } from '@react-email/render';
import { MailerSend, EmailParams, Sender, Recipient } from "mailersend";

const mailerSend = new MailerSend({
  apiKey: process.env.MAILERSEND_API_KEY || '',
});

const handler = async (req) => {
    const emailHtml = render(<Email url="https://sanatanadharma.xyz" />);

    const sentFrom = new Sender("namaste@sanatanadharma.xyz", "SanatanaDharma.xyz");
    const recipients = [
        new Recipient("vivekchand19@gmail.com", "Vivek Chand")
    ];

    const emailParams = new EmailParams()
        .setFrom(sentFrom)
        .setTo(recipients)
        .setSubject("Namaskaram!")
        .setHtml(emailHtml)

    mailerSend.email.send(emailParams);
    return new Response("Email Sent!!!");
}

export default handler;
