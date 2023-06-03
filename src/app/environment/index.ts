import { z } from "zod";

import { databaseConfig } from "./database";
import { kafkaConfig, kafkaConfigNonLocal, kafkaTopics } from "./kafka";
import { logging } from "./logging";

const environmentVariablesSchema = z.object({
  NODE_ENV: z
    .literal("local")
    .or(z.literal("development"))
    .or(z.literal("staging"))
    .or(z.literal("production")),
  SERVER_PORT: z.number().or(z.string()).optional(),
  SERVER_HOST: z.string().optional(),
  ...logging,
  ...kafkaConfig,
  ...kafkaConfigNonLocal,
  ...kafkaTopics,
  ...databaseConfig,
});

// eslint-disable-next-line node/no-process-env
const parsedEnvironmentVariables = environmentVariablesSchema.safeParse(process.env);

if (!parsedEnvironmentVariables.success) {
  console.error("Missing or invalid environment variables:");

  parsedEnvironmentVariables.error.issues.forEach((issue) =>
    console.error(`${issue.path[0]}: ${issue.message}`),
  );

  throw new Error("Missing or invalid environment variables");
}

export const environment = parsedEnvironmentVariables.data;
