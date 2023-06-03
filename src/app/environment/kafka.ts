import { z } from "zod";

import { isLocal } from "./isEnvironment";

export type Mechanism = "scram-sha-512" | "plain"

export const kafkaConfig = {
  KAFKA_BROKER_LIST: z.string(),
  KAFKA_CONSUMER_GROUP_ID: z.string().optional(),
};

export const kafkaConfigNonLocal = !isLocal
  ? {
    KAFKA_BROKER_USERNAME: z.string(),
    KAFKA_BROKER_PASSWORD: z.string(),
    KAFKA_BROKER_MECHANISM: z.literal("plain").or(z.literal("scram-sha-512")),
    KAFKA_BROKER_SSL: z.literal("true").or(z.literal("false"))
  }
  : undefined;

export const kafkaTopics = {
  TOPIC_PRODUCT_CREATED: z.string(),
};
