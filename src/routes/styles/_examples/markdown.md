<div id="headings">

<!-- # Heading level 1 -->
## Heading level 2
### Heading level 3
#### Heading level 4
##### Heading level 5
###### Heading level 6

</div>

---

<div id="text">

Nulla vitae elit libero, a pharetra augue. [This is an internal link.](/) Maecenas sed diam eget risus varius blandit sit amet non magna. [This is ALSO an internal link.](/blog) Maecenas sed diam eget risus varius blandit sit amet non magna. [This is a link to an external site.](https://sapper.svelte.dev) Aenean lacinia bibendum nulla sed consectetur. [This is a link to a subdomain.](https://colors.ryanfiller.com)

Cras mattis consectetur purus sit amet fermentum. Vestibulum id ligula porta felis euismod semper. Maecenas sed diam eget risus varius blandit sit amet non magna. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Cras mattis consectetur purus sit amet fermentum. Praesent commodo cursus magna, vel scelerisque nisl consectetur et.

*Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.*
_Sed posuere consectetur est at lobortis._
_*Nulla vitae elit libero, a pharetra augue.*_

- Donec sed odio dui.
- Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
- Lorem ipsum dolor sit amet, consectetur adipiscing elit.
  - Donec sed odio dui.
  - Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
  - Lorem ipsum dolor sit amet, consectetur adipiscing elit.

1. Donec sed odio dui.
2. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
3. Lorem ipsum dolor sit amet, consectetur adipiscing elit.

</div>

---

<div id="code">

This is an `inline code sample`.

These are line highlighted code blocks:

```html {1, 3-5, 11}
<!DOCTYPE html>
<html>
  <head>
    <title>This is a title</title>
  </head>
  <body>
    <div>
        <p>Hello world!</p>
    </div>

    <!-- other markup goes here -->
  </body>
</html>
```

```css {2,3}
h1 {
  /* purple is my favorite color! */
  color: purple;
}
```

```javascript {3, 10}
function factorial(n) {
  if (n === 0) {
    return 1; // 0! = 1
  }

  return n * factorial(n - 1);
}

// returns 6
factorial(3);
```

</div>

---

<div id="blockquotes">

> Any sufficiently advanced technology is indistinguishable from magic.
> ***
> [Arthur C. Clarke](https://en.wikipedia.org/wiki/Arthur_C._Clarke)

> Unless someone like you cares a whole awful lot,
> Nothing is going to get better. It's not.
> ***
> The Lorax

<blockquote class="twitter-tweet"><p lang="en" dir="ltr">I need to make a tweet embed component for my blog.</p>&mdash; Ryan Filler (@ryanfiller_) <a href="https://twitter.com/ryanfiller_/status/1259280535421140998?ref_src=twsrc%5Etfw">May 10, 2020</a></blockquote>

</div>

---

<div id="tables">

<!-- TODO need to figure out how to do table caption -->
<!-- ?? https://www.npmjs.com/package/remark-grid-tables -->

| Eddard Stark          | Jon Snow                   | Arya Stark               |
|:--------------------- |:-------------------------- |:------------------------ |
| Has a sword named Ice | Has a sword named Longclaw | Has a sword named Needle |
| No direwolf           | Direwolf: Ghost            | Direwolf: Nymeria        |
| Lord of Winterfell    | Knows nothing              | No one                   |

</div>