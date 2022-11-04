import * as React from 'react';
import { Typography } from '@mui/material';
import { CommonProps } from '@/types';
import { UpdateProfileForm } from './UpdateProfileForm';
import { LoadingWrapper } from '@/ui/LoadingWrapper';
import { LoadingIndicator } from '@/ui/LoadingIndicator';

export const UpdateProfile: React.FC<CommonProps> = ({ className }) => {
	return (
		<LoadingWrapper isLoading loadingIndicator={<LoadingIndicator />}>
			<section className={className}>
				<Typography component='h3'>Profile</Typography>
				<UpdateProfileForm />
			</section>
		</LoadingWrapper>
	);
};
