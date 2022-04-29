import {registerApp, registerDesktopEntry} from 'yet-another-nothing';
import add from 'add';

registerApp({
  id: 'a',
  onInit: (token, {startWindow}) => {
    console.log(add([1,1]))
    start(startWindow)

    registerDesktopEntry({
      title: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
      onClick: () => start(startWindow),
      icon: `data:image/png;base64,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`.replace(/\s/g, '')
    })
  }
})

function start(startWindow) {
  startWindow({id: 'a', title: 'hello', render: (c) => {
    c.style.padding = '6px';
    const a = document.createElement('div')
    a.innerText = 'what';
    c.appendChild(a);
  }})
}

console.log('aaaaaaaaa')