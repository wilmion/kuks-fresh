import { IUser, IScheduleData, IOrder } from '@core/models/interfaces';

//Obtiene un schedule de un usuario y lo convierte en ordén
export const getScheduleConvertToOrder = (
  user: IUser,
  schedule_id: string,
  user_id?: string
) => {
  const schedule = user.shedules.find(
    (s) => s._id === schedule_id
  ) as IScheduleData;

  return convertScheduleToOrder(schedule, user.name, user_id);
};

// Convierte un Schedule a una ordén
export const convertScheduleToOrder = (
  schedule: IScheduleData,
  user_name: string,
  user_id?: string
) => {
  const order: IOrder = {
    ...schedule,
    user_name,
  };

  if (user_id) order.user_id = user_id;
  return order;
};
