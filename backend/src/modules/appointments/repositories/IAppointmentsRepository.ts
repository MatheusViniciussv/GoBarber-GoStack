import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';
import ICreateAppointmentDTO from '../dtos/ICreateAppointmetDTO';
import IFindAllInMonthFromProviderDTO from '../dtos/IFindInMonthFromProviderDTO';

export default interface IAppointmentsRepository {
  create(data: ICreateAppointmentDTO): Promise<Appointment>;
  findByDate(date: Date): Promise<Appointment | undefined>;
  findAllInMonthFromProviders(
    data: IFindAllInMonthFromProviderDTO,
  ): Promise<Appointment[]>;
}
