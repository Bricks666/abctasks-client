/* eslint-disable import/no-extraneous-dependencies */
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import {
	render as rtlRender,
	RenderOptions as RTLRenderOptions,
	RenderResult as RTLRenderResult,
	renderHook as rtlRenderHook,
	RenderHookOptions as RTLRenderHookOptions,
	RenderHookResult as RTLRenderHookResult
} from '@testing-library/react';
import userEvent, { UserEvent } from '@testing-library/user-event';
import { RouterProvider } from 'atomic-router-react';
import { Provider as StoreProvider } from 'effector-react';
import React, {
	ComponentType,
	Fragment,
	JSXElementConstructor,
	PropsWithChildren,
	ReactNode
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
	const { router, scope, wrapper: Wrapper, } = options;

	return (props) => {
		const { children, } = props;

		return (
			<StoreProvider value={scope}>
				<RouterProvider router={router}>
					<LocalizationProvider dateAdapter={AdapterDayjs}>
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

	const AllProviders = createAllProviders({ scope, router, wrapper, });

	const defualtResult = rtlRender(ui, { ...rest, wrapper: AllProviders, });

	return {
		...defualtResult,
		user: userEvent.setup({
			writeToClipboard: true,
		}),
	};
};

interface RenderHookOptions<Result, Props>
	extends Omit<RTLRenderHookOptions<Result, Props>, 'wrapper'>,
		Partial<CreateAllProvidersOptions> {}

interface RenderHookResult<Result, Props>
	extends RTLRenderHookResult<Result, Props> {}

const renderHook = <Result, Props>(
	render: (initialProps: Props) => Result,
	options: RenderHookOptions<Result, Props> = {}
): RenderHookResult<Result, Props> => {
	const {
		scope = fork(),
		router = appRouter,
		wrapper = Fragment,
		...rest
	} = options;

	const AllProviders = createAllProviders({ scope, router, wrapper, });

	return rtlRenderHook(render, { ...rest, wrapper: AllProviders, });
};

export * from '@testing-library/react';
export * as userEvent from '@testing-library/user-event';
export {
	render,
	RenderOptions,
	RenderResult,
	renderHook,
	RenderHookResult,
	RenderHookOptions
};
