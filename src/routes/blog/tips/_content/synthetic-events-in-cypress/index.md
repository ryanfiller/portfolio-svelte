---
title: Testing Synthetic Events in Cypress
options:
  published: true
meta:
  date: 2021-08-31
  excerpt: How to call the underlying native events in automated testing
  categories:
    - code
  tags:
    - testing
    - cypress
---

<script>
  import Note from '../../../../../components/misc/note.svelte'
  import { Tab, Tabs } from '../../../../../components/misc/tabs'
</script>

## What?

Synthetic events are, by definition, events that do not belong natively to the browser. Instead, a Synthetic Event is a wrapper that some JavaScript frameworks use around a browser's [event specification](https://www.w3.org/TR/DOM-Level-3-Events/). In modern web development, Synthetic Events are probably most well known for their use in [React](https://reactjs.org/).

## Why?

`console.log`ing the `event` emitted from a native `click` event looks very different than an `onClick` event in React, especially the [`prototype`](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Objects/Object_prototypes) of the two events. The native event returns an `EventPrototype` object while the synthetic event returns a generic `Object` prototype. A `jquery` event is _also_ called with a generic `Object`, albeit with different attributes than the synthetic event.


<Tabs name='log a click event'>
  <Tab title='native click'>

  ```javascript
  click {
    target: button#button, 
    buttons: 0, 
    clientX: 42, 
    clientY: 22, 
    layerX: 42, 
    layerY: 22
  }
  ```

  </Tab>
  <Tab title='synthetic click'>

  ```javascript
  Object {
    _reactName: "onClick", 
    _targetInst: null, 
    type: "click", 
    nativeEvent: click, 
    target: button, 
    currentTarget: button, 
    eventPhase: 3, 
    bubbles: true, 
    cancelable: true, 
    timeStamp: 33225,
    ...
  }
  ```

  </Tab>
  <Tab title='jquery click'>

  ```javascript
  Object {
    originalEvent: click,
    type: "click",
    isDefaultPrevented: ha(),
    timeStamp: 73322,
    jQuery222049259296493923765: true,
    toElement: undefined,
    screenY: 298,
    screenX: 125,
    pageY: 98,
    pageX: 60,
    ...
  }
  ```

  </Tab>
</Tabs>

The new-ish [HTML5 input `types`](https://developer.mozilla.org/en-US/docs/Learn/Forms/HTML5_input_types), especially ones that offer custom UI such as [`type="range"`](https://developer.mozilla.org/en-US/docs/Learn/Forms/HTML5_input_types#Slider_controls) and [`type="color"`](https://developer.mozilla.org/en-US/docs/Learn/Forms/HTML5_input_types#Color_picker_control), emit even more complicated events. These components are internally running a form of JavaScript, but are using something called the [Shadow DOM](https://developer.mozilla.org/en-US/docs/Web/API/ShadowRoot) to encapsulate their functionality. Understanding precisely how this works doesn't necessarily matter for testing, but [this article](https://bitsofco.de/what-is-the-shadow-dom/) from [Ire Aderinokun](https://twitter.com/ireaderinokun) explains exactly what the Shadow DOM is and how it works.

<Tabs name='log a change event'>
  <Tab title='native change'>

  ```javascript
  change {
    target: input#native-input,
    isTrusted: true,
    srcElement: input#native-input,
    currentTarget: input#native-input,
    eventPhase: 2,
    bubbles: true,
    cancelable: false,
    returnValue: true,
    defaultPrevented: false,
    composed: false,
    ...
  }
  ```

  </Tab>
  <Tab title='synthetic change'>

  ```javascript
  Object {
    _reactName: "onChange",
    _targetInst: null,
    type: "change",
    nativeEvent: input,
    target: input,
    currentTarget: input,
    eventPhase: 3,
    bubbles: true,
    cancelable: false,
    timeStamp: 94950,
    ...
  }
  ```

  </Tab>
  <Tab title='jquery change'>

  ```javascript
  Object {
    originalEvent: change,
    type: "change",
    isDefaultPrevented: ha(),
    timeStamp: 3236,
    jQuery22206821608458388928: true,
    which: undefined,
    view: undefined,
    target: input#jquery-input,
    shiftKey: undefined,
    relatedTarget: undefined,
    ...
  }
  ```

  </Tab>
</Tabs>

I put together a very basic [CodePen example](https://codepen.io/ryanfiller/pen/YzQXGNM) to explore more what each event type will output to the console.

### What's the issue with testing?

Problems arise when using testing frameworks, like Cypress and Cucumber, that rely on using jQuery to try to call DOM events. They do an okay job with older inputs using `click` events, but oftentimes choke on newer inputs with slightly different browser implementations.


The most common error I have personally run across is a test runner will use jQuery to invoke a change, the native DOM element will correctly update, but the `event` will not be properly caught by the frontend framework. This shows up visually as an input having changed, but none of the other updates it should trigger elsewhere will be reflected.

![cypress.io test running showing the the range input has been changed to 500 but DOM dependents still show 100](/images/cypress-changed-input-no-side-effect.png){data-caption='The range input has changed to 500, but the textarea and visual styles still reflect a "wght" value of 100'}

## How?

The most reliable way I have found to work around this issue is to use [getOwnPropertyDescriptor](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/getOwnPropertyDescriptor) to fish the `.set()` method from a browser's [`HTMLInputElement` object](https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement). That native method can then be called directly and attached to a DOM input element using the [`.dispatchEvent()` method](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/dispatchEvent).

``` javascript
const nativeInputValueSetter = Object.getOwnPropertyDescriptor(
  window.HTMLInputElement.prototype,
  'value'
).set

const changeInputValue = inputToChange => newValue => {
  nativeInputValueSetter.call(inputToChange[0], newValue)
  inputToChange[0].dispatchEvent(new Event('change', {
    newValue,
    bubbles: true
  }))
}
```

This function uses Cypress's jQuery interface to create an event, but still makes sure the full event is fired from the browser in a way that it can be caught by the framework's event listening system. 

It is important to set `bubbles: true` in the `dispatchEvent` configuration object so that the event will [`bubble`](https://developer.mozilla.org/en-US/docs/Web/API/Event/bubbles) up until the framework can catch it. This is especially true of any framework using synthetic events, [like React](https://reactjs.org/blog/2020/08/10/react-v17-rc.html#aligning-with-browsers), as they sometimes use a single event listener and delegate responses to the appropriate DOM nodes.

To make this function more reusable, it can be added as a [custom command](https://docs.cypress.io/api/cypress-api/custom-commands) within the `cypress/support/commands.js` file.

```javascript {3, 17, 20}
// cypress/support/commands.js

Cypress.Commands.add('inputChange', (input, value) => {
  const nativeInputValueSetter = Object.getOwnPropertyDescriptor(
    window.HTMLInputElement.prototype,
    'value'
  ).set

  const changeInputValue = inputToChange => newValue => {
    nativeInputValueSetter.call(inputToChange[0], newValue)
    inputToChange[0].dispatchEvent(new Event('change', {
      newValue,
      bubbles: true
    }))
  }

  return cy.get(input).then(input => {
    changeInputValue(input)(value)
  })
})
```

This command can now be called anywhere the `cy` global object is available.

```javascript
// range-input.spec.js

cy.get('#range-input').then(input => cy.inputChange(input, '15'))
```

<Note title="A note about other End to End to Runners">

  This post is specifically about [Cypress](https://www.cypress.io/), which is the testing framework that this site currently uses. I've encountered and fixed this exact problem in [Cucumber](https://cucumber.io/), the testing framework I use for Ruby code at work. The commonality between these two frameworks is they both use [jQuery](https://jquery.com/) to orchestrate DOM events. There are a _lot_ of testing frameworks out there, if the one you are using is also dependent on jQuery, this post might be helpful to you.

</Note>