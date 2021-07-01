import { IMapNavigation } from '@core/models/interfaces';

export const mapNavigation: IMapNavigation[] = [
  {
    icon: 'far fa-user',
    text: 'My Profile',
    param: 'profile',
  },
  {
    icon: 'fas fa-mug-hot',
    text: 'Your Items',
    param: 'items',
  },
  {
    icon: 'fas fa-shipping-fast',
    text: 'Your Order',
    param: 'orders',
  },
  {
    icon: 'far fa-handshake',
    text: 'Payment Method',
    param: 'payments',
  },
];
