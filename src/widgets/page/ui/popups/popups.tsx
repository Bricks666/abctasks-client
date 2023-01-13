import * as React from 'react';
import { usePopups } from '@/entities/popups';
import { BasePopupProps, CommonProps } from '@/shared/types';

export interface PopupsProps extends CommonProps {
	readonly popupMap: Record<string, React.ComponentType<BasePopupProps>>;
}

export const Popups: React.FC<PopupsProps> = (props) => {
	const { popupMap, className, } = props;
	const { mountedPopups, popups, } = usePopups();
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
