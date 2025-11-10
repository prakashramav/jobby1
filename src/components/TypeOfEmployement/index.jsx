import './index.css'

const TypeOfEmployement = props => {
  const {eachEmploymentType, onChangeCheckbox, isChecked} = props
  const {label, employmentTypeId} = eachEmploymentType

  const handleChange = event => {
    onChangeCheckbox(employmentTypeId, event.target.checked)
  }

  return (
    <div>
      <label className="label-checkbox">
        <input
          type="checkbox"
          name={label}
          value={employmentTypeId}
          checked={isChecked}
          onChange={handleChange}
        />
        {label}
      </label>
    </div>
  )
}
export default TypeOfEmployement
