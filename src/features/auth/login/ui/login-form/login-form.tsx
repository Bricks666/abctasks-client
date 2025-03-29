import { Button } from '@mui/material';
import { reatomComponent } from '@reatom/npm-react';
import cn from 'classnames';
import type { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { MAX_SHORT_LENGTH, MIN_LENGTH } from '@/shared/configs';
import { usePreventDefault } from '@/shared/lib';
import { CommonProps } from '@/shared/types';
import { Checkbox, Field, Form, PasswordField } from '@/shared/ui';

import { useLogin } from '../../lib';

import styles from './styles.module.css';

export interface LoginFormProps extends CommonProps {}

export const LoginForm: FC<LoginFormProps> = reatomComponent((props) => {
	const { className, ctx, } = props;

	const { t, } = useTranslation('login');

	const model = useLogin();
	const submit = ctx.bind(model.submit);
	const onSubmit = usePreventDefault(submit);

	const submitT = t('login_form.submit');
	const titleT = t('login_form.title');

	return (
		<Form
			className={cn(styles.form, className)}
			onSubmit={onSubmit}
			aria-label={titleT}>
			<Email />
			<Password />
			<RememberMe />
			<Button type='submit'>{submitT}</Button>
		</Form>
	);
}, 'LoginForm');

const Email: FC = reatomComponent((props) => {
	const { ctx, } = props;
	const model = useLogin();
	const field = model.email;

	const value = ctx.spy(field.value);
	const {error,} = ctx.spy(field.validation);
	const change = ctx.bind(field.change);
	const focus = ctx.bind(field.focus.in);
	const blur = ctx.bind(field.focus.out);
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
}, 'Email');

const Password: FC = reatomComponent((props) => {
	const { ctx, } = props;
	const model = useLogin();
	const field = model.password;

	const value = ctx.spy(field.value);
	const {error,} = ctx.spy(field.validation);
	const change = ctx.bind(field.change);
	const focus = ctx.bind(field.focus.in);
	const blur = ctx.bind(field.focus.out);
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
}, 'Password');

const RememberMe: FC = reatomComponent((props) => {
	const { ctx, } = props;
	const model = useLogin();
	const field = model.rememberMe;

	const value = ctx.spy(field.value);
	const change = ctx.bind(field.change);
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
}, 'RememberMe');
