import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, fireEvent, waitFor, within, isInaccessible } from '@testing-library/svelte';
import type { RenderResult } from '@testing-library/svelte';

import { fonts } from '$styles/config';
import VariableFont from '$components/styles/variable-font.svelte';

// TODO - e2e test this component

describe('<VariableFont />', () => {
	let component: RenderResult<VariableFont>;
	let textArea: HTMLTextAreaElement,
		variationOptions: HTMLInputElement[],
		italic: HTMLInputElement,
		textTransform: HTMLSelectElement;

	// TODO - should this props function be abstracted to a helper?
	function props(overrides = {}) {
		return {
			fontName: Object.keys(fonts)[0],
			...overrides
		};
	}

	beforeEach(async () => {
		// lots of complicated mocking for this component...

		vi.mock('$styles/fonts.css?inline', () => ({
			default: `
        @font-face {
          font-family: '${Object.keys(fonts)[0]}';
          src: url('/fonts/whatever.ttf');
        }
      `
		}));

		vi.mock('$app/environment', () => ({
			browser: true
		}));

		global.fetch = vi.fn().mockImplementation(() => {
			return Promise.resolve({
				headers: {
					get: () => 100000
				}
			});
		});

		component = render(VariableFont, props());
		textArea = component.getByRole('textbox') as HTMLTextAreaElement;
		const inputs = component.getByRole('group');
		variationOptions = within(inputs).getAllByRole('slider');
		italic = within(inputs).getByRole('checkbox');
		textTransform = within(inputs).getByRole('combobox');
	});

	afterEach(() => {
		vi.resetAllMocks();
	});

	describe('rendering', () => {
		it('renders consistently', () => {
			expect(component.container).toMatchSnapshot();
		});

		it('ia accessible', () => {
			expect(isInaccessible(component.container)).toBe(false);
		});

		it('renders the font name and size', async () => {
			const font = Object.keys(fonts)[0];
			expect(component.getByRole('banner').textContent).toMatch(`${font} (...)`);
			await waitFor(() =>
				expect(component.getByRole('banner').textContent).toMatch(`${font} (${100}KB)`)
			);
		});

		it.skip('memoized the font size', () => {
			expect(global.fetch).toHaveBeenCalledTimes(1);
			component.rerender(props());
			expect(global.fetch).toHaveBeenCalledTimes(1);
		});

		it('renders the font options', async () => {
			expect(variationOptions.length).toEqual(
				Object.entries(Object.values(fonts)[0].options).length
			);
			expect(italic).toBeTruthy();
			expect(textTransform).toBeTruthy();
		});
	});

	describe('interacting', () => {
		const property = Object.keys(Object.values(fonts)[0].options)[0];
		const min = Object.values(Object.values(fonts)[0].options)[0][0];

		beforeEach(() => {
			fireEvent.input(textArea, {
				target: { value: 'the quick brown fox jumped over the lazy dog' }
			});
			fireEvent.change(variationOptions[0], { target: { value: min } });
			fireEvent.change(italic, { target: { checked: true } });
			fireEvent.change(textTransform, { target: { value: 'lowercase' } });
		});

		it('changes the example text', () => {
			expect(textArea.value).toMatch('the quick brown fox jumped over the lazy dog');
		});

		it('applies the styles', () => {
			const styles = (textArea.parentElement as HTMLElement)?.getAttribute('style');
			expect(styles).toMatch(`'${property}' ${min}`);
			expect(styles).toMatch(`font-style: italic`);
			expect(styles).toMatch(`text-transform: lowercase`);
		});

		it('creates the css', () => {
			const css = component.getByRole('code').textContent;
			expect(css).toMatch(`"${property}" ${min}`);
			expect(css).toMatch(`font-style: italic;`);
			expect(css).toMatch(`text-transform: lowercase;`);
		});
	});
});
