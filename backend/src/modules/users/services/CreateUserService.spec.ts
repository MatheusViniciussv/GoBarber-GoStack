// import AppError from '@shared/errors/AppError';
import AppError from '@shared/errors/AppError';
import FakeUserRepository from '../repositories/fake/FakeUserRepository';
import CreateUserService from './CreateUserService';

describe('CreateUser', () => {
  it('should be able to create a new User', async () => {
    const faceUserRepository = new FakeUserRepository();
    const createUserService = new CreateUserService(faceUserRepository);

    const user = await createUserService.execute({
      name: 'John Doe',
      email: 'johndoe@exemple.com',
      password: '123456',
    });

    expect(user).toHaveProperty('id');
  });

  it('should not be able to create a new user with same email', async () => {
    const faceUserRepository = new FakeUserRepository();
    const createUserService = new CreateUserService(faceUserRepository);

    await createUserService.execute({
      name: 'John Doe',
      email: 'johndoe@exemple.com',
      password: '123456',
    });

    expect(
      createUserService.execute({
        name: 'John Doe',
        email: 'johndoe@exemple.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
