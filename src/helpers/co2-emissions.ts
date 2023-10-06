import tgwf from '@tgwf/co2';

const conversion = {
	bytes: 1,
	kilobytes: 1024,
	megabytes: 1024 * 1024,
	gigabytes: 1024 * 1024 * 1024
};

type conversion = keyof typeof conversion;

// https://developers.thegreenwebfoundation.org/api/greencheck/v3/check-single-domain/#response-object
interface SupportingDocuments {
	id: number;
	title: string;
	link: string;
}

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

function convertSize(size: number, unit: conversion) {
	return (size / conversion[unit as keyof typeof conversion]).toFixed(2);
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

export default async function co2Emissions(hostname: string, unit: conversion = 'bytes') {
	const resources = performance.getEntriesByType('resource');

	const bytes = resources.reduce((total, resource) => {
		return total + ((resource as PerformanceResourceTiming).encodedBodySize || 0);
	}, 0);

	const host = await checkHost(hostname);

	return {
		size: `${convertSize(bytes, unit)} ${unit}`,
		emissions: `${getEmissions(bytes, host)} g`,
		host: host
	};
}
