import React from 'react'
import SearchTravel from '../../components/SearchTravel';
import Router from 'next/router'
console.log('Router: ', Router);

export default function convenios() {
  return (
    <div>
      <SearchTravel type="convenios" />
    </div>
  )
}
