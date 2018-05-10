import React, {Component} from 'react'
import high from './high'
class UserName extends Component {




  render() {
    return (
      <div>
        <input type="text" defaultValue={this.props.value}/>
      </div>
    )
  }
}
export default high('username')(UserName)