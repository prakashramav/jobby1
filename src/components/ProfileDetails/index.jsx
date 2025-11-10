import {Component} from 'react'
import { ThreeDots } from 'react-loader-spinner'
import Cookies from 'js-cookie'

import './index.css'

const apiUrlStatus = {
  INITIAL: 'INITIAL',
  PROGRESS: 'PROGRESS',
  SUCCESS: 'SUCCESS',
  FAILURE: 'FAILURE',
}

class ProfileDetails extends Component {
  state = {
    profileDetails: {},
    apiStatus: apiUrlStatus.INITIAL,
  }

  componentDidMount() {
    this.getProfileDetails()
  }

  getProfileDetails = async () => {
    this.setState({apiStatus: apiUrlStatus.PROGRESS})
    const url = 'https://apis.ccbp.in/profile'
    const jwtToken = Cookies.get('jwt_token')
    const option = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, option)
    if (response.ok === true) {
      const data = await response.json()
      this.setState({
        profileDetails: data.profile_details,
        apiStatus: apiUrlStatus.SUCCESS,
      })
    } else {
      this.setState({apiStatus: apiUrlStatus.FAILURE})
    }
  }

  retryButton = () => {
    this.getProfileDetails()
  }

  renderInProgress = () => (
    <>
      <div className="loader-container" data-testid="loader">
        <ThreeDots height="50" width="50" color="#ffffff" ariaLabel="loading" />
      </div>
    </>
  )

  renderSuccessPage = () => {
    const {profileDetails} = this.state
    return (
      <>
        <div className="profile-bg-image">
          <img
            src={profileDetails.profile_image_url}
            alt={profileDetails.name}
          />
          <h1>{profileDetails.name}</h1>
          <p>{profileDetails.short_bio}</p>
        </div>
        <hr className="horizantal-line" />
      </>
    )
  }

//   retryButton = () => {
//     this.getProfileDetails()
//   }

  renderFailurePage = () => (
    <div>
      <button type="button" className="retry-button" onClick={this.retryButton()}>
        Retry
      </button>
    </div>
  )

  renderOnStatus = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiUrlStatus.PROGRESS:
        return this.renderInProgress()
      case apiUrlStatus.SUCCESS:
        return this.renderSuccessPage()
      case apiUrlStatus.FAILURE:
        return this.renderFailurePage()
      default:
        return null
    }
  }

  render() {
    return <div>{this.renderOnStatus()}</div>
  }
}

export default ProfileDetails
