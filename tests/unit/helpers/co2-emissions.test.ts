import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

import { co2Emissions } from '$helpers';

describe('co2Emissions()', () => {
	let result;

	const bytes = 1073741824; // this is 1GB in bytes
	const hostName = 'ryanfiller.com';

	const greencheckAPIFound = {
		url: hostName,
		hosted_by: 'Google Inc.',
		hosted_by_website: 'https://www.google.com',
		partner: null,
		green: true,
		hosted_by_id: 595,
		modified: 'whenever',
		supporting_documents: [
			{
				id: 108,
				title: 'Sustainability at Google',
				link: 'https://sustainability.google'
			}
		]
	};

	const greencheckAPINotFound = {
		green: false,
		url: hostName,
		data: false
	};

	// @ts-ignore
	let performance;
	// @ts-ignore
	let fetch;
	// @ts-ignore
	let error;
	beforeEach(() => {
		performance = global.performance;
		fetch = global.fetch;
		error = console.error;

		global.performance = {
			getEntriesByType: () => [
				// make it return two to make sure accumulator works
				// @ts-ignore
				{ encodedBodySize: bytes / 2 },
				// @ts-ignore
				{ encodedBodySize: bytes / 2 }
			]
		};

		console.error = vi.fn();
	});

	afterEach(() => {
		// @ts-ignore
		global.performance = performance;
		// @ts-ignore
		global.fetch = fetch;
		// @ts-ignore
		global.console.error = error;
	});

	describe('when the API finds data', () => {
		beforeEach(() => {
			// @ts-ignore
			global.fetch = vi.fn(() => ({
				json: () => greencheckAPIFound
			}));
		});

		it('returns the correct data', async () => {
			result = await co2Emissions(hostName);

			expect(result).toEqual({
				size: '1073741824.00 bytes',
				emissions: '329.78 g',
				host: greencheckAPIFound
			});
		});
	});

	describe('when the API does NOT find data', () => {
		beforeEach(() => {
			// @ts-ignore
			global.fetch = vi.fn(() => ({
				json: () => greencheckAPINotFound
			}));
		});

		it('returns the correct data', async () => {
			result = await co2Emissions(hostName);

			expect(result).toEqual({
				size: '1073741824.00 bytes',
				emissions: '380.30 g',
				host: greencheckAPINotFound
			});
		});
	});

	describe('when the API errors', () => {
		beforeEach(() => {
			// @ts-ignore
			global.fetch = vi.fn(() => Promise.reject());
		});

		it('returns the correct data, but logs an error', async () => {
			result = await co2Emissions(hostName);

			expect(result).toEqual({
				size: '1073741824.00 bytes',
				emissions: '380.30 g',
				host: {
					green: false,
					error: undefined
				}
			});
			expect(console.error).toHaveBeenCalled();
		});
	});

	describe('byte sizes', () => {
		beforeEach(() => {
			// @ts-ignore
			global.fetch = vi.fn(() => Promise.reject());
		});

		describe.each([
			{
				format: 'bytes',
				expected: '1073741824.00 bytes'
			},
			{
				format: 'kilobytes',
				expected: '1048576.00 kilobytes'
			},
			{
				format: 'megabytes',
				expected: '1024.00 megabytes'
			},
			{
				format: 'gigabytes',
				expected: '1.00 gigabytes'
			}
		])('describe object add($a, $b)', ({ format, expected }) => {
			it(`calculates ${format} correctly`, async () => {
				// @ts-ignore
				result = await co2Emissions(hostName, format);
				expect(result.size).toEqual(expected);
			});
		});
	});
});
