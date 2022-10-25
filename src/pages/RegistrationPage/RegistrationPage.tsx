import * as React from 'react';
import { Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useMutation } from '@farfetched/react';
import { useStore } from 'effector-react';
import { $IsAuth, registrationMutation } from '@/models/auth';
import { AuthLayout } from '@/layouts/AuthLayout';
import { RegistrationForm } from '@/components/RegistrationForm';
import { CommonProps } from '@/types';
import { usePageTitle } from '@/hooks';
import { StyledLink } from './styles';

const RegistrationPage: React.FC<CommonProps> = ({ className }) => {
	const { t } = useTranslation('registration');
	const navigate = useNavigate();
	const isAuth = useStore($IsAuth);
	const { pending } = useMutation(registrationMutation);
	const lastPendingStatusRef = React.useRef(pending);

	usePageTitle(t('title'));

	React.useEffect(() => {
		if (isAuth) {
			navigate('/rooms', { replace: true });
		}
	}, [isAuth]);

	React.useEffect(() => {
		let lastPendingStatus = lastPendingStatusRef.current;
		if (!lastPendingStatus) {
			lastPendingStatus = pending;
		}

		if (lastPendingStatus && !pending) {
			navigate('/login');
		}

		lastPendingStatusRef.current = lastPendingStatus;
	}, [pending]);

	return (
		<AuthLayout className={className}>
			<Typography variant='h3' component='h2' align='center'>
				{t('title')}
			</Typography>
			<RegistrationForm />
			<StyledLink to='/login'>{t('actions.login')}</StyledLink>
		</AuthLayout>
	);
};

export default RegistrationPage;
