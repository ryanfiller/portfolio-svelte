const conversion = {
	bytes: 1,
	kilobytes: 1024,
	megabytes: 1024 * 1024,
	gigabytes: 1024 * 1024 * 1024
}

export type conversion = keyof typeof conversion

export default function convertBytes(size: number, unit: conversion) {
	return (size / conversion[unit as keyof typeof conversion]).toFixed(2)
}
