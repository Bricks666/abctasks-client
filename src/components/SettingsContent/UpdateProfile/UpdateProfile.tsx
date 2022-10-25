import * as React from 'react';
import { Block } from '@/ui/Block';
import { Text } from '@/ui/Text';
import { CommonProps } from '@/types';
import { UpdateProfileForm } from './UpdateProfileForm';
import { LoadingWrapper } from '@/ui/LoadingWrapper';
import { LoadingIndicator } from '@/ui/LoadingIndicator';

export const UpdateProfile: React.FC<CommonProps> = ({ className }) => {
	return (
		<LoadingWrapper isLoading loadingIndicator={<LoadingIndicator />}>
			<Block className={className}>
				<Text component='h3'>Profile</Text>
				<UpdateProfileForm />
			</Block>
		</LoadingWrapper>
	);
};
