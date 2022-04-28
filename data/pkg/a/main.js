import {registerApp} from 'yet-another-nothing';
import add from 'add';

registerApp({
  id: 'a',
  onInit: (token, {startWindow}) => {
    console.log(add([1,1]))
    startWindow({id: 'a', title: 'hello'})
  }
})

console.log('aaaaaaaaa')