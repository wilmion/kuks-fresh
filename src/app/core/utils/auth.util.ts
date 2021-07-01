import { IUser } from '@core/models/interfaces';

//Verifica si esta authenticado o no el usuario
export const validate_is_auth = (user: IUser): boolean =>
  user.city !== 'NotDefined' &&
  user.country !== 'NotDefined' &&
  user.direction !== 'NotDefined' &&
  user.dni !== 'NotDefined' &&
  user.phoneNumber !== 'NotDefined' &&
  user.houseNumber !== 'NotDefined';

//Crea un usuario
export const createUser = (
  name: string,
  email: string,
  password?: string
): IUser => {
  const user: IUser = {
    name,
    email,
    job: 'Not Defined',
    admin: false,
    image:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d2/Crystal_Clear_kdm_user_female.svg/1200px-Crystal_Clear_kdm_user_female.svg.png',
    city: 'Not Defined',
    country: 'Not Defined',
    direction: 'Not Defined',
    dni: 'Not Defined',
    phoneNumber: 'Not Defined',
    houseNumber: 'Not Defined',
    shedules: [],
  };

  if (password) {
    user.password = password;
  }

  return user;
};
