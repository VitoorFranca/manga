import "reflect-metadata";

// eslint-disable-next-line import-helpers/order-imports
import * as dotenv from "dotenv";
// eslint-disable-next-line node/no-process-env
dotenv.config({ path: process.env["DOTENV_PATH"] || undefined });

// eslint-disable-next-line @typescript-eslint/no-var-requires
// require("elastic-apm-node").start({
//   // eslint-disable-next-line node/no-process-env
//   active: process.env["NODE_ENV"] === "production",
// });

import fastifyMetrics from "fastify-metrics";

import { environment } from "app/environment";
import { init as InitLogger, Logger } from "app/logger";
import signal from "app/signal";
import api from "delivery/api";
import { initialize } from "driver/database/postgres";
import fastifyInit from "driver/http/fastify";

let log: Logger;

/**
 * Main application execution
 * @async
 */
const main = async () => {
  try {
    log.info(`NODE_ENV is set to ${environment.NODE_ENV}`);

    // Initialize
    // const kafkaInstance = await kafka.init();
    // await worker.initConsumers(kafkaInstance);

    await initialize();

    // Http Server
    fastifyInit
      .create()
      .then(({ router }) => {
        // Initialize API Rest
        api.init(router);
        // Initialize Prometheus Metrics Exporter
        router.register(fastifyMetrics, {
          endpoint: "/metrics",
          enableDefaultMetrics: true,
          blacklist: ["/metrics"],
          enableRouteMetrics: true,
        });
        // Apply callbacks
        process.on("SIGTERM", signal.shutdown);
        process.on("SIGINT", signal.shutdown);

        log.info("gonna listen");
        // Listen
        router
          .listen(environment.SERVER_PORT || 2999, environment.SERVER_HOST || "0.0.0.0")
          .then((startUrl) => {
            log.info(`API started on ${startUrl}`);
          });
      })
      .catch((e) => {
        log.error(e.message);
        process.exit(1);
      });
  } catch (e) {
    log.error(e);
    process.exit(1);
  }
};

/**
 * Start application
 * @async
 */
const run = () => {
  log = InitLogger();
  main();
};

// Start
run();
