import { useForm } from 'effector-forms';
import * as React from 'react';
import { CommonProps } from '@/shared/types';
import { Field } from '@/shared/ui';
import { searchUserModel } from '../../model';

export interface SearchUserFormProps extends CommonProps {}

export const SearchUserForm: React.FC<SearchUserFormProps> = (props) => {
	const { className, } = props;
	const { fields, } = useForm(searchUserModel.form);

	const { login, } = fields;

	return (
		<form className={className}>
			<Field
				value={login.value}
				onChange={login.onChange}
				onBlur={login.onBlur}
				errorText={login.errorText()}
				isValid={login.isValid}
				name={login.name}
			/>
		</form>
	);
};
