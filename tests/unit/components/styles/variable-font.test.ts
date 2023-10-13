import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, fireEvent, waitFor, within, isInaccessible } from '@testing-library/svelte';
import type { RenderResult } from '@testing-library/svelte';

import { mockMatchMedia } from '../../test-helpers';

import { fonts } from '$styles/config';
import VariableFont from '$components/styles/variable-font.svelte';

// TODO - e2e test this component

describe('<VariableFont />', () => {
	let component: RenderResult<VariableFont>;
	let textArea: HTMLTextAreaElement,
		variationOptions: HTMLInputElement[],
		italic: HTMLInputElement,
		textTransform: HTMLSelectElement,
		css: HTMLElement;
	// @ts-ignore
	let performance;

	// TODO - should this props function be abstracted to a helper?
	function props(overrides = {}) {
		return {
			fontName: Object.keys(fonts)[0],
			...overrides
		};
	}

	function createComponent() {
		component = render(VariableFont, props());
		textArea = component.getByRole('textbox') as HTMLTextAreaElement;
		const inputs = component.getByRole('group');
		variationOptions = within(inputs).getAllByRole('slider');
		italic = within(inputs).getByRole('checkbox');
		textTransform = within(inputs).getByRole('combobox');
		css = component.getByRole('code');
	}

	beforeEach(() => {
		// lots of complicated mocking for this component...

		mockMatchMedia('(prefers-reduced-data: reduce)', false);

		vi.mock('$styles/fonts.css?inline', () => ({
			default: `
        @font-face {
          font-family: '${Object.keys(fonts)[0]}';
          src: url('/fonts/whatever.ttf');
        }

				:root {
					--test-font: '${Object.keys(fonts)[0]}';
				}
      `
		}));

		vi.mock('$app/environment', () => ({
			browser: true
		}));

		performance = global.performance;

		global.performance = {
			getEntriesByType: () => [
				// @ts-ignore
				{ name: Object.keys(fonts)[0].replace(' ', '-'), decodedBodySize: 1024 }
			]
		};

		createComponent();
	});

	afterEach(() => {
		vi.resetAllMocks();

		// @ts-ignore
		global.performance = performance;
	});

	describe('rendering', () => {
		it('renders consistently', () => {
			expect(component.container).toMatchSnapshot();
		});

		it('ia accessible', () => {
			expect(isInaccessible(component.container)).toBe(false);
		});

		it('renders the font name and size', () => {
			const font = Object.keys(fonts)[0];
			expect(component.getByRole('banner').textContent).toMatch(`--test-font`);
			expect(component.getByRole('banner').textContent).toMatch(`${font} (1.00KB)`)
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
			const inlineStyles = (textArea.parentElement as HTMLElement)?.getAttribute('style');
			expect(inlineStyles).toMatch(`'${property}' ${min}`);
			expect(inlineStyles).toMatch(`font-style: italic`);
			expect(inlineStyles).toMatch(`text-transform: lowercase`);
		});

		it('creates the css', () => {
			const font = Object.keys(fonts)[0];
			expect(css.textContent).toMatch(`font-family: "${font}";`);
			expect(css.textContent).toMatch(`"${property}" ${min}`);
			expect(css.textContent).toMatch(`font-style: italic;`);
			expect(css.textContent).toMatch(`text-transform: lowercase;`);
		});
	});

	describe('prefers-reduced-data', () => {
		beforeEach(() => {
			mockMatchMedia('(prefers-reduced-data: reduce)', true);
			// unmount the original component
			component.unmount();
			// recreate it with reduced data
			createComponent();
		});

		it('filters the font options correctly', () => {
			Object.keys(Object.values(fonts)[0].options).forEach((option) => {
				if (option === 'wght' || option === 'wdth') {
					expect(component.getByLabelText(option)).toBeTruthy();
				} else {
					expect(() => component.getByLabelText(option)).toThrow();
				}
			});
		});

		it('applies the styles', () => {
			const inlineStyles = (textArea.parentElement as HTMLElement)?.getAttribute('style');
			expect(inlineStyles).toMatch(`--reduced-data-font: var(--test-font);`);
		});

		it('creates the css', () => {
			expect(css.textContent).toMatch(`font-family: var(--reduced-data-font);`);
		});
	});
});
