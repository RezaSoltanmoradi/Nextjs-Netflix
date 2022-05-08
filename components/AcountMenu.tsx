import Button from '@mui/material/Button'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import { useState } from 'react'
import useAuth from '../hooks/useAuth'
import { FaSignOutAlt } from 'react-icons/fa'
import Link from 'next/link'
export default function AccountMenu() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const { logout } = useAuth()
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <div>
      <Button
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        className="!capitalize !text-white"
      >
        <img
          src="https://rb.gy/g1pwyx"
          alt=""
          className="cursor-pointer rounded"
        />
      </Button>

      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        className="accountMenu"
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={handleClose}>Account</MenuItem>
        <MenuItem onClick={handleClose}>
        <Link href='/myList'>Favorite List</Link>
            </MenuItem>
        <MenuItem onClick={handleClose}>Star Movies</MenuItem>
        <MenuItem onClick={handleClose}>Change password</MenuItem>

        <MenuItem
          className="flex"
          onClick={() => {
            handleClose()
            logout()
          }}
        >
          Logout
          <FaSignOutAlt className="m-auto" />
        </MenuItem>
      </Menu>
    </div>
  )
}
