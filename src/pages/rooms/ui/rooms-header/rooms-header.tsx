import { Typography } from '@mui/material';
import * as React from 'react';
import { useTranslation } from 'react-i18next';

import { MainHeader } from '@/widgets/page';

import { OpenCreateRoom } from '@/features/rooms';

import { CommonProps } from '@/shared/types';

export const RoomsHeader: React.FC<CommonProps> = (props) => {
	const { className, } = props;
	const { t, } = useTranslation('rooms');
	const title = t('title');

	return (
		<MainHeader
			className={className}
			slots={{
				left: (
					<Typography variant='h5' component='h1'>
						{title}
					</Typography>
				),
				right: <OpenCreateRoom />,
			}}
		/>
	);
};
