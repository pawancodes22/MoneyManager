// Write your code here
import './index.css'

const TransactionItem = props => {
  const {item, func} = props
  const {id, title, amount, type} = item
  function callFunc() {
    func(id)
  }
  return (
    <li className="column-container">
      <p className="title-para font-weight-decreaser">{title}</p>
      <p className="amount-para font-weight-decreaser">{amount}</p>
      <p className="type-para font-weight-decreaser">{type}</p>
      <button type="button" onClick={callFunc} data-testid="delete">
        <img
          src="https://assets.ccbp.in/frontend/react-js/money-manager/delete.png"
          alt="delete"
        />
      </button>
    </li>
  )
}
export default TransactionItem
