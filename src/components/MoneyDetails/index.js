// Write your code here
import './index.css'

const MoneyDetails = props => {
  const {imageUrl, value, data} = props
  const rupees = data[value]
  const testId = `${value}Amount`
  return (
    <div className={`main-bg ${value}`}>
      <img className="icon-sizer" src={imageUrl} alt="balance" />
      <div>
        <p className="amount-type-style" data-testid={testId}>
          Your {value}
        </p>
        <h1 className="amount-style">Rs {rupees}</h1>
      </div>
    </div>
  )
}
export default MoneyDetails
