import { Button } from '@mui/material';
import { useAction, useAtom } from '@reatom/npm-react';
import cn from 'classnames';
import { FC, memo } from 'react';
import { useTranslation } from 'react-i18next';

import { FieldAtom } from '@reatom/form';

import { MAX_SHORT_LENGTH, MIN_LENGTH } from '@/shared/configs';
import { usePreventDefault } from '@/shared/lib';
import { CommonProps } from '@/shared/types';
import { Checkbox, Field, Form, PasswordField } from '@/shared/ui';

import { useLogin } from '../../lib';

import styles from './styles.module.css';

export interface LoginFormProps extends CommonProps {}

export const LoginForm: FC<LoginFormProps> = memo((props) => {
	const { className, } = props;

	const { t, } = useTranslation('login');

	const model = useLogin();
	const submit = useAction(model.submit);
	const onSubmit = usePreventDefault(submit);

	const submitT = t('login_form.submit');
	const titleT = t('login_form.title');

	return (
		<Form
			className={cn(styles.form, className)}
			onSubmit={onSubmit}
			aria-label={titleT}>
			<Email field={model.email} />
			<Password field={model.password} />
			<RememberMe field={model.rememberMe} />
			<Button type='submit'>{submitT}</Button>
		</Form>
	);
});

interface FieldProps {
	readonly field: FieldAtom;
}

const Email: FC<FieldProps> = memo((props) => {
	const { field, } = props;

	const [value] = useAtom(field.value);
	const [error] = useAtom((ctx) => ctx.spy(field.validation).error);
	const change = useAction(field.change);
	const focus = useAction(field.focus.in);
	const blur = useAction(field.focus.out);
	const { t, } = useTranslation('login', { keyPrefix: 'login_form', });

	const labelT = t('fields.email');
	const errorT = t(`errors.email.${error}`, {
		min_symbols_count: MIN_LENGTH,
		max_symbols_count: MAX_SHORT_LENGTH,
	});

	const isError = !!error;
	const errorHelperText = isError ? errorT : null;

	return (
		<Field
			className={styles.field}
			value={value}
			onChange={change}
			onFocus={focus}
			onBlur={blur}
			helperText={errorHelperText}
			isError={isError}
			name='email'
			label={labelT}
		/>
	);
});

const Password: FC<FieldProps> = memo((props) => {
	const { field, } = props;

	const [value] = useAtom(field.value);
	const [error] = useAtom((ctx) => ctx.spy(field.validation).error);
	const change = useAction(field.change);
	const focus = useAction(field.focus.in);
	const blur = useAction(field.focus.out);
	const { t, } = useTranslation('login', { keyPrefix: 'login_form', });

	const labelT = t('fields.password');
	const errorT = t(`errors.password.${error}`, {
		min_symbols_count: MIN_LENGTH,
		max_symbols_count: MAX_SHORT_LENGTH,
	});

	const isError = !!error;
	const errorHelperText = isError ? errorT : null;

	return (
		<PasswordField
			className={styles.field}
			value={value}
			onChange={change}
			onFocus={focus}
			onBlur={blur}
			helperText={errorHelperText}
			isError={isError}
			name='password'
			label={labelT}
		/>
	);
});

const RememberMe: FC<FieldProps> = memo((props) => {
	const { field, } = props;

	const [value] = useAtom(field.value);
	const change = useAction(field.change);
	const { t, } = useTranslation('login', { keyPrefix: 'login_form', });

	const labelT = t('fields.remember_me');

	return (
		<Checkbox
			className={styles.field}
			value={value}
			onChange={change}
			name='rememberMe'
			label={labelT}
		/>
	);
});
