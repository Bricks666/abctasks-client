import { Typography, Link as MUILink, CircularProgress } from '@mui/material';
import { Link } from 'atomic-router-react';
import { useUnit } from 'effector-react';
import * as React from 'react';
import { useTranslation } from 'react-i18next';

import { AuthLayout } from '@/widgets/page';

import { activateAccountModel } from '@/features/auth';

import { routes } from '@/shared/configs';
import { usePageTitle } from '@/shared/lib';
import { CommonProps } from '@/shared/types';
import { Center, PageTitle } from '@/shared/ui';

import styles from './page.module.css';

const RegistrationThanksPage: React.FC<CommonProps> = (props) => {
	const { className, } = props;
	const { t, } = useTranslation('activate');

	const title = t('title');

	usePageTitle(title);

	return (
		<AuthLayout className={className} classes={{ center: styles.container, }}>
			<PageTitle title={title} />
			<Loading />
			<Success />
			<Error />
		</AuthLayout>
	);
};

const Loading: React.FC = () => {
	const { t, } = useTranslation('activate');
	const loading = useUnit(activateAccountModel.query.$pending);

	if (!loading) {
		return null;
	}

	const text = t('text', { context: 'loading', });

	return (
		<Center>
			<CircularProgress size={80} />
			<Typography>{text}</Typography>
		</Center>
	);
};

const Success: React.FC = () => {
	const { t, } = useTranslation('activate');

	const activated = useUnit(activateAccountModel.query.$data);

	if (!activated) {
		return null;
	}

	const text = t('text', { context: 'success', });
	const navigate = t('actions.navigate');

	return (
		<>
			<Typography className={styles.text}>{text}</Typography>
			<MUILink to={routes.login} component={Link}>
				{navigate}
			</MUILink>
		</>
	);
};

const Error: React.FC = () => {
	const { t, } = useTranslation('activate');
	const error = useUnit(activateAccountModel.query.$error);

	if (!error) {
		return null;
	}

	const text = t('text', { context: 'fail', });
	const navigate = t('actions.navigate');

	return (
		<>
			<Typography className={styles.text}>{text}</Typography>
			<MUILink to={routes.login} component={Link}>
				{navigate}
			</MUILink>
		</>
	);
};

export default RegistrationThanksPage;
