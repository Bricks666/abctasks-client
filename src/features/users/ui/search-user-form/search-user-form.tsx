import * as React from 'react';
import { useForm } from 'react-hook-form';
import { LoginSearchQuery } from '@/shared/api';
import { useDebounceValue } from '@/shared/lib';
import { CommonProps } from '@/shared/types';
import { Field } from '@/shared/ui';

export interface SearchUserFormProps extends CommonProps {
	readonly onSearch: (params: LoginSearchQuery) => unknown;
	readonly debounceTimeout: number;
}

export const SearchUserForm: React.FC<SearchUserFormProps> = (props) => {
	const { onSearch, debounceTimeout, } = props;
	const { control, watch, handleSubmit, } = useForm<{ login: string }>({
		defaultValues: {
			login: '',
		},
	});

	const deferredValue = useDebounceValue(watch('login'), debounceTimeout);

	React.useEffect(() => {
		if (!deferredValue) {
			return;
		}
		onSearch({ login: deferredValue, });
	}, [deferredValue, onSearch]);

	return (
		<form onSubmit={handleSubmit(console.log)}>
			<Field name='login' control={control} />
		</form>
	);
};
