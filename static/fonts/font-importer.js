import React from 'react'
import Helmet from 'react-helmet'

import './fonts.css'

const FontImporter = () => {
  return (
    <Helmet>
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
    </Helmet>
  )
}

export default FontImporter
