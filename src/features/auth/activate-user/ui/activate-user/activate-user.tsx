import { Typography, Link, CircularProgress, Paper } from '@mui/material';
import { useAtom } from '@reatom/npm-react';
import cn from 'classnames';
import { FC, memo } from 'react';
import { useTranslation } from 'react-i18next';

import { ROUTES } from '@/shared/configs';
import { CommonProps } from '@/shared/types';
import { Center } from '@/shared/ui';

import { useActivateUser } from '../../lib';

import styles from './styles.module.css';

export interface ActivateUserProps extends CommonProps {}

export const ActivateUser: FC<ActivateUserProps> = memo((props) => {
	const { className, } = props;
	const model = useActivateUser();

	const [pending] = useAtom(model.pendingAtom);
	const [error] = useAtom(model.errorAtom);
	const [activated] = useAtom(model.activatedAtom);

	return (
		// Add paddings and borders to center content
		<Paper className={cn(styles.container, className)}>
			{pending ? <Loading /> : null}
			{activated ? <Success /> : null}
			{error ? <Error /> : null}
		</Paper>
	);
});

const Loading: FC = () => {
	const { t, } = useTranslation('activate');

	const textT = t('text', { context: 'loading', });

	return (
		<Center>
			<CircularProgress size={80} />
			<Typography>{textT}</Typography>
		</Center>
	);
};

const Success: FC = () => {
	const { t, } = useTranslation('activate');

	const titleT = t('text', { context: 'success', });
	const linkT = t('actions.navigate');

	return (
		<>
			<Typography className={styles.text}>{titleT}</Typography>
			<Link href={ROUTES.login.getPath({})}>{linkT}</Link>
		</>
	);
};

const Error: FC = () => {
	const { t, } = useTranslation('activate');

	const titleT = t('text', { context: 'fail', });
	const linkT = t('actions.navigate');

	return (
		<>
			<Typography className={styles.text}>{titleT}</Typography>
			<Link href={ROUTES.login.getPath({})}>{linkT}</Link>
		</>
	);
};
