/* eslint-disable import/no-extraneous-dependencies */
import { createDomain } from 'effector';
import { createGate } from 'effector-react';
import { StandardFailError } from '@/shared/packages';
import { StandardResponse, InRoomRequest } from '@/shared/types';
import { Progress } from './types';

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
