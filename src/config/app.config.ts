interface AppConfig {
  GOOGLE_CLIENT_SECRET: string;
  GOOGLE_CLIENT_ID: string;
  DOMAIN: string;
  API_KEY: string;
  SENDPULSE_EVENTS_URL: string;
  SENDPULSE_API_URL: string;
  SENDPULSE_CLIENT_ID: string;
  SENDPULSE_CLIENT_SECRET: string;
}

export const appConfig: AppConfig = {
  GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID as string,
  GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET as string,
  DOMAIN: process.env.PUBLIC_DOMAIN as string,
  API_KEY: process.env.API_KEY as string,
  SENDPULSE_EVENTS_URL: process.env.SENDPULSE_EVENTS_URL as string,
  SENDPULSE_API_URL: process.env.SENDPULSE_API_URL as string,
  SENDPULSE_CLIENT_ID: process.env.SENDPULSE_CLIENT_ID as string,
  SENDPULSE_CLIENT_SECRET: process.env.SENDPULSE_CLIENT_SECRET as string,
};