import {Link, useNavigate} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

const Headers = () => {
    const navigate = useNavigate()
  const onClickLogout = () => {
    Cookies.remove('jwt_token')
    navigate('/login')
  }
  return (
    <div className="headers-container">
      <Link to="/">
        <img
          src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
          alt="website logo"
          className="website-logo"
        />
      </Link>
      <div>
        <Link to="/" className="link">
          Home
        </Link>
        <Link to="/jobs" className="link">
          Jobs
        </Link>
      </div>
      <button type="button" className="header-button" onClick={onClickLogout}>
        Logout
      </button>
    </div>
  )
}

export default Headers
