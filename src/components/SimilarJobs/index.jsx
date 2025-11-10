import './index.css'

const SimilarJobs = props => {
  const {eachJob} = props
  console.log(eachJob)
  return (
    <>
      <li className="similar-job-list-container">
        <div className="similar-job-container">
          <img
            src={eachJob.company_logo_url}
            alt={eachJob.title}
            className="similar-image"
          />
          <div className="heading-container">
            <h3 className="heading">{eachJob.title}</h3>
            <div className="rating-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/stars-count-img.png"
                alt="star"
                className="star-logo"
              />
              <p className="rating">{eachJob.rating}</p>
            </div>
          </div>
        </div>
        <h3 className="heading">Description</h3>
        <p className="heading">{eachJob.job_description}</p>
      </li>
    </>
  )
}

export default SimilarJobs
