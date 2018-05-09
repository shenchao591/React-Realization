function createStore(reducer) {
  let state;
  let listeners=[];
  let getState=()=>JSON.parse(JSON.stringify(state));
  let dispatch=(action)=>{
    state=reducer(state,action)
    listeners.forEach(listener=>listener())
  }
  dispatch({});
  let subscribe=(listener)=>{
    listeners.push(listener);
    return ()=>{
      listeners=listeners.filter(fn=>fn!==listener)
    }
  }
  return {getState,dispatch,subscribe}
}
function combineReducers(reducers) {
  return (state={},action)=>{
    //默认要返回一个状态
    let obj={};
    for(let key in reducers){
      let reducer=reducers[key];
      console.log(key,state,state[key]);
      let s= reducer(state[key],action)
      obj[key]=s;
    }
    return obj;
  }
}
export {createStore,combineReducers}
