export type Fonts = {
	[key: string]: Font;
};

export type Font = {
	url: string;
	options: {
		[key: string]: [number, number];
	};
};

// commented options here have been removed with slice app
// https://github.com/source-foundry/Slice

export const fonts: Fonts = {
	'Science Gothic': {
		url: 'https://sciencegothic.com/',
		options: {
			wght: [100, 900],
			wdth: [50, 200],
			YOPQ: [18, 122]
			// slnt: [-10, 0]
		}
	},

	'IBM Plex': {
		url: 'https://www.ibm.com/plex/',
		options: {
			wght: [100, 700],
			wdth: [85, 100]
		}
	},

	Recursive: {
		url: 'https://www.recursive.design/',
		options: {
			// MONO: [0, 1],
			CASL: [0, 1],
			wght: [300, 1000],
			// slnt: [-15, 0],
			CRSV: [0, 1]
		}
	}
};
