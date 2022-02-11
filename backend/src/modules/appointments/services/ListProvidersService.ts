import { inject, injectable } from 'tsyringe';

import User from '@modules/users/infra/typeorm/entities/User';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';

interface IRequest {
  user_id: string;
}

@injectable()
class ListProviderService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('CacheProvider')
    private cachProvider: ICacheProvider,
  ) {}

  public async execute({ user_id }: IRequest): Promise<User[]> {
    let users = await this.cachProvider.recover<User[]>(
      `providers-list:${user_id}`,
    );

    if (!users) {
      users = await this.usersRepository.findAllProviders({
        except_user_id: user_id,
      });

      console.log('opa');

      await this.cachProvider.save(`providers-list:${user_id}`, users);
    }

    return users;
  }
}

export default ListProviderService;
