// import AppError from '@shared/errors/AppError';

import FakeUserRepository from '@modules/users/repositories/fake/FakeUserRepository';
import FakeCachProvider from '@shared/container/providers/CacheProvider/fake/FakeCacheProvider';

import ListProvidersService from './ListProvidersService';

let fakeUserRepository: FakeUserRepository;
let listProvider: ListProvidersService;
let fakeCachProvider: FakeCachProvider;

describe('ListProviders', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUserRepository();
    fakeCachProvider = new FakeCachProvider();

    listProvider = new ListProvidersService(
      fakeUserRepository,
      fakeCachProvider,
    );
  });

  it('should be able to list the providers', async () => {
    const user = await fakeUserRepository.create({
      name: 'John Doe',
      email: 'johndoe@exemple.com',
      password: '123456',
    });

    const user2 = await fakeUserRepository.create({
      name: 'John 2',
      email: 'john2@exemple.com',
      password: '123456',
    });

    const loggedUser = await fakeUserRepository.create({
      name: 'John 3',
      email: 'john3@exemple.com',
      password: '123456',
    });

    const providers = await listProvider.execute({
      user_id: loggedUser.id,
    });

    expect(providers).toEqual([user, user2]);
  });
});
