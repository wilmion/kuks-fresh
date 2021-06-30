import { IUser } from '@core/models/interfaces';

//Verifica si esta authenticado o no el usuario
export const validate_is_auth = (user: IUser): boolean =>
  user.city === 'NotDefined' ||
  user.country === 'NotDefined' ||
  user.direction === 'NotDefined' ||
  user.dni === 'NotDefined' ||
  user.phoneNumber === 'NotDefined' ||
  user.houseNumber === 'NotDefined';
