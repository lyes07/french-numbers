import React from 'react'

function NavBar() {
  return (
    <ul>
        <li><a href="#">Learn French Numbers</a></li>
        
        <li className='stickRight'><a className="active" href="#">Native Lan</a></li>
    </ul>
  )
}

export default NavBar