import { describe, expect, test } from 'vitest';

import { DateTime, DateTimeProps } from './date-time';

import { RenderResult, render } from '~/test-utils';

describe('shared/ui/date-time/date-time', () => {
	const date = new Date(2024, 11, 12);
	const format = 'DD-MM-YYYY';
	let wrapper: RenderResult;

	const createComponent = (props: DateTimeProps) => {
		wrapper = render(<DateTime {...props} />);
	};

	const findTime = () =>
		wrapper.getByRole('time', { name: date.toISOString(), });

	test('should render time element with formated time', () => {
		createComponent({ date, format, });

		expect(findTime()).toMatchSnapshot();
	});

	test.each([date, date.getTime(), date.toISOString()])(
		'should format %s to the same format',
		(date) => {
			createComponent({ date, format, });

			expect(findTime()).toHaveTextContent('12-12-2024');
		}
	);
});
