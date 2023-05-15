import { Card, CardContent, Typography } from '@mui/material';
import * as React from 'react';
import { Comment } from '@/shared/api';
import { CommonProps } from '@/shared/types';

export interface TemplateCommentCardProps extends CommonProps, Comment {
	readonly actions?: React.ReactElement | null;
}

export const TemplateCommentCard: React.FC<TemplateCommentCardProps> = (
	props
) => {
	const { content, className, } = props;

	return (
		<Card className={className}>
			<CardContent>
				<Typography>{content}</Typography>
			</CardContent>
		</Card>
	);
};
