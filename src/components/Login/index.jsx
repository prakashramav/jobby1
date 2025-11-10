import Cookies from 'js-cookie'
import {Component} from 'react'
import {Navigate} from 'react-router-dom'
import './index.css'

class Login extends Component {
  state = {
    username: '',
    password: '',
    errorMessage: '',
    showSubmitError: false,
  }

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  onSubmitSuccess = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {expires: 2})
    history.replace('/')
  }

  onSubmitFailure = errorMsg => {
    this.setState({showSubmitError: true, errorMessage: errorMsg})
  }

  onSubmitForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const url = 'https://apis.ccbp.in/login'
    const option = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, option)
    const data = await response.json()
    if (response.ok === true) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  render() {
    const {username, password, showSubmitError, errorMessage} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Navigate to="/" replace/>
    }
    return (
      <div className="login-container">
        <div className="login-mini-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
            className="website-logo"
          />
          <form onSubmit={this.onSubmitForm}>
            <div className="username-container">
              <label htmlFor="userName" className="input">
                USERNAME
              </label>
              <input
                type="text"
                id="userName"
                value={username}
                className="input-field"
                placeholder="Username"
                onChange={this.onChangeUsername}
              />
            </div>
            <div className="username-container">
              <label htmlFor="passWord" className="input">
                PASSWORD
              </label>
              <input
                type="password"
                id="passWord"
                className="input-field"
                placeholder="Password"
                value={password}
                onChange={this.onChangePassword}
              />
            </div>
            <div className="button-container">
              <button type="submit" className="button">
                Login
              </button>
            </div>
            {showSubmitError && <p className="error-msg">*{errorMessage}</p>}
          </form>
        </div>
      </div>
    )
  }
}
export default Login
