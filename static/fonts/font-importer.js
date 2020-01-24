import React from 'react'

import './fonts.css'

const FontImporter = () => {
  return (
    <>
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
    </>
  )
}

export default FontImporter
