import { MembersModel, membersModel } from '../models';

export interface UseMembersModelParams {
	readonly roomId: number;
}

export const useMembersModel = (
	params: UseMembersModelParams
): MembersModel => {
	return membersModel.create(params);
};
