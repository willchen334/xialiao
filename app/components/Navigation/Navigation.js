import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { Menu, Dropdown, Icon, Image } from 'semantic-ui-react'
import {ModalContainer} from '../../containers'

Navigation.propTypes = {
  isAuthed: PropTypes.bool.isRequired,
  user: PropTypes.any,
  mailOptions: PropTypes.array.isRequired,
  alarmOptions: PropTypes.array.isRequired,
  location: PropTypes.object.isRequired,
}

const alarmTrigger = (
  <span><Icon size='large' name='alarm' /></span>
)
const mailTrigger = (
  <span><Icon size='large' name='mail' /></span>
)

export default function Navigation ({ isAuthed, user, mailOptions, alarmOptions, location }) {
  return (
    isAuthed === true
      ? <Menu borderless={true}>
        <Menu.Item as={Link} to='/'>
          <Image
            size='mini'
            src={require('../../assets/images/crt425.png')}
            style={{ marginRight: '1.5em', marginLeft: '1.5em' }}/>
          <span style={{color: 'black', fontSize: 'large'}}>Xialiao</span>
        </Menu.Item>
        <Menu.Item>
          <ModalContainer />
        </Menu.Item>
        <Menu.Menu position='right'>
          <Dropdown
            trigger={alarmTrigger}
            options={mailOptions}
            className='link item'
            pointing='top'
            icon={null} />
          <Dropdown
            trigger={mailTrigger}
            options={alarmOptions}
            className='link item'
            pointing='top'
            icon={null} />
          <Dropdown
            pointing='top'
            text={user.info.name}
            className='link item'
            style={{ marginRight: '1.5em' }}>
            <Dropdown.Menu>
              <Dropdown.Item as={Link} to='/'>My Account</Dropdown.Item>
              <Dropdown.Item as={Link} to='/'>Setting</Dropdown.Item>
              <Dropdown.Item as={Link} to='/logout'>Logout</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Menu.Menu>
      </Menu>
      : <Menu borderless={true}>
        <Menu.Item as={Link} to='/' position='left'>
          Home
        </Menu.Item>
        {location.pathname === '/' &&
        <Menu.Item as={Link} to='/auth/login'>
          Login
        </Menu.Item>}
        {location.pathname === '/' &&
        <Menu.Item as={Link} to='/auth/signUp'>
          Sign Up
        </Menu.Item>}
      </Menu>
  )
}
