"use server";

import { z } from "zod";
import { getServerConfig } from "../config.server";

const schema = z.object({ name: z.string().min(1) });

export async function getGreeting(data: { name: string }) {
  const parsed = schema.parse(data);
  const config = getServerConfig();
  return {
    greeting: `Hello, ${parsed.name}!`,
    mode: config.nodeEnv ?? "unknown",
  };
}
