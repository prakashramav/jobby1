import {Component} from 'react'
import Cookies from 'js-cookie'
import {ThreeDots} from 'react-loader-spinner'
import {BsSearch} from 'react-icons/bs'
import Headers from '../Headers'
import ProfileDetails from '../ProfileDetails'
import TypeOfEmployment from '../TypeOfEmployement'
import SalaryRange from '../SalaryRange'
import JobsList from '../JobsList'
import './index.css'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

const jobsApiUrlStatus = {
  INITIAL: 'INITIAL',
  PROGRESS: 'PROGRESS',
  SUCCESS: 'SUCCESS',
  FAILURE: 'FAILURE',
}

class Jobs extends Component {
  state = {
    apiStatus: jobsApiUrlStatus.INITIAL,
    jobsApiData: {},
    selectedEmploymentTypes: [],
    selectedSalaryRange: '',
    searchInput: '',
  }

  componentDidMount() {
    this.getJobsApiData()
  }

  onChangeEmploymentType = (employmentTypeId, isChecked) => {
    this.setState(prevState => {
      const types = prevState.selectedEmploymentTypes
      const updated = isChecked
        ? [...types, employmentTypeId]
        : types.filter(id => id !== employmentTypeId)
      return {selectedEmploymentTypes: updated}
    }, this.getJobsApiData)
  }

  onChangeSalaryRange = salaryRangeId => {
    this.setState({selectedSalaryRange: salaryRangeId}, this.getJobsApiData)
  }

  onChangeSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  getJobsApiData = async () => {
    const {selectedEmploymentTypes, selectedSalaryRange, searchInput} =
      this.state
    const separateEmployeTyeps = selectedEmploymentTypes.join(',')
    this.setState({apiStatus: jobsApiUrlStatus.PROGRESS})
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = `https://apis.ccbp.in/jobs?employment_type=${separateEmployeTyeps}&minimum_package=${selectedSalaryRange}&search=${searchInput}`
    const option = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, option)
    if (response.ok === true) {
      const data = await response.json()
      this.setState({
        jobsApiData: data.jobs,
        apiStatus: jobsApiUrlStatus.SUCCESS,
      })
    } else {
      this.setState({apiStatus: jobsApiUrlStatus.FAILURE})
    }
  }

  nosearchJonbs = () => (
    <div>
      <img
        src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
        alt="no jobs"
      />
      <h1 className="heading">No Jobs Found</h1>
      <p className="heading">We Could not find any jobs Try other filter</p>
    </div>
  )

  renderOnProgressPage = () => (
    <div className="loader-container" data-testid="loader">
      <ThreeDots height="50" width="50" color="#ffffff" ariaLabel="loading" />
    </div>
  )

  renderOnSuccessPage = () => {
    const {jobsApiData} = this.state
    console.log(jobsApiData)
    return (
      <div>
        {jobsApiData.length === 0 ? (
          this.nosearchJonbs()
        ) : (
          <ul className="list-container">
            {jobsApiData.map(eachJob => (
              <JobsList key={eachJob.id} eachJob={eachJob} />
            ))}
          </ul>
        )}
      </div>
    )
  }

  retryButton = () => {
    this.getJobsApiData()
  }

  renderOnFailurePage = () => (
    <div>
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
      />
      <h1 className="wrong-heaading">Oops! Something Went Wrong</h1>
      <p className="wrong-para">
        We cannot seem to find page you are looking for
      </p>
      <button type="button" className="button" onClick={this.retryButton}>
        Retry
      </button>
    </div>
  )

  renderOnApiUrlStatus = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case jobsApiUrlStatus.PROGRESS:
        return this.renderOnProgressPage()
      case jobsApiUrlStatus.SUCCESS:
        return this.renderOnSuccessPage()
      case jobsApiUrlStatus.FAILURE:
        return jobsApiUrlStatus.renderOnFailurePage()
      default:
        return null
    }
  }

  onClickSearchButton = () => {
    this.getJobsApiData()
  }

  render() {
    const {selectedEmploymentTypes, selectedSalaryRange, searchInput} =
      this.state
    return (
      <>
        <Headers />
        <div className="jobs-container">
          <div className="profile-employement-salary-container">
            <ProfileDetails />
            <div>
              <h4 className="heading">Type of Employment</h4>
              {employmentTypesList.map(eachEmploymentType => (
                <TypeOfEmployment
                  key={eachEmploymentType.employmentTypeId}
                  eachEmploymentType={eachEmploymentType}
                  onChangeCheckbox={this.onChangeEmploymentType}
                  isChecked={selectedEmploymentTypes.includes(
                    eachEmploymentType.employmentTypeId,
                  )}
                />
              ))}
              <hr className="horizantal-line" />
            </div>
            <div>
              <h4 className="heading">Salary Range</h4>
              {salaryRangesList.map(eachSalary => (
                <SalaryRange
                  key={eachSalary.salaryRangeId}
                  eachSalary={eachSalary}
                  onChangeSalary={this.onChangeSalaryRange}
                  isSelected={selectedSalaryRange === eachSalary.salaryRangeId}
                />
              ))}
            </div>
          </div>
          <div className="search-jobslist-container">
            <div className="input-search-container">
              <input
                type="search"
                placeholder="Search"
                className="search"
                value={searchInput}
                onChange={this.onChangeSearchInput}
              />
              <button
                type="button"
                data-testid="searchButton"
                className="search-icon-button"
                onClick={this.onClickSearchButton}
              >
                <BsSearch className="search-icon" />
              </button>
            </div>
            <div>{this.renderOnApiUrlStatus()}</div>
          </div>
        </div>
      </>
    )
  }
}
export default Jobs
