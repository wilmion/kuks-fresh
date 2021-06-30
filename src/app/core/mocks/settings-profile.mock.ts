import { IUser } from '@core/models/interfaces';

export const buildSettingMock = (user: IUser) => [
  {
    title: 'Basic Information',
    configs: [
      {
        key: 'Name',
        keyObject: 'name',
        value: user.name,
        edit: false,
      },
      {
        key: 'Job',
        keyObject: 'job',
        value: user.job,
        edit: false,
      },
      {
        key: 'ImageUrl',
        keyObject: 'image',
        value: user.image,
        edit: false,
      },
    ],
  },
  {
    title: 'Delivery Information',
    configs: [
      {
        key: 'City',
        keyObject: 'city',
        value: user.city,
        edit: false,
      },
      {
        key: 'Country',
        keyObject: 'country',
        value: user.country,
        edit: false,
      },
      {
        key: 'Direction',
        keyObject: 'direction',
        value: user.direction,
        edit: false,
      },
      {
        key: 'DNI',
        keyObject: 'dni',
        value: user.dni,
        edit: false,
      },
      {
        key: 'Phone Number',
        keyObject: 'phoneNumber',
        value: user.phoneNumber,
        edit: false,
      },
      {
        key: 'House Number',
        keyObject: 'houseNumber',
        value: user.houseNumber,
        edit: false,
      },
    ],
  },
];
