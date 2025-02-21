import { ScopeProvider } from 'bunshi/react';
import { FC, PropsWithChildren } from 'react';

import { RoomId, roomModel } from '../models';

export interface RoomScopeProviderProps extends Required<PropsWithChildren> {
	readonly roomId: RoomId;
}

export const RoomScopeProvider: FC<RoomScopeProviderProps> = (
	props: RoomScopeProviderProps
) => {
	const { children, roomId, } = props;

	return (
		<ScopeProvider scope={roomModel.Scope} value={roomId}>
			{children}
		</ScopeProvider>
	);
};
