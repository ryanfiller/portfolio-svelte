
import React from 'react'

// TODO this whole file needs rethinking

import styles from './test.module.scss'
 
export default (props) => {
  
  const {
    src,
    alt,
    title,
    align,
    small,
  } = props

  let style;

  switch (align) {
    case 'full':
      style = {
        display: 'block',
        margin: '0 0 1em 0',
      }
      break;
    case 'left':
      style = {
        float: 'left',
        display: 'block',
        marginRight: '0 1em 1em 0',
        width: '50%',
      }
      break;
    case 'right':
      style = {
        float: 'right',
        display: 'block',
        marginLeft: '0 0 1em 1em',
        width: '50%',
      }
      break;
    default:
      // 'center'
      style = {
        display: 'block',
        margin: '0 auto 1em auto',
        width: '50%',
      }
  }

  if (small === 'true' && align !== 'full') {
    style.width = '25%';
  }

  const addParams = (url, params) => {
		const splitUrl = url.split('upload/')
		return `${splitUrl[0]}upload/${params}/${splitUrl[1]}`
	}

  return ( 
    <picture style={{...style}} className={styles['test']}>
        {!src.includes('.gif'|| '.svg') &&
					<>
						{props.align === 'full' &&
							<source 
								srcSet={addParams(src, `c_scale,w_1200`)} 
								media={`(min-width: 1200px)`} 
							/>
						}
						<source 
							srcSet={addParams(src, `c_scale,w_768`)} 
							media={`(min-width: 768px)`} 
						/>
					</>
				}
				<img 
					src={src}
					alt={alt}
          title={title}
          style={{margin: '0', lineHeight: '0', display: 'block', width: '100%'}}
				/>
    </picture>
  )
}