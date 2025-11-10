import {MdLocationOn} from 'react-icons/md'
import {FaBriefcase} from 'react-icons/fa'
import {Link} from 'react-router-dom'
import './index.css'

const JobsList = props => {
  const {eachJob} = props
  const {
    id,
    company_logo_url,
    employment_type,
    job_description,
    location,
    package_per_annum,
    rating,
    title,
  } = eachJob
  return (
    <li className="list-element">
      <Link to={`/jobs/${id}`} className="link-to-other">
        <div className="logo-container">
          <img src={company_logo_url} alt={title} className="company-logo" />
          <div className="heading-rating-container">
            <h3 className="title">{title}</h3>
            <div className="rating-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/stars-count-img.png"
                alt="star"
                className="star-logo"
              />
              <p className="rating">{rating}</p>
            </div>
          </div>
        </div>
        <div className="location-type-package-container">
          <div className="location-type-container">
            <div className="location-container">
              <MdLocationOn className="ms-location" />
              <p className="location">{location}</p>
            </div>
            <div className="location-container">
              <FaBriefcase className="ms-location" />
              <p className="location">{employment_type}</p>
            </div>
          </div>
          <div>
            <p className="package">{package_per_annum}</p>
          </div>
        </div>
        <hr />
        <p className="discription">Discription</p>
        <p className="job-discription">{job_description}</p>
      </Link>
    </li>
  )
}
export default JobsList
