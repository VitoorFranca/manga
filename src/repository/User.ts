import { DataSource, Repository } from "typeorm";

import { init as InitLogger, Logger } from "app/logger";
import { User } from "domain/entity/User";
import { init as InitDatabase } from "driver/database/postgres";

export class UserRepository {
  private logger: Logger;
  private dbWrite: Repository<User>;
  private dbRead: Repository<User>;

  constructor({
    dbWrite,
    dbRead,
    logger,
  }: {
    dbWrite: DataSource;
    dbRead: DataSource;
    logger: Logger;
  }) {
    this.dbWrite = dbWrite.getRepository(User);
    this.dbRead = dbRead.getRepository(User);
    this.logger = logger;
  }

  list (id: number) {
    this.logger.info("listing");
    return this.dbRead.find({ where: {
        id
    } });
    
  }
  create (user: User) {
    this.logger.info("creating");

    return this.dbWrite.create(user);
  }
}

export const init = () => {
  const { connectionWrite: dbWrite, connectionRead: dbRead } = InitDatabase();
  const logger = InitLogger();

  return new UserRepository({
    dbWrite,
    dbRead,
    logger
});
};

export default init;
