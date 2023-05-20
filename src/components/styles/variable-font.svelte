<script lang="typescript">
	export let fontName: string;

	import { browser } from '$app/environment';
	import { fonts } from '$styles/config';
	import css from '$styles/fonts.css?inline';

	// TODO - it would be nice to move all these checks to a context store and only do them once
	let reduceData = false;
	if (browser) {
		const mediaQuery = window.matchMedia('(prefers-reduced-data: reduce)');
		reduceData = mediaQuery.matches;
		mediaQuery.addEventListener('change', (event) => (reduceData = event.matches));
	}

	// TODO - abstract this into $helpers function
	function slugify(input: string) {
		return input
			.toString()
			.toLowerCase()
			.replace(/\s+/g, '-') // Replace spaces with -
			.replace(/[^\w-]+/g, '') // Remove all non-word chars
			.replace(/--+/g, '-') // Replace multiple - with single -
			.replace(/^-+/, '') // Trim - from start of text
			.replace(/-+$/, ''); // Trim - from end of text
	}

	function makeId(string: string) {
		return `${slugify(fontName)}-${string}`;
	}

	function getFontFiles() {
		// get the matching font face declarations
		const fontFaceRegex = `@font-face\\s*{[^}]*font-family:\\s*['"]?${fontName}['"]?;[^}]*src:\\s*url\\(['"]?(.*?)['"]?\\);`;
		const regex = new RegExp(fontFaceRegex, 'g');

		return css.match(regex)?.map((fontFace) => {
			return fontFace.match(/src:\s*url\(['"]?(.*?)['"]?\);/)?.[1];
		});
	}

	function getFontVariableName() {
		const rootStyles = css.split(':root')[1];

		const regexPattern = `(--[^:\\n\\r]+):\\s*'${fontName}`;
		const regex = new RegExp(regexPattern);

		return rootStyles.match(regex)?.[1];
	}

	// do some memoization so there's not a fetch on every render
	const fileSizes: { [key: string]: number } = {};
	async function getFilesSizes() {
		// only run this on the client, not the browser
		if (!browser) return;

		const files = getFontFiles() || [];
		// don't do this if there's no files
		if (!files.length) return;

		// return the value if we've already fetched it
		if (fileSizes[fontName]) return fileSizes[fontName];

		const bytes: [number] = [0];
		await Promise.all(
			files.map(async (path) => {
				if (!path) return;
				await fetch(path)
					.then((response) => response.headers.get('content-length'))
					.then((byteSize) => bytes.push(parseFloat(byteSize || '0')))
					.catch((error) => console.error(error));
			})
		);

		// convert add the bytes together and convert to kilobytes and round to 0 decimal places
		const kbSize = Math.round(bytes.reduce((total, current) => total + current, 0) / 1000);
		// push this to the persisted object
		fileSizes[fontName] = kbSize;
		return kbSize;
	}

	function getVariationSettings() {
		return Object.entries(fonts[fontName].options)
			.map((option) => {
				const [name, [min, max]] = option;
				const range = max - min;
				const middle = (max + min) / 2;
				return {
					name,
					min,
					max,
					value: min >= 0 ? middle : max,
					step: range === 1 ? 0.5 : 1
				};
			})
			.filter((options) => {
				if (reduceData) {
					return options.name === 'wght' || options.name === 'wdth';
				} else {
					return true;
				}
			});
	}

	function createFontStyles(variationSettings: { name: string; value: number }[]) {
		return variationSettings
			.map(({ name, value }) => {
				return `'${name}' ${value}`;
			})
			.join(', ');
	}

	// prettier-ignore
	const characters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
	const numbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
	// prettier-ignore
	const symbols = ['!', '"', '#', '$', '%', '&', "'", '(', ')', '*', '+', ',', '-', '.', '/', ':', ';', '<', '=', '>', '?', '@', '{', '|', '}', '~', '[', '\\', ']', '^', '_', '`'];
	const codeLigatures = ['&&', '||', '=>', '==', '!=', '<=', '>=', '!!', '?.'];

	// for some reason this test fails if it this is just `bind:value={font.capitalization}`
	function handleSelect(event: Event) {
		if (!(event.target instanceof HTMLSelectElement)) return;
		font.capitalization = event.target.value;
	}

	$: font = {
		name: fontName,
		variable: getFontVariableName(),
		...fonts[fontName],
		variationSettings: getVariationSettings(),
		italic: false,
		capitalization: 'none',
		text: 'the five boxing wizards jump quickly',
		// text: characters.join(' '),
		reduceData
	};
</script>

<section class="variable-font">
	<header>
		<code>
			{font.variable}
		</code>
		<span class="no-reduce-data">
			<a target="_blank" rel="noopener noreferrer" href={font.url}>
				{font.name}
			</a>
			<span class="needs-js">
				{#await getFilesSizes()}
					(...)
				{:then size}
					({size}KB)
				{/await}
			</span>
		</span>
	</header>

	<fieldset class="needs-js">
		<legend>Options:</legend>

		{#each Object.values(font.variationSettings) as variable, index}
			<div class="slider">
				<label for={makeId(`${variable.name}-slider`)}>
					{variable.name}
				</label>
				<input
					type="range"
					id={makeId(`${variable.name}-slider`)}
					{...font.variationSettings[index]}
					bind:value={font.variationSettings[index].value}
				/>
			</div>
		{/each}

		<div class="checkbox">
			<label for={makeId('italic')}>italic</label>
			<input type="checkbox" id={makeId('italic')} bind:checked={font.italic} />
		</div>

		<div class="select">
			<label for={makeId('capitalization')}>text-transform</label>
			<select id={makeId('capitalization')} on:change={handleSelect}>
				<option value="none">none</option>
				<option value="capitalize">capitalize</option>
				<option value="uppercase">uppercase</option>
				<option value="lowercase">lowercase</option>
			</select>
		</div>
	</fieldset>

	<pre class="code needs-js" role="code">
		<code>
			font-family: {!reduceData ? `"${font.name}"` : 'var(--reduced-data-font)'};
			font-variation-settings: {JSON.stringify(createFontStyles(font.variationSettings))
				.replace(/"/g, '')
				.replace(/'/g, '"')
				.replace(/ "/g, '\n  "')
				.replace(/"/, '\n  "')};
			{#if font.italic}
				font-style: italic;
			{/if}
			{#if font.capitalization !== 'none'}
				text-transform: {font.capitalization};
			{/if}
		</code>
	</pre>

	<div class="example">
		<label class="screen-reader" for={makeId('example-text')}> text example </label>
		<div
			style="
        font-family: {!reduceData ? `${font.name}` : `var(${font.variable})`};
        font-variation-settings: {createFontStyles(font.variationSettings)};
        text-transform: {font.capitalization};
        font-style: {font.italic ? 'italic' : 'unset'};
				/* lol, wut */
				/* stylelint disable custom-property-empty-line-before */
				--reduced-data-font: var({font.variable});
			"
		>
			<textarea id={makeId('example-text')} class="example" wrap="hard" bind:value={font.text} />
			<p>
				{characters.join(' ')} <br />
				{numbers.join(' ')} <br />
				{symbols.join(' ')} <br />
				{codeLigatures.join(' ')} <br />
			</p>
		</div>
	</div>
</section>

<style lang="postcss">
	.variable-font {
		display: grid;
		gap: 1rem;
		grid-template-columns: 30ch 1fr;
		grid-template-rows: auto auto 1fr;
		padding-block: 1rem;

		& header {
			grid-column: 1 / -1;
			font-size: 1.5em;

			& > span {
				display: block;
				font-size: 0.75em;
			}
		}

		& > *:not(a) {
			flex: 1;
		}

		& .example {
			grid-column: span 2;

			& textarea {
				font-size: 2.5em;
			}

			& textarea,
			& p {
				font-family: inherit;
				font-variation-settings: inherit;
				font-style: inherit;
				text-transform: inherit;
				border: none;
				width: 100%;
				resize: block;
			}
		}
	}
</style>
