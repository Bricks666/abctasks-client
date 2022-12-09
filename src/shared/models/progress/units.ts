/* eslint-disable import/no-extraneous-dependencies */
import { createDomain } from 'effector';
import { createGate } from 'effector-react';
import { Progress } from './types';
import { StandardFailError } from '@/packages';
import { StandardResponse, InRoomRequest } from '@/types';

export const ProgressDomain = createDomain('ProgressDomain');

export const getProgressFx = ProgressDomain.effect<
	number,
	StandardResponse<Progress[]>,
	StandardFailError
>('getProgressFx');

export const ProgressGate = createGate<InRoomRequest>({
	domain: ProgressDomain,
	name: 'progressGate',
});
