import { Button, Typography } from '@mui/material';
import { Link } from 'atomic-router-react';
import * as React from 'react';
import { useTranslation } from 'react-i18next';

import { routes } from '@/shared/configs';
import { usePageTitle } from '@/shared/lib';
import { CommonProps } from '@/shared/types';
import { AuthLayout } from '@/shared/ui';

const RegistrationThanksPage: React.FC<CommonProps> = (props) => {
	const { className, } = props;
	const { t, } = useTranslation('registration');

	usePageTitle(t('title'));

	return (
		<AuthLayout className={className}>
			<Typography variant='h3' component='h2' align='center'>
				{t('title')}
			</Typography>
			<Typography>Спасибо за регистрацию</Typography>
			<Button to={routes.login} component={Link}>
				Перейти на страницу входа
			</Button>
		</AuthLayout>
	);
};

export default RegistrationThanksPage;
