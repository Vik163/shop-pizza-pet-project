import { buildSelector } from '@/shared/lib/store';
import { UserParameters } from '../types/userParameters';

const defaultUserParameters: UserParameters = {}; // 15_5 20.40min

// 15_5
export const [useUserParameters, getUserParameters] = buildSelector(
   (state) => state.user?.authData?.userParameters ?? defaultUserParameters,
);
