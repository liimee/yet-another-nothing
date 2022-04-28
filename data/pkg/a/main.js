import {registerApp} from 'yet-another-nothing';
import add from 'add';

registerApp({
  id: 'a',
  onInit: (token, {startWindow}) => {
    console.log(add([1,1]))
    start(startWindow)
  }
})

function start(startWindow) {
  startWindow({id: 'a', title: 'hello', render: (c) => {
    c.style.padding = '6px';
    const a = document.createElement('div')
    a.innerText = 'what';
    c.appendChild(a);
  }, onClose: ()=>{
    start(startWindow)
  }})
}

console.log('aaaaaaaaa')