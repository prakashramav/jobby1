import './index.css'

const SalaryRange = props => {
  const {eachSalary, onChangeSalary, isSelected} = props
  const {salaryRangeId, label} = eachSalary

  const handleChange = () => {
    onChangeSalary(salaryRangeId)
  }

  return (
    <div>
      <label className="label-radio">
        <input
          type="radio"
          name={label}
          value={salaryRangeId}
          checked={isSelected}
          onChange={handleChange}
        />
        {label}
      </label>
    </div>
  )
}

export default SalaryRange
