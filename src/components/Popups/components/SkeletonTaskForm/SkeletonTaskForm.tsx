import * as React from 'react';
import { Box, Skeleton } from '@mui/material';
import { CommonProps } from '@/types';
import { buttonSx, fieldSx, formSx, selectSx } from './styles';

export interface SkeletonTaskFormProps extends CommonProps {}

export const SkeletonTaskForm: React.FC<SkeletonTaskFormProps> = React.memo(
	function SkeletonTaskForm(props) {
		const { className } = props;
		return (
			<Box className={className} sx={formSx}>
				<Skeleton sx={selectSx} />
				<Skeleton sx={selectSx} />
				<Skeleton sx={fieldSx} />
				<Skeleton sx={buttonSx} />
			</Box>
		);
	}
);
