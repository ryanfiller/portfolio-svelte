import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { render } from '@testing-library/svelte'

import Navigation from '/src/components/navigation.svelte'

import { mainNav } from '../../src/site-config.js';

describe('<Navigation />', () => {
	let component

	function props() {
		return ({
			boundElements: [undefined]
    })
  }

  // I don't really think this one is possible...
  // it('sets the correct global styles', () => {
  //   component = render(Navigation, props())
  //   screen.debug()
  // })

	describe('rendering the links', () => {
    it('renders them all', () => {
      component = render(Navigation, props())
      const links = [...document.getElementsByTagName('a')]
      expect(links.length).toEqual(mainNav.length)
    })

    it('distinguishes between explicit and implicit urls', () => {
      component = render(Navigation, props())

      // don't make these tests fails if the links are commented out in `site-config.js`
      if (mainNav.hasOwnProperty('blog')) {
        expect((component.getByText('blog') as HTMLAnchorElement).href).toEqual('/blog')
      }
      if (mainNav.hasOwnProperty('lab')) {
        expect((component.getByText('r&d') as HTMLAnchorElement).href).toEqual('/lab')
      }
      if (mainNav.hasOwnProperty('contact')) {
        expect((component.getByText('contact') as HTMLAnchorElement).href).toEqual('#contact')
      }
    })
  })

  describe.only('interacting with the right drawer', () => {
    let matchMedia: Function
    beforeEach(() => {
      matchMedia = window.matchMedia
    })
    afterEach(() => {
      (window.matchMedia as Function) = matchMedia
    })

    describe('small screen size', () => {
      beforeEach(() => {
        (window.matchMedia as Function) = vi.fn(() => ({ matches: true, addEventListener: vi.fn() }))
      })

      it('renders "inside" the drawer', () => {
        component = render(Navigation, props())
        const links = [...document.getElementsByTagName('a')]

        links.forEach((link) => {
          expect(link.getAttribute('data-right-drawer')).toEqual('false')
        })
      })
    })

    describe('large screen size', () => {
      beforeEach(() => {
        (window.matchMedia as Function) = vi.fn(() => ({ matches: false, addEventListener: vi.fn() }))
      })

      it('renders "outside" the drawer', () => {
        component = render(Navigation, props())
        const links = [...document.getElementsByTagName('a')]

        links.forEach((link) => {
          expect(link.getAttribute('data-right-drawer')).toEqual('true')
        })
      })
    })
  })
})
