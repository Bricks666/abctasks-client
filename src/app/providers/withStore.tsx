import { reatomContext } from '@reatom/npm-react';
import { ComponentType } from 'react';

import { ctx } from '@/shared/configs';

export const withStore =
	(Component: ComponentType): ComponentType =>
		() => {
			return (
				<reatomContext.Provider value={ctx}>
					<Component />
				</reatomContext.Provider>
			);
		};
