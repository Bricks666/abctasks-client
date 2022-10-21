/* eslint-disable import/no-extraneous-dependencies */
import { createDomain } from 'effector-logger';
import { StandardResponse } from '@/types/response';
import { Progress } from './types';
import { StandardFailError } from '@/packages/request';

export const ProgressDomain = createDomain('ProgressDomain');

export const getProgressFx = ProgressDomain.effect<
	number,
	StandardResponse<Progress[]>,
	StandardFailError
>('getProgressFx');
