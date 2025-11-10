import {Component} from 'react'
import Cookies from 'js-cookie'
import {ThreeDots} from 'react-loader-spinner'
import {MdLocationOn} from 'react-icons/md'
import {FaBriefcase} from 'react-icons/fa'
import Headers from '../Headers'
import SimliarJobs from '../SimilarJobs'
import './index.css'

const apiUrlStatus = {
  INITIAl: 'INITIAL',
  PROGRESS: 'PROGRESS',
  SUCCESS: 'SUCCESS',
  FAILURE: 'FAILURE',
}

class JobDetails extends Component {
  state = {
    jobDetails: {},
    urlStatus: apiUrlStatus.INITIAl,
  }

  componentDidMount() {
    this.getJonDetails()
  }

  getJonDetails = async () => {
    this.setState({urlStatus: apiUrlStatus.PROGRESS})
    const {match} = this.props
    const {params} = match
    const {id} = params
    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/jobs/${id}`
    const option = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, option)
    if (response.ok === true) {
      const data = await response.json()
      console.log(data)
      this.setState({jobDetails: data, urlStatus: apiUrlStatus.SUCCESS})
    } else {
      this.setState({urlStatus: apiUrlStatus.FAILURE})
    }
  }

  renderProgressView = () => (
    <>
      <div className="loader-container" data-testid="loader">
        <ThreeDots height="50" width="50" color="#ffffff" ariaLabel="loading" />
      </div>
    </>
  )

  renderSuccessView = () => {
    const {jobDetails} = this.state
    return (
      <>
        <div className="details-container">
          <div className="whole-image-title-container">
            <img
              src={jobDetails.job_details.company_logo_url}
              alt={jobDetails.job_details.title}
            />
            <div className="heading-container">
              <h1 className="heading">{jobDetails.job_details.title}</h1>
              <div className="rating-container">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/stars-count-img.png"
                  alt="star"
                  className="star-logo"
                />
                <p className="rating">{jobDetails.job_details.rating}</p>
              </div>
            </div>
          </div>
          <div className="loaction-jobtype">
            <div className="loaction-lpa-container">
              <div className="loaction-container">
                <MdLocationOn className="location" />
                <p className="location">{jobDetails.job_details.location}</p>
              </div>
              <div className="loaction-container">
                <FaBriefcase className="location" />
                <p className="location">
                  {jobDetails.job_details.employment_type}
                </p>
              </div>
            </div>
            <div>
              <p className="lpa">{jobDetails.job_details.package_per_annum}</p>
            </div>
          </div>
          <hr className="horizantal" />
          <div>
            <div className="discription-container">
              <h3 className="discription">Discription</h3>
              <a href={jobDetails.job_details.company_website_url}>visit</a>
            </div>
            <p className="discription">
              {jobDetails.job_details.job_description}
            </p>
            <h3 className="skills">Skills</h3>
            <ul className="list-skills-container">
              {jobDetails.job_details.skills.map(eachSkill => (
                <li key={eachSkill.name} className="skills-list">
                  <img src={eachSkill.image_url} alt={eachSkill.name} />
                  <p className="skill-name">{eachSkill.name}</p>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="heading">Life at Company</h3>
            <div className="life-company-container">
              <p className="discription">
                {jobDetails.job_details.life_at_company.description}
              </p>
              <img
                src={jobDetails.job_details.life_at_company.image_url}
                alt="image-url"
              />
            </div>
          </div>
        </div>
        <div className="similar-jobs-container">
          <h2 className="heading">Similar Jobs</h2>
          <ul className="list-skills-container">
            {jobDetails.similar_jobs.map(eachJob => (
              <SimliarJobs key={eachJob.id} eachJob={eachJob} />
            ))}
          </ul>
        </div>
      </>
    )
  }

  retryButton = () => {
    this.getJonDetails()
  }

  renderFailureView = () => (
    <>
      <div>
        <img
          src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
          alt="failure view"
        />
        <h1>Oops! Something Went Worng</h1>
        <p>We cannot seem to find the page you are looking for</p>
        <button onClick={this.retryButton}>Retry</button>
      </div>
    </>
  )

  renderShowView = () => {
    const {urlStatus} = this.state
    switch (urlStatus) {
      case apiUrlStatus.PROGRESS:
        return this.renderProgressView()
      case apiUrlStatus.SUCCESS:
        return this.renderSuccessView()
      case apiUrlStatus.FAILURE:
        return this.renderFailureView()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Headers />
        <div className="job-details-id">{this.renderShowView()}</div>
      </>
    )
  }
}

export default JobDetails
