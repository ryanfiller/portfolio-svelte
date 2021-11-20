---
title: Refactoring a Component for Accessibility
banner:
  src: '/images/robson-park-stairs.jpg'
  alt: 'Robson Square, Vancouver stairs and ramp'
  attribution: 'City of Vancouver, Canada'
options:
  published: true
meta:
  categories:
    - code
  date: 2020-02-13
  excerpt: >-
    Refactoring a component to use an html5 <details> element instead of ARIA
    and JavaScript.
  tags:
    - accessibility
    - ARIA
    - html5
---

![RX-78-2 slicing a Zaku in half](/images/gundam_v_zaku_1979.jpg){data-caption="Mobile Suit Gundam '79, Sunrise / Bandai" data-align="right"}

A few months ago when I decided to start my website from scratch I also decided I would also keep a detailed [change log](/changes). This was meant to track the progression of my code, but also my thought process of *why* I was doing things. The version names are completely arbitrary, but I thought it might be fun to name them after [giant robots from the Gudam UC timeline](https://gundam.fandom.com/wiki/RX-78_Gundam_Series). In universe those follow some semblance of [semantic versioning](https://semver.org/), and also I am also a huge dork.

After only a few "versions" this page started to get pretty long. I wanted to add a basic accordion feature to it - each change set would have a header and a summary and the details would be collapsible. My specific component was built in React, but the idea is pretty universal. A button would toggle between the open and closed state, that state wouldbe represented bya class on the wrapping element. CSS would use that class to determine when to show the details.

```javascript
const Change = props => {

  const [state, toggleOpen] = useState(false)

  return (
    <section className={'change', open ? 'open' : ''}>
      <h2>{change title}</h2>
      <p>{summary text}</p>
      <ul>
        {...a list of changes}
      </ul>
      <button 
        onClick={() => toggleOpen(!open)}
      >
        Read {!open ? 'More' : 'Less'}...
      </button>
    </section>
  )
}
```

The styles were also pretty simple.

```scss
.change {
  ul {
    max-height: 0;
    overflow: hidden;
    transition: .2s;
  }

  &.open {    
    ul {
      max-height: 100vh;
    }
  }
}
```

## I had good, but lazy intentions about using ARIA

Reading that code I know it might not seem like it, but I care about accessibility. I really, really do. I did some quick searching and I found the [ARIA](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA) [`role="switch"`](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/Switch_role) and added that to my button, because hey, the button is switching between an "on" and "off" state.

```javascript
<button 
  onClick={handleToggleOpen}
  role="switch"
  aria-checked={open}
>
  Read {!open ? 'More' : 'Less'}...
</button>
```

Because I do care about accessibility, and it is hard, I use a tool in my testing suite called [Jest aXe](https://www.npmjs.com/package/jest-axe). I know it says in big, bold letters at the top of the page that "this project does not guarantee what you build is accessible," but the code I had written passed an automated test.

```javascript
describe('<Change/>', () => {
  it('should render correctly', async () => {
    const component = mount(<Chage {...props} />)
    expect(await axe(component.html())).toHaveNoViolations()
  })
})
```

## *Actually* Making The Component Accessible

After I did more reading, I realized there are several things wrong with the component:

* The button is not linked in any way with the section that it controls.
* There are no attributes on the `<section>` element indicating the open/closed state.
* The hidden section is only hidden with css, there is nothing in the markup to indicate whether or not it is visible.

An actually accessible implementation would have needed to look something more like this.

```javascript
const Change = props => {

  const [state, toggleOpen] = useState(false)

  return (
    <section 
      className={'change', open ? 'open' : ''}
      id="toggle-section"
      aria-expanded={open}
    >
      <h2>{change title}</h2>
      <p>{summary text}</p>
      <ul
        aria-hidden={!open}
      >
        {...a list of changes}
      </ul>
      <button 
        onClick={() => toggleOpen(!open)}
        role="switch"
        aria-checked={open}
        id="toggle-button"
        aria-controls="toggle-section"
      >
        Read {!open ? 'More' : 'Less'}...
      </button>
    </section>
  )
}
```

This isn't an unbearable amount of changes, but it was enough that I was nervous to mess it up or still miss something important. Also each section `id` would need be unique in every instance of the `<Change>` component. In my experience, the best way to make something accessible and repeatable was to make it as automatic as possible, and my data wasn't set up in a way that would make that easy to do.

## Is There An Easier Way?

HTML5 introduced a ton of new [semantic elements](https://developer.mozilla.org/en-US/docs/Glossary/Semantics#Semantic_elements). These are native browser elements that come with inherent meaning attached to them. Most people are probably familiar with some of the oldest semantic elements, like `<h1>,` `<p>`, `<ol>`, or even some of the newer ones like `<header>`, `<footer>`, or `<nav>`. There is actually a set of elements that were made for *exactly* what I'm trying to do here - [`<details>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/details) and [`<summary>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/summary).

> The **HTML Details Element (`<details>`)** creates a disclosure widget in which information is visible only when the widget is toggled into an "open" state. A summary or label can be provided using the [`<summary>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/summary "The HTML Disclosure Summary element (\<summary>) element specifies a summary, caption, or legend for a \<details> element's disclosure box.") element.

There are a lot of great articles (I like [this one](https://css-tricks.com/why-how-and-when-to-use-semantic-html-and-aria/) a lot) about ARIA vs native semantic elements, but they all basically drive home this one point - you don't have to fight against what browsers developers program native elements to do.

```html
<div role="heading" aria-level="1">This is not incorrect..</div>

<h1>...but this is better. And more simple.</h1>
```

## Refactoring to Use Native Elements

```javascript
const Change = props => {

  const [state, toggleOpen] = useState(false)

  return (
    <section className='change' >
      {change title}
      <p>
        {summary text}
      </p>
      <details>
        <summary>
          Version Details
        </summary>
        <ul>
          {... a list of changes}
        </ul>
      </details>
    </section>
  )
}
```

This component is now screen reader friendly still passes a Jest aXe test. *And* doesn't even need extra javascript or css to toggle states!

<section class="change" style="border: 1px solid currentColor; padding: 1em;">
  <strong>Change Title</strong>
  <p>
    Summary Text
  </p>
  <details>
    <summary>
      Version Details
    </summary>
    <ul>
      <li>a</li>
      <li>list</li>
      <li>of</li>
      <li>changes</li>
    </ul>
  </details>
</section>

## Progressive Enhancements

The `<details>` element is notoriously hard to style, but the spec does offer a few animation entry points. The element state is exposed and can be grabbed with the css attribute `[open]`, so it is possible to add some conditional styles with this value is present.

<iframe data-aspect-ratio="4/3" title="html 5 detail animate" src="https://codepen.io/ryanfiller/embed/wvaBVJP?default-tab=css,result"></iframe>

The element can also be controlled with javascript by manually setting the details' `open` attribute to `true` or `false`. With the [help of an animation library](https://github.com/ryanfiller/portfolio-gatsby-v2/blob/701c0c6eced340f61d2f6ec817272d727690d907/src/components/change.js) I was able to do a [pretty smooth open animation](/changes/#rf-05-02-full-burnern).

## Try Not to Fight Against what HTML Already Wants to Do

My rule of thumb is that if I ever feel overwhelmed with ARIA attributes, I'm probably doing too much. Html has come a long way since the launch of HTML5 in 2015, and thanks to the new "Living Standard" of the spec new features are added with somewhat regularity. The web is getting better all the time, so it's always a good idea to check back now again and see if a common problem like making an accessible dropdown component has been lifted up into the official language itself.
