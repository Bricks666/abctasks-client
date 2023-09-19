import { Typography } from '@mui/material';
import * as React from 'react';
import { useTranslation } from 'react-i18next';

import { Header } from '@/widgets/page';

import { RoomsHeaderActions } from '@/features/rooms';

import { CommonProps } from '@/shared/types';

export const RoomsHeader: React.FC<CommonProps> = (props) => {
	const { className, } = props;
	const { t, } = useTranslation('rooms');
	return (
		<Header
			className={className}
			slots={{
				left: (
					<Typography variant='h5' component='h1'>
						{t('title')}
					</Typography>
				),
				right: <RoomsHeaderActions />,
			}}
		/>
	);
};
