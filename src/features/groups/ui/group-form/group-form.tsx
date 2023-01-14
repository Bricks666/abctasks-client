import { Button } from '@mui/material';
import cn from 'classnames';
import { useForm } from 'effector-forms';
import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { GroupLabel } from '@/entities/groups';
import { CommonProps } from '@/shared/types';
import { Field } from '@/shared/ui';
import { groupFormModel } from '../../model';

import styles from './group-form.module.css';

export interface GroupFormProps extends CommonProps {
	readonly buttonText: string;
}

export const GroupForm: React.FC<GroupFormProps> = (props) => {
	const { className, buttonText, } = props;
	const { t, } = useTranslation('popups');
	const { fields, submit, values, isDirty, } = useForm(groupFormModel.form);

	const { name, mainColor, secondColor, } = fields;

	const onSubmit: React.FormEventHandler = (e) => {
		e.preventDefault();
		submit();
	};

	return (
		<form className={cn(styles.form, className)} onSubmit={onSubmit}>
			{/*
        TODO: Подумать над тем, как должен выглядеть лейбл
        */}
			<GroupLabel {...values} />
			<Field
				className={styles.input}
				value={name.value}
				onChange={name.onChange}
				onBlur={name.onBlur}
				errorText={name.errorText()}
				isValid={name.isValid}
				name={name.name}
				label={t('group.name')}
			/>
			<Field
				value={mainColor.value}
				onChange={mainColor.onChange}
				onBlur={mainColor.onBlur}
				errorText={mainColor.errorText()}
				isValid={mainColor.isValid}
				name={mainColor.name}
				label={t('group.mainColor')}
				type='color'
			/>
			<Field
				value={secondColor.value}
				onChange={secondColor.onChange}
				onBlur={secondColor.onBlur}
				errorText={secondColor.errorText()}
				isValid={secondColor.isValid}
				name={secondColor.name}
				label={t('group.secondaryColor')}
				type='color'
			/>
			<Button className={styles.button} disabled={!isDirty} type='submit'>
				{buttonText}
			</Button>
		</form>
	);
};
