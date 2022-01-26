<script context='module'>
	export function load({ error, status }) {
		return {
			props: { error, status }
		}
	}
</script>

<script>
	export let status
	export let error

	import { dev } from '$app/env'

  import pointer from './404/_images/pointer.svg'

	if (dev) {
		console.error('ERROR: ', error)
	}

	import Page from '../layouts/page.svelte'

	const images = [
		{
			src: 'https://media4.giphy.com/media/xT8qB3BUj2pB38iQAE/giphy.gif',
			alt: 'river in the woods',
			attribution: 'livingstills.tumblr.com'
		},
		{
			src: 'https://media0.giphy.com/media/l3vRbNFMuFt5Zm372/giphy.gif?cid=ecf05e47d908e444651a6c122e1739efed59f8df375d216e&rid=giphy.gif',
			alt: 'dripping water',
			attribution: 'livingstills.tumblr.com'
		},
		{
			src: 'https://media3.giphy.com/media/26CYAE1nLf19gYXq8/giphy.gif?cid=ecf05e473pxs2xw6oq9ygvqulljvl0k52m3wc6bssswmfhd0&rid=giphy.gif',
			alt: 'cars driving on a road',
			attribution: 'livingstills.tumblr.com'
		},
		{
			src: 'https://media2.giphy.com/media/3oz8xzu5rGNn9wL9de/giphy.gif?cid=ecf05e47f9145d657e2090297aeafa0a4d47c6d491a6e0f6&rid=giphy.gif',
			alt: 'blinking lights and stars',
			attribution: 'livingstills.tumblr.com'
		},
		{
			src: 'https://media1.giphy.com/media/3ohhwm9bWrw1S1XsMU/giphy.gif?cid=ecf05e478311a686def6a05ddf7edf37c59195f8daaff023&rid=giphy.gif',
			alt: 'water on a shore',
			attribution: 'livingstills.tumblr.com'
		},
		{
			src: 'https://media3.giphy.com/media/5xtDarD4zapgLTrcjv2/giphy.gif?cid=ecf05e473d611329148a7f9503126d622a12c4dbecb1bc95&rid=giphy.gif',
			alt: 'dripping water by a fence',
			attribution: 'jerology.tumblr.com'
		},
		{
			src: 'https://media3.giphy.com/media/ToMjGpt2bhrZSRvWpS8/giphy.gif?cid=ecf05e47de74711205eefabb925ed234aa7ddad6bae06f28&rid=giphy.gif',
			alt: 'a campfire',
			attribution: 'jerology.tumblr.com'
		},
		{
			src: 'https://media3.giphy.com/media/5xtDarz1i15iQNbCARW/giphy.gif?cid=ecf05e47q6ls6i7c2jun9x9eoe03fcz9tmsly8epq3n4zax4&rid=giphy.gif',
			alt: 'river during the autumn',
			attribution: 'jerology.tumblr.com'
		},
		{
			src: 'https://media2.giphy.com/media/lkimn0qpby38zMJMY/giphy.gif?cid=ecf05e475f15148e43be5fab65df7f13fccf834c59917b30&rid=giphy.gif',
			alt: 'lightning behind a tree',
			attribution: 'gingerflicks.tumblr.com'
		},
		{
			src: 'https://media2.giphy.com/media/3EAKxdUkPyURk8T6us/giphy.gif?cid=ecf05e476lwv55hzzdbk6ssehdzk9irg3ir3hz6bsfxtv2r2&rid=giphy.gif',
			alt: 'train going under and underpass',
			attribution: 'alcrego.tumblr.com'
		},
		{
			src: 'https://media1.giphy.com/media/3o7525lK1GdxxMELIY/giphy.gif?cid=ecf05e47f53f7cfc134b319a0176fd58ae1762e8c94f549e&rid=giphy.gif',
			alt: 'snow and evergreen trees',
			attribution: 'earthjustice.org'
		},
		{
			src: 'https://media1.giphy.com/media/p5he4jDgEPeUg/giphy.gif?cid=ecf05e47wrgl50pkd3qhhdr4hdvzh8lpwwtwwxo6kh2r37zo&rid=giphy.gif',
			alt: 'power lines in a wheat field',
			attribution: 'reddit.com/u/Srirachachacha'
		},
		{
			src: 'https://media1.giphy.com/media/K5fXAsXqSWMOk/giphy.gif?cid=ecf05e476d69616182b0bbbb29d100c0ed2907eadd0d4b54&rid=giphy.gif',
			alt: 'power lines in a wheat field',
			attribution: 'reddit.com/u/[deleted]'
		},
		{
			src: 'https://media3.giphy.com/media/xULW8Izi4yYrMLSVxu/giphy.gif?cid=ecf05e47548b0fdb1a9e9e470f6eafa95ede9e695253df60&rid=giphy.gif',
			alt: 'sunset by an overpass',
			attribution: 'newyorkermag.com'
		},
	]

	$: image = images[Math.floor(Math.random() * images.length)]
</script>

<style>
  :global(#site[data-segment='error'] #content) {
    color: var(--colorWhite);
    font-family: var(--fontDisplay);
    font-size: 2rem;
    text-transform: uppercase;
    height: 100%;
    position: relative;
    overflow: hidden;
  }

  article {
    height: 100%;
    grid-template-rows: 1fr auto 1fr auto 1fr;
  }

  header {
    grid-row: 2 / 3;
  }

  h1 {
    font-size: 3em;
    display: flex;
    flex-wrap: wrap;
    flex-direction: row-reverse;
    justify-content: space-between;
    margin: 0 0 10vh 0;

    & span {
      display: inline-block;
    }
  }

  pre {
    white-space: pre-line;
  }

  ul {
    margin: 0;
    padding: var(--padding);
    background-color: var(--colorPrimary);
    position: relative;
    list-style: none;
    border-radius: var(--pixelBorderRadius);
    display: flex;
    flex-wrap: wrap;
    grid-row: 4 / 5;

    &::before,
    &::after {
      content: '';
      display: block;
      position: absolute;
      top: -1px;
      right: -1px;
      bottom: -1px;
      left: -1px;
      pointer-events: none;
    }

    &::before {
      background: var(--pixelBorder);
      z-index: 3;
    }

    &::after {
      background: var(--steppedGradient);
      border-radius: var(--pixelBorderRadius);
      z-index: 1;
      opacity: 0.75;
      mix-blend-mode: overlay;
    }
  }

  li {
    margin: 0;
    display: block;
    flex-basis: 25ch;
  }

  a {
    position: relative;
    color: var(--colorLight);
    display: inline-flex;
    align-items: center;
    padding: 0.5em;
    padding-left: 0;
    line-height: 0;
    cursor: none;
    text-decoration: none;
    transition: 0;

    &:hover,
    &:focus {
      transform: translate(var(--borderWidth), calc(-1 * var(--borderWidth)));
      text-shadow: calc(-1 * var(--borderWidth)) var(--borderWidth) var(--colorBlack);
    }

    &::before {
      content: '';
      display: block;
      height: 1em;
      width: 1.25em;
      margin-right: 0.5em;
      background-size: contain;
      background-repeat: no-repeat;
    }

    &:hover::before,
    &:focus::before {
      background-image: var(--pointerSvg);
    }
  }

  figure {
    position: absolute;
    top: -1px;
    right: -1px;
    bottom: -1px;
    left: -1px;
    padding: 0;
    margin: 0;
    z-index: -1;
    background: var(--pixelGrid);
    background-color: var(--colorHighlight);
  }

  img {
    height: 100%;
    width: 100%;
    object-fit: cover;
    object-position: center center;
    filter: grayscale(100%);
    mix-blend-mode: overlay;
  }

  figcaption {
    font-size: 1rem;
    position: absolute;
    bottom: var(--padding);
    right: var(--padding);
    z-index: 10;
    font-family: var(--fontMono);
  }
</style>

<Page
  segment='error'
  hideBanner
  title={`Error - ${status}`}
>
	<article class='columns'>
		<header>
			<h1>
				<span class='code'>
					{status}
				</span>
				<span class='message'>
					{error.message}
				</span>
			</h1>
			{#if dev && error.stack}
				<pre>{error.stack}</pre>
			{/if}
		</header>

		<ul style={`--pointerSvg: url('${pointer}')`}>
			<li>
				<a href='/'>Go home</a>
			</li>
			<li>
				<a href={null} on:click={() => history.back()}>Go back</a>
			</li>
			<li>
				<a href='/blog'>Read some blogs</a>
			</li>
			<li>
				<a href='/#contact'>Contact Me</a>
			</li>
		</ul>
		{#if image}
			<figure>
				<img alt={image.alt} src={image.src} />
				{#if image.attribution}<figcaption>image source: {image.attribution}</figcaption>{/if}
			</figure>
		{/if}
	</article>
</Page>
