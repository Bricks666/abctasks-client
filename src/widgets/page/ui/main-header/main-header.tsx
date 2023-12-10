import * as React from 'react';

import { ProfileMenu } from '@/features/auth';
import { AdaptiveColorSchemeToggler, ChangeLanguage } from '@/features/page';

import { CommonProps } from '@/shared/types';
import { TemplateHeader, TemplateHeaderProps } from '@/shared/ui';

import { Menu } from '../menu';


export interface MainHeaderProps extends CommonProps, TemplateHeaderProps {}

export const MainHeader: React.FC<MainHeaderProps> = (props) => {
	const { className, slots, } = props;

	return (
		<TemplateHeader
			className={className}
			slots={{
				...slots,
				left: (
					<>
						<Menu />
						{slots?.left}
					</>
				),
				right: (
					<>
						{slots?.right}
						<ChangeLanguage />
						<AdaptiveColorSchemeToggler />
						<ProfileMenu />
					</>
				),
			}}
		/>
	);
};
