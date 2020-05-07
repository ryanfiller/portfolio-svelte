import React, { useState } from 'react'
import './image-resize-example.scss'

const ImageResizeExample = () => {
  const [width, setWidth] = useState('250')
  const handleWidthChange = event => setWidth(event.target.value)
  const params = `?nf_resize=fit&w=${width}`

  return (
    <div className='image-resize-example'>
      <label htmlFor='width'>image width</label>
      <input
        type='range'
        id='width'
        min='50'
        max='550'
        step='100'
        value={width}
        onChange={handleWidthChange}
      />
      <pre>{`<img src="image.jpg${params}"/>`}</pre>
      {/* <img src={`/images/uploads/_placeholder.jpg${params}`}/> */}
      <img src={`https://www.ryanfiller.com/images/uploads/_placeholder.jpg${params}`}/>
    </div>
  )
}

export default ImageResizeExample