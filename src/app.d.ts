// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface Platform {}
	}
}

declare global {
	interface Window {
		// there are more properties here, this is just the only ever called directly
		goatcounter: { count: function }
	}
}

export {}
