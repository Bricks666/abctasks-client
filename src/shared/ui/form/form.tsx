import { Paper, PaperProps } from '@mui/material';
import cn from 'classnames';
import * as React from 'react';

import styles from './form.module.css';

export type FormProps = PaperProps<'form'>;

export const Form: React.FC<FormProps> = (props) => {
	const { className, children, ...rest } = props;

	return (
		<Paper className={cn(styles.form, className)} {...rest} component='form'>
			{children}
		</Paper>
	);
};
