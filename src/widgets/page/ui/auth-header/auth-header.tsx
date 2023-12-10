import * as React from 'react';

import { AdaptiveColorSchemeToggler, ChangeLanguage } from '@/features/page';

import { CommonProps } from '@/shared/types';
import { TemplateHeader } from '@/shared/ui';

export interface AuthHeaderProps extends CommonProps {}

export const AuthHeader: React.FC<AuthHeaderProps> = (props) => {
	const { className, } = props;

	return (
		<TemplateHeader
			className={className}
			slots={{
				right: (
					<>
						<ChangeLanguage />
						<AdaptiveColorSchemeToggler />
					</>
				),
			}}
		/>
	);
};
