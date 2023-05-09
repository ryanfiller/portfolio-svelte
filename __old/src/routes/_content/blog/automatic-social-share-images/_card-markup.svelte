<style>
  .exapmle-wrapper {
    margin: 0 auto;
  }

  .exapmle-preview {
    /* intentionally Gatsby theme colors and font */
    background: #663390;
    color: #fefefe;
    font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif !important;
    font-size: clamp(0.125vw, 1.155vw, calc(0.01175 * 65rem)); /* I got to 0.01175 by trial and error... */
    height: 45em; /* height: 630px; */
    width: 80em; /* width: 1200px; */
    padding: 2em;
    margin: 0 auto;
    position: relative;
  }

  .exapmle-preview :not(img) {
    position: relative;
    z-index: 2;
  }

  .exapmle-content {
    font-size: 1em;
    height: 100%;
    width: 100%;
    padding: 2em;
    border: 0.125em solid currentColor;
    display: grid;
    gap: 2em;
    grid-template-rows: 1fr auto auto 1fr auto auto auto;
    grid-template-columns: 3fr 2fr 1fr;
    grid-template-areas:
      ".       .            ."
      "title   title        ."
      "tags    tags         ."
      "url     url          url"
      ".       .            ."
      ".       attribution  attribution"
      "author  attribution  attribution";
  }

  .exapmle-title {
    margin: 0;
    font-size: 6.5em;
    grid-area: title;
  }

  .exapmle-tags {
    grid-area: tags;
    font-size: 2em;
    list-style: none;
    padding: 0;
    margin: 0;
  }

  .exapmle-tags li {
    display: inline;
  }

  .exapmle-tags li:not(:last-child)::after {
    content: ', ';
  }

  .exapmle-url {
    grid-area: url;
    display: block;
    font-size: 2em;
  }

  .exapmle-author {
    grid-area: author;
    display: block;
    font-size: 3em;
  }

  .exapmle-attribution {
    grid-area: attribution;
    font-size: 1em;
    text-align: right;
    align-self: end;
    margin: 0;
  }

  .exapmle-attribution span {
    display: block;
  }

  .exapmle-image {
    position: absolute;
    z-index: 1;
    top: -1px;
    right: -1px;
    bottom: -1px;
    left: -1px;
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center center;
    filter: grayscale(100%);
    opacity: 0.5;
    mix-blend-mode: overlay;
    margin: 0;
  }

</style>

<!-- svelte-ignore best-practice -->
<!-- ARIA role="presentation" here is intentional -->
<figure>
  <div class="exapmle-wrapper">
    <div class="exapmle-preview">
      <main class="exapmle-content" role="presentation">
        <h1 class="exapmle-title" role="presentation">
          {`{title}`}
        </h1>
        <ul class="exapmle-tags">
          <li>
            {`{category}`}
          </li>
          <li>
            {`{tag}`}
          </li>
          <li>
            {`{tag}`}
          </li>
          </ul>
        <span class="exapmle-url">
          www.url.com
        </span>
        <span class="exapmle-author">
          @ryanfiller_
        </span>
        <p class="exapmle-attribution">
        <span>
          Image Credit:
        </span>
        <span>
          {`{image credit}`}
        </span>
        </p>
      </main>
      <img class="exapmle-image" src='/images/blank-image-checkers.jpg' alt='intentionally blank' />
    </div>
  </div>
  <figcaption>card rendered in markup</figcaption>
</figure>
