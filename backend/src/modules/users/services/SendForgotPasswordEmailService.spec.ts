import AppError from '@shared/errors/AppError';

import FakeMailProvider from '@shared/container/providers/MailProvider/fake/FakeMailProvider';
import FakeUserRepository from '../repositories/fake/FakeUserRepository';

import SendForgotPasswordEmailService from './SendForgotPasswordEmailService';

describe('SendForgotPasswordEmail', () => {
  it('should be able to recover the password using the email', async () => {
    const fakeUserRepository = new FakeUserRepository();
    const fakeMailProvider = new FakeMailProvider();

    const sendMail = jest.spyOn(fakeMailProvider, 'sendMail');

    const sendForgotEmail = new SendForgotPasswordEmailService(
      fakeUserRepository,
      fakeMailProvider,
    );

    await fakeUserRepository.create({
      email: 'johndoe@exemple.com',
      name: 'John Doe',
      password: '123456',
    });

    await sendForgotEmail.execute({
      email: 'johndoe@exemple.com',
    });

    expect(sendMail).toHaveBeenCalled();
  });
});
