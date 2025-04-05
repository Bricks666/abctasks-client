/* eslint-disable import/no-extraneous-dependencies */
import { Experimental_CssVarsProvider as CssVarsProvider } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { reatomContext } from '@reatom/npm-react';
import {
	render as rtlRender,
	RenderOptions as RTLRenderOptions,
	RenderResult as RTLRenderResult,
	renderHook as rtlRenderHook,
	RenderHookOptions as RTLRenderHookOptions,
	RenderHookResult as RTLRenderHookResult
} from '@testing-library/react';
import userEvent, { UserEvent } from '@testing-library/user-event';
import React, {
	ComponentType,
	Fragment,
	JSXElementConstructor,
	PropsWithChildren,
	ReactNode
} from 'react';

import { createTestCtx, TestCtx } from './state-manager';

interface CreateAllProvidersOptions {
	readonly ctx: TestCtx;
	readonly wrapper: JSXElementConstructor<PropsWithChildren>;
}

const createAllProviders = (
	options: CreateAllProvidersOptions
): ComponentType<PropsWithChildren> => {
	const { ctx, wrapper: Wrapper, } = options;

	return (props) => {
		const { children, } = props;

		return (
			<reatomContext.Provider value={ctx}>
				<CssVarsProvider>
					<LocalizationProvider dateAdapter={AdapterDayjs}>
						<Wrapper>{children}</Wrapper>
					</LocalizationProvider>
				</CssVarsProvider>
			</reatomContext.Provider>
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
	const { wrapper = Fragment, ctx = createTestCtx(), ...rest } = options;

	const AllProviders = createAllProviders({ wrapper, ctx, });

	const defaultResult = rtlRender(ui, { ...rest, wrapper: AllProviders, });

	return {
		...defaultResult,
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
	const { wrapper = Fragment, ctx = createTestCtx(), ...rest } = options;

	const AllProviders = createAllProviders({ wrapper, ctx, });

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
