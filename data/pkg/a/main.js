import {registerApp} from 'yet-another-nothing';
import add from 'add';

registerApp({
  id: 'a',
  onInit: (token, {startWindow}) => {
    console.log(add([1,1]))
    startWindow({id: 'a', title: 'hello', render: (c) => {
      const a = document.createElement('div')
      a.innerText = 'what';
      c.appendChild(a);
    }})
  }
})

console.log('aaaaaaaaa')