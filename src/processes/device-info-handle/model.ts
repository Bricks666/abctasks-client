import { sample } from 'effector';
import { deviceInfoModel, pageModel } from '@/entities/page';

sample({
	clock: pageModel.loaded,
	target: deviceInfoModel.subscribeFx,
});
