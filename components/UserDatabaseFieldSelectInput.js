import React from 'react'
import { Input } from 'reactstrap'

import { db } from '../firebase'

export default class UserDatabaseFieldSelectInput extends React.Component {
  state = {
    loading: true,
    saving: false,
    value: undefined,
  }

  componentDidMount() {
    const { userId, fieldName } = this.props
    if (!userId) return
    db.getUserData(userId).then(data => {
      const { profile } = data
      const value = profile && profile[fieldName]
      this.setState({ loading: false, value })
    })
  }

  handleChangeValue = e => {
    const previousValue = this.state.value
    const { userId, fieldName } = this.props
    const value = e.target.value + ''
    if (!value) return

    this.setState({ saving: true, value })
    db.updateProfileField(userId, fieldName, value.trim())
      .then(() => this.setState({ saving: false, value }))
      .catch(() => this.setState({ saving: false, value: previousValue }))
  }

  render() {
    const { loading, saving, value } = this.state
    const { children } = this.props
    return (
      <Input
        type="select"
        name="select"
        id="exampleSelect"
        onChange={this.handleChangeValue}
        disabled={loading || saving}
        value={value}
      >
        {loading && <option>Loading...</option>}
        {children}
      </Input>
    )
  }
}
