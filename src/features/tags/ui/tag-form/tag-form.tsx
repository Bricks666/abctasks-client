import { Button } from '@mui/material';
import cn from 'classnames';
import { useForm } from 'effector-forms';
import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { TagLabel } from '@/entities/tags';
import { useSubmit } from '@/shared/lib';
import { CommonProps } from '@/shared/types';
import { Field } from '@/shared/ui';
import { tagFormModel } from '../../model';

import styles from './tag-form.module.css';

export interface TagFormProps extends CommonProps {
	readonly buttonText: string;
}

export const TagForm: React.FC<TagFormProps> = (props) => {
	const { className, buttonText, } = props;
	const { t, } = useTranslation('popups');
	const { fields, submit, values, isDirty, } = useForm(tagFormModel.form);

	const { name, mainColor, secondColor, } = fields;

	const onSubmit = useSubmit(submit);

	return (
		<form className={cn(styles.form, className)} onSubmit={onSubmit}>
			<TagLabel {...values} />
			<Field
				className={styles.input}
				value={name.value}
				onChange={name.onChange}
				onBlur={name.onBlur}
				helperText={name.errorText()}
				isValid={name.isValid}
				name={name.name}
				label={t('group.name')}
			/>
			<Field
				value={mainColor.value}
				onChange={mainColor.onChange}
				onBlur={mainColor.onBlur}
				helperText={mainColor.errorText()}
				isValid={mainColor.isValid}
				name={mainColor.name}
				label={t('group.mainColor')}
				type='color'
			/>
			<Field
				value={secondColor.value}
				onChange={secondColor.onChange}
				onBlur={secondColor.onBlur}
				helperText={secondColor.errorText()}
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
