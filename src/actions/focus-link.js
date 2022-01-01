export default function focusLink(element) {
  element.addEventListener('click', event => {
    const hash = event.target.hash.replace('#', '')
    const target = document.getElementById(hash)
    if (target) target.focus()
  })
}