/* eslint-disable sonarjs/no-duplicate-string */
import { Button } from '@mui/material';
import { reatomComponent } from '@reatom/npm-react';
import cn from 'classnames';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { MIN_LENGTH, MAX_SHORT_LENGTH } from '@/shared/configs';
import { usePreventDefault } from '@/shared/lib';
import { CommonProps } from '@/shared/types';
import { Field, Form, PasswordField } from '@/shared/ui';

import { useRegistration } from '../../lib';

import styles from './styles.module.css';

export interface RegistrationFormProps extends CommonProps {}

export const RegistrationForm: FC<RegistrationFormProps> = reatomComponent(
	(props) => {
		const { className, ctx, } = props;

		const model = useRegistration();

		const submit = ctx.bind(model.submit);
		const pending = ctx.spy(model.submittingAtom);

		const { t, } = useTranslation('registration');

		const formTitleText = t('registration_form.title');
		const buttonText = t('registration_form.submit');

		const onSubmit = usePreventDefault(submit);

		return (
			<Form
				className={cn(styles.form, className)}
				onSubmit={onSubmit}
				aria-label={formTitleText}>
				<Email />
				<Username />
				<Password />
				<RepeatPassword />
				<Button type='submit' disabled={pending}>
					{buttonText}
				</Button>
			</Form>
		);
	},
	'RegistrationForm'
);

const Email: FC = reatomComponent((props) => {
	const { ctx, } = props;
	const model = useRegistration();
	const field = model.email;

	const { t, } = useTranslation('registration');
	const email = ctx.spy(field);
	const errorText = ctx.spy(field.validation).error;
	const onChange = ctx.bind(field.change);
	const onFocus = ctx.bind(field.focus.in);
	const onBlur = ctx.bind(field.focus.out);

	const label = t('registration_form.fields.email');
	const error = t(`registration_form.errors.email.${errorText}`, {
		min_symbols_count: MIN_LENGTH,
		max_symbols_count: MAX_SHORT_LENGTH,
	});

	const isError = !!errorText;
	const errorHelperText = isError ? error : null;

	return (
		<Field
			value={email}
			onChange={onChange}
			onBlur={onBlur}
			onFocus={onFocus}
			helperText={errorHelperText}
			isError={isError}
			name='email'
			label={label}
			autoComplete='off'
		/>
	);
}, 'Email');

const Username: FC = reatomComponent((props) => {
	const { ctx, } = props;
	const model = useRegistration();
	const field = model.username;

	const { t, } = useTranslation('registration');

	const username = ctx.spy(field);
	const errorText = ctx.spy(field.validation).error;
	const onChange = ctx.bind(field.change);
	const onFocus = ctx.bind(field.focus.in);
	const onBlur = ctx.bind(field.focus.out);

	const label = t('registration_form.fields.username');
	const error = t(`registration_form.errors.username.${errorText}`, {
		min_symbols_count: MIN_LENGTH,
		max_symbols_count: MAX_SHORT_LENGTH,
	});

	const isError = !!errorText;
	const errorHelperText = isError ? error : null;

	return (
		<Field
			value={username}
			onChange={onChange}
			onBlur={onBlur}
			onFocus={onFocus}
			helperText={errorHelperText}
			isError={isError}
			name='username'
			label={label}
			autoComplete='off'
		/>
	);
}, 'Username');

const Password: FC = reatomComponent((props) => {
	const { ctx, } = props;
	const model = useRegistration();
	const field = model.password;

	const { t, } = useTranslation('registration');

	const password = ctx.spy(field);
	const errorText = ctx.spy(field.validation).error;
	const onChange = ctx.bind(field.change);
	const onFocus = ctx.bind(field.focus.in);
	const onBlur = ctx.bind(field.focus.out);

	const label = t('registration_form.fields.password');
	const error = t(`registration_form.errors.password.${errorText}`, {
		min_symbols_count: MIN_LENGTH,
		max_symbols_count: MAX_SHORT_LENGTH,
	});

	const isError = !!errorText;
	const errorHelperText = isError ? error : null;

	return (
		<PasswordField
			value={password}
			onChange={onChange}
			onBlur={onBlur}
			onFocus={onFocus}
			helperText={errorHelperText}
			isError={isError}
			name='password'
			label={label}
			autoComplete='new-password'
		/>
	);
}, 'Password');

const RepeatPassword: FC = reatomComponent((props) => {
	const { ctx, } = props;
	const model = useRegistration();
	const field = model.repeatPassword;

	const { t, } = useTranslation('registration');

	const repeatPassword = ctx.spy(field);
	const errorText = ctx.spy(field.validation).error;
	const onChange = ctx.bind(field.change);
	const onFocus = ctx.bind(field.focus.in);
	const onBlur = ctx.bind(field.focus.out);

	const label = t('registration_form.fields.repeat_password');
	const error = t(`registration_form.errors.repeat_password.${errorText}`, {
		min_symbols_count: MIN_LENGTH,
		max_symbols_count: MAX_SHORT_LENGTH,
	});

	const isError = !!errorText;
	const errorHelperText = isError ? error : null;

	return (
		<PasswordField
			value={repeatPassword}
			onChange={onChange}
			onBlur={onBlur}
			onFocus={onFocus}
			helperText={errorHelperText}
			isError={isError}
			name='repeatPassword'
			label={label}
			autoComplete='new-password'
		/>
	);
}, 'RepeatPassword');
