/* eslint-disable sonarjs/no-duplicate-string */
import { Button } from '@mui/material';
import { useAction, useAtom } from '@reatom/npm-react';
import cn from 'classnames';
import * as React from 'react';
import { useTranslation } from 'react-i18next';

import { FieldAtom } from '@reatom/form';

import { MIN_LENGTH, MAX_SHORT_LENGTH } from '@/shared/configs';
import { usePreventDefault } from '@/shared/lib';
import { CommonProps } from '@/shared/types';
import { Field, Form, PasswordField } from '@/shared/ui';

import { useRegistrationModel } from '../../lib';

import styles from './styles.module.css';

export interface RegistrationFormProps extends CommonProps {}

export const RegistrationForm: React.FC<RegistrationFormProps> = (props) => {
	const { className, } = props;

	const model = useRegistrationModel();

	const submit = useAction(model.submit);
	const [pending] = useAtom(model.submittingAtom);

	const { t, } = useTranslation('registration');

	const formTitleText = t('registration_form.title');
	const buttonText = t('registration_form.submit');

	const onSubmit = usePreventDefault(submit);

	return (
		<Form
			className={cn(styles.form, className)}
			onSubmit={onSubmit}
			aria-label={formTitleText}>
			<Email fieldAtom={model.email} />
			<Username fieldAtom={model.username} />
			<Password fieldAtom={model.password} />
			<RepeatPassword fieldAtom={model.repeatPassword} />
			<Button type='submit' disabled={pending}>
				{buttonText}
			</Button>
		</Form>
	);
};

interface FieldProps {
	readonly fieldAtom: FieldAtom;
}

const Email: React.FC<FieldProps> = (props) => {
	const { fieldAtom, } = props;

	const { t, } = useTranslation('registration');
	const [email] = useAtom(fieldAtom);
	const [errorText] = useAtom(
		(ctx) => ctx.spy(fieldAtom.validation).error,
		[fieldAtom]
	);
	const onChange = useAction(fieldAtom.change);
	const onFocus = useAction(fieldAtom.focus.in);
	const onBlur = useAction(fieldAtom.focus.out);

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
};

const Username: React.FC<FieldProps> = (props) => {
	const { fieldAtom, } = props;

	const { t, } = useTranslation('registration');

	const [username] = useAtom(fieldAtom);
	const [errorText] = useAtom(
		(ctx) => ctx.spy(fieldAtom.validation).error,
		[fieldAtom]
	);
	const onChange = useAction(fieldAtom.change);
	const onFocus = useAction(fieldAtom.focus.in);
	const onBlur = useAction(fieldAtom.focus.out);

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
};

const Password: React.FC<FieldProps> = (props) => {
	const { fieldAtom, } = props;

	const { t, } = useTranslation('registration');

	const [password] = useAtom(fieldAtom);
	const [errorText] = useAtom(
		(ctx) => ctx.spy(fieldAtom.validation).error,
		[fieldAtom]
	);
	const onChange = useAction(fieldAtom.change);
	const onFocus = useAction(fieldAtom.focus.in);
	const onBlur = useAction(fieldAtom.focus.out);

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
};

const RepeatPassword: React.FC<FieldProps> = (props) => {
	const { fieldAtom, } = props;

	const { t, } = useTranslation('registration');

	const [repeatPassword] = useAtom(fieldAtom);
	const [errorText] = useAtom(
		(ctx) => ctx.spy(fieldAtom.validation).error,
		[fieldAtom]
	);
	const onChange = useAction(fieldAtom.change);
	const onFocus = useAction(fieldAtom.focus.in);
	const onBlur = useAction(fieldAtom.focus.out);

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
};
