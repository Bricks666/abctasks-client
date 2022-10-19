import * as React from 'react';
import { Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useStore } from 'effector-react';
import { $IsAuth } from '@/models/auth';
import { usePageTitle } from '@/hooks';
import { CommonProps } from '@/types/common';
import { StyledForm, StyledLayout, StyledLink } from './styles';

const LoginPage: React.FC<CommonProps> = ({ className }) => {
	const isAuth = useStore($IsAuth);
	const navigate = useNavigate();
	const { t } = useTranslation('login');
	usePageTitle(t('title'));

	React.useEffect(() => {
		if (isAuth) {
			navigate('/rooms', { replace: true });
		}
	}, [isAuth]);

	return (
		<StyledLayout className={className}>
			<Typography variant='h2' align='center'>
				{t('title')}
			</Typography>
			<StyledForm />
			<StyledLink to='/registration'>{t('actions.registration')}</StyledLink>
		</StyledLayout>
	);
};
export default LoginPage;
