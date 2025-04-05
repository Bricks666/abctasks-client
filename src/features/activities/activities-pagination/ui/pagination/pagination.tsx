import { Pagination, PaginationItem } from '@mui/material';
import { useAtom } from '@reatom/npm-react';
import type { ChangeEvent, FC } from 'react';

import { withProvider } from '@/shared/lib';
import type { CommonProps } from '@/shared/types';

import { ActivitiesPaginationScopeProvider, usePagination } from '../../lib';
import type { OnPageChanged } from '../../model';

export interface ActivitiesPaginationProps extends CommonProps {
	readonly pageCount: number;
	readonly onPageChanged?: OnPageChanged;
}

export const ActivitiesPagination: FC<ActivitiesPaginationProps> = withProvider(
	ActivitiesPaginationScopeProvider
)((props: ActivitiesPaginationProps) => {
	const { className, onPageChanged, pageCount, } = props;

	const model = usePagination({ onPageChanged, });

	const [page, setPage] = useAtom(model.pageAtom);

	const setNewPage = (_: ChangeEvent<unknown>, page: number) => {
		setPage(page);
	};

	// @todo Add localization for aria-labels of pagination
	return (
		<Pagination
			className={className}
			count={pageCount}
			page={page}
			onChange={setNewPage}
			color='primary'
			size='large'
			renderItem={(item) => {
				return <PaginationItem {...item} role='link' />;
			}}
		/>
	);
});
