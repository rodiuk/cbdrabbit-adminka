"use server";

import * as ftp from "basic-ftp";
import { nanoid } from "nanoid";
import { Readable } from "stream";

const client = new ftp.Client();

export const uploadMedia = async (base64: string, originalFileName: string) => {
  try {
    await client.access({
      host: "testracknerd.linksite.cc",
      user: "hello@files.cbdrabbit.shop",
      password: "eqVFW3bD@G0z",
      secure: true,
      secureOptions: { rejectUnauthorized: false },
    });

    const buffer = Buffer.from(base64, "base64");

    const mediaPath = `/uploads/${nanoid()}_${originalFileName}`;

    const readableStream = Readable.from(buffer);

    await client.uploadFrom(readableStream, mediaPath);
    console.log(`File uploaded to ${mediaPath}`);

    return { mediaPath };
  } catch (error) {
    console.error(error);
  }
};

export const deleteMedia = async (mediaPath: string) => {
  try {
    await client.access({
      host: "testracknerd.linksite.cc",
      user: "hello@files.cbdrabbit.shop",
      password: "eqVFW3bD@G0z",
      secure: true,
      secureOptions: { rejectUnauthorized: false },
    });

    const fileExists = await client.size(mediaPath);

    if (!fileExists) return { mediaPath };

    await client.remove(mediaPath);
    console.log(`File removed ${mediaPath}`);

    return true;
  } catch (error) {
    console.error(error);
  }
};
