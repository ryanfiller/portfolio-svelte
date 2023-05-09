import { c as create_ssr_component, v as validate_component } from "../../chunks/index.js";
const logo = '<?xml version="1.0" encoding="UTF-8"?>\n<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 480 145" preserveAspectRatio="xMinYMin slice">\n  <path class="r one" d="m15,35L0,50l15,15v35l15,15,15-15-15-15v-35l-15-15Zm45,15l-15-15-15,15,15,15,15-15Z"/>\n  <path class="y" d="m80,85v-15l-15-15-15,15,15,15v15l15,15,15-15-15-15Zm0-35l15,15v65l15-15V50l-15-15-15,15Zm-15,80l15,15,15-15-15-15-15,15Z"/>\n  <path class="a" d="m160,50l-15-15-15,15,15,15v35l15,15,15-15-15-15v-35Zm-30,0l-15,14.5v35.5l15,15,15-15-15-15v-35Z"/>\n  <path class="n" d="m190,50l-15-15-15,15,15,15v35l15,15,15-15-15-15v-35Zm30,35v-35l-15-15-15,15,15,15v35l15,15,15-15-15-15Z"/>\n  <path class="f" d="m250,30v85l-15,15,15,15,15-15V15l-15,15Zm45-15l-15-15-15,15,15,15,15-15Zm-15,20l-15,15,15,15,15-15-15-15Z"/>\n  <path class="i" d="m300,55l-15,15v30l15,15,15-15-15-15v-30Z"/>\n  <path class="l one" d="m330,15l-15-15-15,15,15,15v70l15,15,15-15-15-15V15Z"/>\n  <path class="l two" d="m360,15l-15-15-15,15,15,15v70l15,15,15-15-15-15V15Z"/>\n  <path class="e" d="m390,50v35l15,15-15,15-15-15v-35.5l15-14.5Zm0,0l12.5,12.5-12.5,12.5,15,15,15-15-12.5-12.5,12.5-12.5-15-15-15,15Z"/>\n  <path class="r two" d="m435,35l-15,15,15,15v35l15,15,15-15-15-15v-35l-15-15Zm45,15l-15-15-15,15,15,15,15-15Z"/>\n</svg>\n';
const logo_svelte_svelte_type_style_lang = "";
const css$1 = {
  code: "figure.svelte-12fpgpa{--transition-speed:0.2s;resize:horizontal;overflow:hidden;width:50vw;min-width:7.5em;max-width:33.125em;padding:1rem;container-type:inline-size;display:flex;justify-content:center}figure.svelte-12fpgpa svg{display:block;height:10em;width:100%;max-width:7.5em;color:black;transition-duration:var(--transition-speed)}figure.svelte-12fpgpa svg path{fill:currentcolor;stroke:currentcolor;stroke-linecap:round;stroke-width:1}figure.svelte-12fpgpa svg path:where(.f){transform:translateX(-11.75em)}figure.svelte-12fpgpa svg path:where(:not(.r.one):not(.f)){opacity:0}@container (min-width: 33.125em){figure.svelte-12fpgpa svg{width:100%;max-width:33.125em}figure.svelte-12fpgpa svg path{opacity:1;transform:translateX(0);transition-duration:var(--transition-speed);transition-delay:calc(var(--transition-speed) * (0.25 * var(--transition-index)))}figure.svelte-12fpgpa svg path:where(.f){transition-delay:calc(var(--transition-speed) / var(--transition-index))}}",
  map: null
};
function addTransitionDelay(svg) {
  return svg.split("\n").map((part, index) => {
    if (part.includes("<path")) {
      return part.replace("<path", `<path style="--transition-index: ${index}"`);
    } else {
      return part;
    }
  }).join("\n");
}
const Logo = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  $$result.css.add(css$1);
  return `<figure data-testid="${"logo"}" class="${"svelte-12fpgpa"}"><!-- HTML_TAG_START -->${addTransitionDelay(logo)}<!-- HTML_TAG_END -->
</figure>`;
});
const _page_svelte_svelte_type_style_lang = "";
const css = {
  code: "body{width:100dvw;height:100dvh;overflow:hidden;display:flex;align-items:center;justify-content:center}",
  map: null
};
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  $$result.css.add(css);
  return `<main>${validate_component(Logo, "Logo").$$render($$result, {}, {}, {})}
	
	
</main>`;
});
export {
  Page as default
};
