<script>
  let width = '250'
  const handleWidthChange = event => width = event.target.value
  $: params = `?nf_resize=fit&w=${width}`
</script>

<style>
  pre {
    width: 100%;
    margin: 0;
    transform: none;
    left: 0;
  }

  .image-resize-example {
    margin: var(--padding) 0;

    & label {
      display: block;
      width: 100%;
    }

    & input {
      width: 100%;
    }

    & img {
      display: block;
      margin: 0 auto;
      max-width: 100%;
    }
  }
</style>

<div class='image-resize-example'>
  <label for='width'>image width</label>
  <input
    type='range'
    id='width'
    min='50'
    max='550'
    step='100'
    value={width}
    on:change={handleWidthChange}
  />
  <pre>{`<img src="image.jpg${params}" />`}</pre>
  <img alt="dog placeholder, her name is Ollie" src={`/placeholders/jpeg.jpg${params}`}/>
</div>
