import { Typography, Link as MUILink } from '@mui/material';
import { Link } from 'atomic-router-react';
import { useUnit } from 'effector-react';
import * as React from 'react';
import { useTranslation } from 'react-i18next';

import { AuthLayout } from '@/widgets/page';

import { routes } from '@/shared/configs';
import { usePageTitle } from '@/shared/lib';
import { CommonProps } from '@/shared/types';
import { PageTitle } from '@/shared/ui';

import { $email, $username } from './model';
import styles from './page.module.css';

const RegistrationThanksPage: React.FC<CommonProps> = (props) => {
	const { className, } = props;
	const { t, } = useTranslation('thanks');

	const [username, email] = useUnit([$username, $email]);

	const title = t('title');
	const titleLong = t('title', { context: 'long', username, });
	const content = t('content', { email, returnObjects: true, }) as string[];
	const navigate = t('actions.navigate');

	usePageTitle(title);

	return (
		<AuthLayout className={className} classes={{ center: styles.container, }}>
			<PageTitle title={titleLong} />
			<Typography className={styles.text}>
				{content[0]}
				<b>{email}</b>
				{content[1]}
			</Typography>
			<MUILink to={routes.login} component={Link}>
				{navigate}
			</MUILink>
		</AuthLayout>
	);
};

export default RegistrationThanksPage;
