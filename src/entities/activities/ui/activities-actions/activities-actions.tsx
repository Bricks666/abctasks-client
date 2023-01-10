import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { ToggleButton } from '@mui/material';
import * as React from 'react';
import { ActivityAction } from '@/shared/api';
import { CommonProps } from '@/shared/types';
import { ControlledToggleButtonGroup } from '@/shared/ui';

export interface ActivitiesActionsProps extends CommonProps {
	readonly value: ActivityAction | null;
	readonly onChange: (actions: ActivityAction | null) => void;
	readonly label: string;
	readonly helperText?: string;
	readonly error?: boolean;
	readonly disabled?: boolean;
	readonly fullWidth?: boolean;
}

export const ActivitiesActions: React.FC<ActivitiesActionsProps> = React.memo(
	(props) => {
		return (
			<ControlledToggleButtonGroup {...props} color='primary' exclusive>
				<ToggleButton value='create'>
					<AddIcon />
				</ToggleButton>
				<ToggleButton value='update'>
					<EditIcon />
				</ToggleButton>
				<ToggleButton value='remove'>
					<DeleteIcon />
				</ToggleButton>
			</ControlledToggleButtonGroup>
		);
	}
);
