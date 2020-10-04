<style global>
  @font-face {
    font-family: 'Science Gothic';
    src: url('/fonts/ScienceGothicVF.ttf');
    unicode-range: U+0000-00FF;
    /* font-display: fallback; */
  }

  @font-face {
    font-family: 'Recursive';
    src: url('/fonts/Recursive.woff2');
    unicode-range: U+0000-00FF;
    /* font-display: fallback; */
  }

  @font-face {
    font-family: 'LabDJR';
    src: url('/fonts/LabDJR-VF.woff');
    unicode-range: U+0000-00FF;
    /* font-display: fallback; */
  }
</style>

<svelte:head>
  <link
    rel='preload'
    as='font'
    href={'./ScienceGothicVF.ttf'}
    type='font/ttf'
  />
  <link
    rel='preload'
    as='font'
    href={'./Recursive.woff2'}
    type='font/woff2'
  />
  <link
    rel='preload'
    as='font'
    href={'./LabDJR-VF.woff'}
    type='font/woff'
  />
</svelte:head>