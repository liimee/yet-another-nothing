import {registerApp} from 'yet-another-nothing';
import add from 'add';

registerApp({
  id: 'a',
  onInit: (token) => {
    console.log(add([1,1]))
  }
})