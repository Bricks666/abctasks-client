import * as React from 'react';
import { Block } from '@/ui/Block';
import { Text } from '@/ui/Text';
import { CommonProps } from '@/interfaces/common';
import { UpdateProfileForm } from './UpdateProfileForm';
import { useProfileLoading } from '@/hooks';
import { LoadingWrapper } from '@/components/LoadingWrapper';
import { LoadingIndicator } from '@/components/LoadingIndicator';

export const UpdateProfile: React.FC<CommonProps> = ({ className }) => {
	const isLoading = useProfileLoading();
	return (
		<LoadingWrapper
			isLoading={isLoading}
			loadingIndicator={<LoadingIndicator />}>
			<Block className={className}>
				<Text component='h3'>Profile</Text>
				<UpdateProfileForm />
			</Block>
		</LoadingWrapper>
	);
};
