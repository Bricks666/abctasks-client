// eslint-disable-next-line import/no-extraneous-dependencies
import { createRouterControls } from 'atomic-router';
import { createDomain } from 'effector';
import { TaskStatus } from '../../models/tasks';
import { Location } from './types';

export const QueriesDomain = createDomain();

export const controls = createRouterControls();

export const $popups = QueriesDomain.store<string>('');
export const $roomId = QueriesDomain.store<null | number>(null);
export const $taskId = QueriesDomain.store<null | number>(null);
export const $groupId = QueriesDomain.store<null | number>(null);
export const $taskStatus = QueriesDomain.store<null | TaskStatus>(null);
export const $location = QueriesDomain.store<Location>({
	path: '/rooms',
	query: {},
});

export const removePopup = QueriesDomain.event<string>();
export const closeUpdateRoomPopup = QueriesDomain.event();
export const closeCreateRoomPopup = QueriesDomain.event();
export const closeCreateTaskPopup = QueriesDomain.event();
export const closeUpdateTaskPopup = QueriesDomain.event();
export const closeCreateGroupPopup = QueriesDomain.event();
export const closeUpdateGroupPopup = QueriesDomain.event();
export const setState = QueriesDomain.event<Location>();
export const saveCurrentLocation = QueriesDomain.event();
export const goToState = QueriesDomain.event();
