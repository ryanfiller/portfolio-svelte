export function addSrcset(src) {
	return [
    `srcset="${src}?nf_resize=fit&w=500 500w, ${src}?nf_resize=fit&w=800 800w"`,
    `src="${src}?nf_resize=fit&w=500"`
  ]
}