import { ToggleButton } from '@mui/material';
import * as React from 'react';
import { CommonProps } from '@/shared/types';
import { ControlledToggleButtonGroup } from '@/shared/ui';

export interface ActivitiesSpheresProps extends CommonProps {
	readonly value: string | null;
	readonly onChange: (actions: string | null) => void;
	readonly label: string;
	readonly helperText?: string;
	readonly error?: boolean;
	readonly disabled?: boolean;
	readonly fullWidth?: boolean;
}

export const ActivitiesSpheres: React.FC<ActivitiesSpheresProps> = React.memo(
	(props) => {
		return (
			<ControlledToggleButtonGroup {...props} color='primary' exclusive>
				<ToggleButton value='task'>Task</ToggleButton>
				<ToggleButton value='group'>Group</ToggleButton>
				<ToggleButton value='comment'>Comment</ToggleButton>
			</ControlledToggleButtonGroup>
		);
	}
);
