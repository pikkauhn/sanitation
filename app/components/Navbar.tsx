import { Menubar } from 'primereact/menubar';
import React from 'react'

import SigninButton from './SigninButton';
import SessionInfo from './SessionInfo';

const sesh = async () => {
  const session = await SessionInfo()
  const user = session
  if (session) {
    return user
  } else {
    return null
  }
}

async function Navbar() {
  const user = await sesh();
  let show = false;
  let admin = false;
  if (user) {
    if (user.name) {
      show = true;
      if (user.roles === 'Admin') {        
        admin = true;
      }
    }
  }

  const items = [
    {
      label: 'Home',
      url: '/Data',
      visible: show
    },
    {
      label: 'Register',
      url: '/Register',
      visible: !show
    },
    {
      label: 'Administration',
      url: '/Admin',
      visible: admin,
    }
  ]

  const end = <SigninButton />

  return (
    <Menubar model={items} end={end} />
  )
}

export default Navbar