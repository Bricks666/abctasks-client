import { Paper, PaperProps } from '@mui/material';
import cn from 'classnames';
import * as React from 'react';

import styles from './form.module.css';

export const Form: React.FC<PaperProps<'form'>> = (props) => {
	const { className, children, ...rest } = props;

	return (
		<Paper className={cn(styles.form, className)} {...rest} component='form'>
			{children}
		</Paper>
	);
};
