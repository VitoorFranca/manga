import { DataSource } from "typeorm";
import { SnakeNamingStrategy } from "typeorm-naming-strategies";

import { environment } from "app/environment";
import { User } from "domain/entity/User";

const entities = [User];

const commonConfig = {
  port: 5432,
  entities,
  synchronize: true,
  logging: false,
  namingStrategy: new SnakeNamingStrategy(),
};

export const connectionWriteDataSource = new DataSource({
  type: "postgres",
  ...commonConfig,
  url: environment.DATABASE_URL,
});

export const connectionReadDataSource = new DataSource({
  type: "postgres",
  ...commonConfig,
  url: environment.DATABASE_URL_READ_REPLICA,
});

let connectionWrite: DataSource;
let connectionRead: DataSource;

export const initialize = async () => {
  if (connectionWrite) {
    throw new Error("DB write connection already initialized");
  }

  if (connectionRead) {
    throw new Error("DB read connection already initialized");
  }

  connectionWrite = await connectionWriteDataSource.initialize();
  connectionRead = await connectionReadDataSource.initialize();

  return { connectionWrite, connectionRead };
};

/**
 * Return existing connection for Database
 * @returns
 */
export const init = (): { connectionWrite: DataSource; connectionRead: DataSource } => {
  if (!connectionWrite || !connectionRead) {
    throw new Error("unable connection");
  }

  return { connectionWrite, connectionRead };
};
