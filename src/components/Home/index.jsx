import {Link} from 'react-router-dom'
import Headers from '../Headers'
import './index.css'

const Home = () => (
  <>
    <Headers />
    <div className="home-container">
      <h1 className="heading">Find The Job That Fits Your Life</h1>
      <p className="para">
        Millions of people are searching for jobs, salary information, company
        reviews. Find the job that fits for your abilities and potential
      </p>
      <Link to="/jobs">
        <button type="button" className="find-button">
          Find Jobs
        </button>
      </Link>
    </div>
  </>
)

export default Home
