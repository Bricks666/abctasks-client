import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useMutation } from '@farfetched/react';
import { useStore } from 'effector-react';
import { $IsAuth, registrationMutation } from '@/models/auth';
import { RegistrationForm } from '@/components/RegistrationForm';
import { SaveLink } from '@/components/SaveLink';
import { CommonProps } from '@/interfaces/common';
import { ContentLayout } from '@/ui/ContentLayout';
import { Text } from '@/ui/Text';
import { usePageTitle } from '@/hooks';
import { AuthLayout } from '@/layouts/AuthLayout';

import styles from './RegistrationPage.module.css';

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
			<ContentLayout className={styles.layout}>
				<Text className={styles.header} component='h2'>
					{t('title')}
				</Text>
				<RegistrationForm className={styles.form} />
				<SaveLink className={styles.link} to='/login'>
					{t('links.login')}
				</SaveLink>
			</ContentLayout>
		</AuthLayout>
	);
};

export default RegistrationPage;
