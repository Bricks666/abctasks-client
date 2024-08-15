/** eslint-disable import/no-extraneous-dependencies */
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import {
	render as rtlRender,
	RenderOptions as RTLRenderOptions,
	RenderResult as RTLRenderResult,
} from '@testing-library/react';
import userEvent, { UserEvent } from '@testing-library/user-event';
import { RouterProvider } from 'atomic-router-react';
import { Provider as StoreProvider } from 'effector-react';
import React, {
	ComponentType,
	Fragment,
	JSXElementConstructor,
	PropsWithChildren,
	ReactNode,
} from 'react';

import { router as appRouter } from '@/shared/configs';

import { HistoryRouter } from './routing';
import { fork, Scope } from './state-manager';

interface CreateAllProvidersOptions {
	readonly scope: Scope;
	readonly router: HistoryRouter;
	readonly wrapper: JSXElementConstructor<PropsWithChildren>;
}

const createAllProviders = (
	options: CreateAllProvidersOptions
): ComponentType<PropsWithChildren> => {
	const { router, scope, wrapper: Wrapper } = options;

	return (props) => {
		const { children } = props;

		return (
			<StoreProvider value={scope}>
				<RouterProvider router={router}>
					<LocalizationProvider adapterLocale={AdapterDayjs}>
						<Wrapper>{children}</Wrapper>
					</LocalizationProvider>
				</RouterProvider>
			</StoreProvider>
		);
	};
};

interface RenderOptions
	extends Omit<RTLRenderOptions, 'wrapper'>,
		Partial<CreateAllProvidersOptions> {}

interface RenderResult extends RTLRenderResult {
	readonly user: UserEvent;
}

const render = (ui: ReactNode, options: RenderOptions = {}): RenderResult => {
	const {
		scope = fork(),
		router = appRouter,
		wrapper = Fragment,
		...rest
	} = options;

	const AllProviders = createAllProviders({ scope, router, wrapper });

	const defualtResult = rtlRender(ui, { ...rest, wrapper: AllProviders });

	return {
		...defualtResult,
		user: userEvent.setup({
			writeToClipboard: true,
		}),
	};
};

export * from '@testing-library/react';
export * as userEvent from '@testing-library/user-event';
export { render, RenderOptions, RenderResult };
