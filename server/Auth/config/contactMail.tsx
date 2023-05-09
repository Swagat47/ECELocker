const nodemailer = require("nodemailer");

import { OAuth2Client } from "google-auth-library";
import SendmailTransport from "nodemailer/lib/sendmail-transport";
import { resourceLimits } from "worker_threads";

const OAUTH_PLAYGROUND = "https://developers.google.com/oauthplayground";

const CLIENT_ID = `${process.env.MAIL_CLIENT_ID}`;
const CLIENT_SECRET = `${process.env.MAIL_CLIENT_SECRET}`;
const REFRESH_TOKEN = `${process.env.MAIL_REFRESH_TOKEN}`;
const SENDER_MAIL = `${process.env.SENDER_EMAIL_ADDRESS}`;
const PASSWORD = `${process.env.PASSWORD}`;

const contactEmail = async (from: string, name: string, txt: string) => {
  const oAuth2CLient = new OAuth2Client(
    CLIENT_ID,
    CLIENT_SECRET,
    OAUTH_PLAYGROUND
  );
  oAuth2CLient.setCredentials({ refresh_token: REFRESH_TOKEN });
  try {
    const access_token = await oAuth2CLient.getAccessToken();
    console.log(access_token)
    const transport = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: SENDER_MAIL,
        pass: PASSWORD,
        clientId: CLIENT_ID,
        clientSecret: CLIENT_SECRET,
        refreshToken: REFRESH_TOKEN,
        access_token,
        
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    const mailOptions = {
      from: SENDER_MAIL,
      to: from,
      subject: "NITH: Placement & Training Query",
      html: `<div style="max-width: 700px; margin:auto; border: 10px solid #ddd; padding: 50px 20px; font-size: 110%;">
            <h2 style="text-align: center; text-transform: uppercase;color: teal;">NITH Placement Hub.</h2>
            <p>${name}(${from}) has sent a message for the Placement and Training cell.
            </p>
            
            
            <p>${txt}</p>
        
            
            </div>`,
    };

    const result = await transport.sendMail(mailOptions);
    return result;
  } catch (err) {
    console.log(err);
  }
};

export default contactEmail;
