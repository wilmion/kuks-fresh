import { createReducer , on , Action } from '@ngrx/store';

import { setConfigs } from './scheduleConfig.actions';

import { IScheduleConfigDay } from '../../core/models/interfaces';

const scheduleConfigsState:IScheduleConfigDay[] = [];

const _scheduleConfigReducer = createReducer(
    scheduleConfigsState ,
    on(setConfigs , (state , { configs }) => configs)
)

export const scheduleConfigReducer = (state:IScheduleConfigDay[] | undefined , action:Action) => _scheduleConfigReducer(state , action);