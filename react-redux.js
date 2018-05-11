//{Provider,connect}
import React from 'react'
import {bindActionCreators} from 'redux'
let {Provider:Pro,Consumer}=React.createContext();
//Provider 中有一个属性 store
class Provider extends React.Component {
  render() {
    return <Pro value={this.props.store}>
      {this.props.children}
    </Pro>
  }
}

let connect = (mapStateToProps, mapDispatchToProps) => (Component) => {
  return class Proxy extends React.Component {
    render() {
      return (
        <Consumer>
          {(store)=>{
            console.log(store);
            // let state=mapStateToProps(store.getState())
            // let actions=mapDispatchToProps(store.dispatch)
            // //状态变化后 需要更新视图 调用this.setState()
            //
            // return <Component {...state} {...actions}/>
            class High extends React.Component{
              state=mapStateToProps(store.getState())
              componentDidMount(){
                console.log(this.state);
                this.unsub=store.subscribe(()=>{
                  this.setState(mapStateToProps(store.getState()))
                })
              }
              componentWillUnmount(){
                this.unsub();
              }
              render(){
                // let actions=mapDispatchToProps(store.dispatch)
                let actions;
                if(typeof mapDispatchToProps==='function'){
                  actions=mapDispatchToProps(store.dispatch)
                }else{//actions是对象
                  actions=bindActionCreators(mapDispatchToProps,store.dispatch);
                }
                return <Component {...this.state} {...actions}/>
              }
            }
            return <High/>
          }}

        </Consumer>
      )
    }
  }
}
export {Provider,connect}
