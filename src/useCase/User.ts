import { User } from "domain/entity/User";
import { UserRepository, init as InitUserRepository } from "repository/User";
import { init as InitTypicodeService, TypicodeService } from "service/Typicode";

export class UserUseCase {
  private userRepository: UserRepository;
  private typicodeService: TypicodeService;

  constructor({
    userRepository,
    typicodeService,
  }: {
    userRepository: UserRepository;
    typicodeService: TypicodeService;
  }) {
    this.userRepository = userRepository;
    this.typicodeService = typicodeService;
  }

  public getTodos = async (): Promise<any> => {
    return this.typicodeService.getTodos();
  };

  public create = (user: User) => {
    return this.userRepository.create(user);
  }
}

export const init = () => {
  const userRepository = InitUserRepository();
  const typicodeService = InitTypicodeService();

  return new UserUseCase({
    userRepository,
    typicodeService,
  });
};

export default init;
