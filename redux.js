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
export {createStore}
