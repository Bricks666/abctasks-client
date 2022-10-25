/* eslint-disable import/no-extraneous-dependencies */
import { createDomain } from 'effector-logger';
import { createGate } from 'effector-react';
import { StandardResponse, InRoomRequest } from '@/types';
import { Progress } from './types';
import { StandardFailError } from '@/packages/request';

export const ProgressDomain = createDomain('ProgressDomain');

export const getProgressFx = ProgressDomain.effect<
	number,
	StandardResponse<Progress[]>,
	StandardFailError
>('getProgressFx');

export const progressGate = createGate<InRoomRequest>({
	domain: ProgressDomain,
	name: 'progressGate',
});
