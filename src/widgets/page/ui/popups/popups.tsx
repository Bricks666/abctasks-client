import { useUnit } from 'effector-react';
import * as React from 'react';

import { popupsModel } from '@/shared/models';
import { BasePopupProps, CommonProps } from '@/shared/types';

export interface PopupsProps extends CommonProps {
	readonly popupMap: Record<string, React.ComponentType<BasePopupProps>>;
}

export const Popups: React.FC<PopupsProps> = (props) => {
	const { popupMap, className, } = props;
	const { mountedPopups, popups, } = useUnit({
		mountedPopups: popupsModel.$mountedPopups,
		popups: popupsModel.$popups,
	});
	return (
		<>
			{mountedPopups.map((popup) => {
				const Component = popupMap[popup];

				if (!Component) {
					return null;
				}

				return (
					<Component
						className={className}
						isOpen={popups.includes(popup)}
						key={popup}
					/>
				);
			})}
		</>
	);
};
