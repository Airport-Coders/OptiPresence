import React from 'react' // Import React
import Image from 'next/image' // Import Image component from next/image
import logo from '../static/img/logo.png'

export function Logo() {
  return <Image src={logo} alt="Logo" width="64" height="64" />
}

export function Logomark() {
  return <Image src={logo} alt="Logo" width="64" height="64" />
}
