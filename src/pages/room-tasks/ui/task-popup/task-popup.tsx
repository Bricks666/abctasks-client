import { Button } from '@mui/material';
import * as React from 'react';

import { BasePopupProps } from '@/shared/types';
import { MainPopup } from '@/shared/ui';

export interface TaskPopupProps extends BasePopupProps {}

export const TaskPopup: React.FC<TaskPopupProps> = (props) => {
	const { isOpen, } = props;

	return (
		<MainPopup isOpen={isOpen} onClose={console.log} title='Task' maxWidth='md'>
			Task
			<Button>Edit</Button>
			<Button>Write comment</Button>
			Comments
		</MainPopup>
	);
};
