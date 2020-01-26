import React from 'react'
import Heading from './heading'

// wtf

const H1 = props => <Heading h="1">{props.children}</Heading>
const H2 = props => <Heading h="2">{props.children}</Heading>
const H3 = props => <Heading h="3">{props.children}</Heading>
const H4 = props => <Heading h="4">{props.children}</Heading>
const H5 = props => <Heading h="5">{props.children}</Heading>
const H6 = props => <Heading h="6">{props.children}</Heading>

export { H1, H2, H3, H4, H5, H6 }