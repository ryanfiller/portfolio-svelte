import tgwf from '@tgwf/co2';

import { convertBytes } from '.';
import type { conversion } from './convert-bytes';

// https://developers.thegreenwebfoundation.org/api/greencheck/v3/check-single-domain/#response-object
interface Host {
	url: string;
	hosted_by: string;
	hosted_by_website: string;
	partner: string | null;
	green: boolean;
	hosted_by_id: number;
	modified: string;
	supporting_documents: [SupportingDocuments];
}

interface SupportingDocuments {
	id: number;
	title: string;
	link: string;
}

function getEmissions(bytes: number, host: Host) {
	const emissions = new tgwf.co2();
	const greenHost = host.green;

	return emissions.perByte(bytes, greenHost).toFixed(2);
}

async function checkHost(host: string) {
	try {
		const response = await fetch(`https://api.thegreenwebfoundation.org/api/v3/greencheck/${host}`);
		const json = await response.json();
		return json;
	} catch (error) {
		console.error('something went wrong fetching host co2 data', error);
		return {
			// just assume the worse scenario
			green: false,
			error: error
		};
	}
}

export interface Co2EmissionsResult {
	size: string;
	emissions: string;
	host: string;
}

export default async function getCo2Emissions(
	hostname: string,
	unit: conversion = 'bytes'
): Promise<Co2EmissionsResult> {
	const resources = performance.getEntriesByType('resource');

	const bytes = resources.reduce((total, resource) => {
		const { transferSize } = resource as PerformanceResourceTiming;
		return total + transferSize;
	}, 0);

	const host = await checkHost(hostname);

	return {
		size: `${convertBytes(bytes, unit)} ${unit}`,
		emissions: `${getEmissions(bytes, host)} grams`,
		host: host
	};
}
