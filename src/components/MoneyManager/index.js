import {Component} from 'react'

import {v4 as uuidv4} from 'uuid'

import MoneyDetails from '../MoneyDetails'

import TransactionItem from '../TransactionItem'

import './index.css'

const transactionTypeOptions = [
  {
    optionId: 'INCOME',
    displayText: 'Income',
  },
  {
    optionId: 'EXPENSES',
    displayText: 'Expenses',
  },
]

const balanceCards = [
  {
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/money-manager/balance-image.png',
    value: 'balance',
  },
  {
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/money-manager/income-image.png',
    value: 'income',
  },
  {
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/money-manager/expenses-image.png',
    value: 'expenses',
  },
]

// Write your code here

class MoneyManager extends Component {
  state = {
    title: '',
    amount: '',
    type: 'INCOME',
    income: 0,
    expenses: 0,
    historyItems: [],
  }

  changeTitle = event => {
    this.setState({title: event.target.value})
  }

  changeAmount = event => {
    this.setState({amount: event.target.value})
  }

  changeType = event => {
    this.setState({type: event.target.value})
  }

  deleteTransaction = id => {
    const {income, expenses, historyItems} = this.state
    const reqItem = historyItems.find(item => item.id === id)
    const {amount, type} = reqItem
    let newIncome = income
    let newExpenses = expenses
    if (type === 'INCOME') {
      newIncome -= amount
    } else {
      newExpenses -= amount
    }
    this.setState(prev => ({
      historyItems: prev.historyItems.filter(item => item.id !== id),
      income: newIncome,
      expenses: newExpenses,
    }))
  }

  submitForm = event => {
    event.preventDefault()
    const {title, amount, type, income, expenses} = this.state
    let newIncome = income
    let newExpenses = expenses
    const parsedAmount = parseInt(amount)
    if (type === 'INCOME') {
      newIncome = parsedAmount + newIncome
    } else {
      newExpenses = parsedAmount + newExpenses
    }
    this.setState(prev => ({
      historyItems: [...prev.historyItems, {id: uuidv4(), title, amount, type}],
      income: newIncome,
      expenses: newExpenses,
      title: '',
      amount: '',
      type: 'INCOME',
    }))
  }

  render() {
    const {title, amount, type, historyItems, income, expenses} = this.state
    const balance = income - expenses
    return (
      <div className="page-bg">
        <div className="name-card-bg">
          <h1>Hi, Richard</h1>
          <p>
            Welcome back to your{' '}
            <span className="word-span-style">Money Manager</span>
          </p>
        </div>
        <div className="transaction-card-container">
          {balanceCards.map(item => (
            <MoneyDetails
              key={uuidv4()}
              imageUrl={item.imageUrl}
              value={item.value}
              data={{income, balance, expenses}}
            />
          ))}
        </div>
        <div className="transaction-history-container">
          <div className="add-transaction">
            <form onSubmit={this.submitForm}>
              <h1>Add Transaction</h1>
              <label htmlFor="title" className="label-style">
                TITLE
              </label>
              <br />
              <input
                type="text"
                id="title"
                placeholder="Title"
                className="input-style"
                value={title}
                onChange={this.changeTitle}
              />
              <br />
              <label htmlFor="amount" className="label-style">
                AMOUNT
              </label>
              <br />
              <input
                type="text"
                id="amount"
                placeholder="Amount"
                className="input-style"
                value={amount}
                onChange={this.changeAmount}
              />
              <br />
              <label htmlFor="type" className="label-style">
                TYPE
              </label>
              <br />
              <select id="type" onChange={this.changeType} value={type}>
                {transactionTypeOptions.map(item => (
                  <option key={item.optionId} value={item.optionId}>
                    {item.displayText}
                  </option>
                ))}
              </select>
              <br />
              <button type="submit" className="add-button-style">
                Add
              </button>
            </form>
          </div>
          <div className="history-container">
            <h1>History</h1>
            <div className="column-container">
              <p className="title-para">Title</p>
              <p className="amount-para">Amount</p>
              <p className="type-para">Type</p>
            </div>
            <ul className="history-ul-container">
              {historyItems.map(item => (
                <TransactionItem
                  key={item.id}
                  item={item}
                  func={this.deleteTransaction}
                />
              ))}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

export default MoneyManager
