import FakeAppointmentRepository from '../repositories/fake/FakeAppointmentsRepository';
import CreateAppointmentService from './CreateAppointmentService';

describe('CreateAppointment', () => {
  it('should be able to create a new Appointment', async () => {
    const faceAppointmentRepository = new FakeAppointmentRepository();
    const createAppointmentService = new CreateAppointmentService(
      faceAppointmentRepository,
    );

    const appointment = await createAppointmentService.execute({
      date: new Date(),
      provider_id: '123123',
    });

    expect(appointment).toHaveProperty('id');
    expect(appointment.provider_id).toBe('123123');
  });
});
