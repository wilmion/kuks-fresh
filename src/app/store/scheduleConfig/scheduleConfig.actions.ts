import { createAction , props} from '@ngrx/store';

import { IScheduleConfigDay } from '../../core/models/interfaces';

export const setConfigs = createAction('SET_CONFIG', props<{configs:IScheduleConfigDay[]}>())
