import { Action } from './actions';

export interface ActionsSchema {
   actionItems?: Action[];
   isLoadingActions?: boolean;
   error?: string;
}
