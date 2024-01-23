import { useUnit } from 'effector-react';

import { colorSchemeModel } from '@/shared/models';

export const useToggleColorScheme = () => {
	const [scheme, changeScheme] = useUnit([
		colorSchemeModel.$scheme,
		colorSchemeModel.colorSchemeChanged
	]);

	return [scheme, changeScheme] as const;
};
