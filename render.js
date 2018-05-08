class Element{
  constructor(type,props){
    this.type=type;
    this.props=props;
  }
}
let React={
  createElement(type,props,...children){
    if(children.length===1){
      children=children[0]
    }
    return new Element(type,{...props,children})
  }
}
console.log(React.createElement("h1", {className: "red"}, "hello","jerry"));
let ele=React.createElement("h1", {className: "red"}, "hello","jerry")
function render(eleObj,container) {
  let {type,props}=eleObj;
  let ele=document.createElement(type);
  for(let key in props){
    if(key!=='children'){
      if(key==='className'){
        ele.setAttribute('class',props[key]);
      }else{
        ele.setAttribute(key,props[key]);
      }
    }else{//children
      let children=props[key];
      if(Array.isArray(children)){
        //是数组
        children.forEach(child=>{
          if(child instanceof Element){
            render(child,ele);
          }else{
            //文本节点
            ele.appendChild(document.createTextNode(child))
          }
        })
      }else{
        if(children instanceof Element){
          render(children,ele);
        }else{
          //文本节点
          ele.appendChild(document.createTextNode(children))
        }
      }

    }
  }
  container.appendChild(ele)
}
render(ele,window.root)