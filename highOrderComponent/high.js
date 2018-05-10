import React from 'react'
let high=(key)=>(Component)=>{
  return class HighOrderComponent extends React.Component{
    state = {value: ''}
    componentWillMount() {
      let result = localStorage.getItem(key)
      this.setState({value: result})
    }
    render(){
      return <Component value={this.state.value}/>
    }
  }
}
export default high;