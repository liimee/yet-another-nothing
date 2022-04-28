import {addToQueue, startWindow, type winp, listen} from './core';

type reg = {
  id: string,
  onInit: (token: string, functions: {
    startWindow: (win: winp) => void
  }) => void
}

export function registerApp(reg: reg) {
  addToQueue({id: reg.id, re: (v) => reg.onInit(v, {
    startWindow: s
  })})
}

function s(win: winp) {
  startWindow(win)

  listen((a) => {
    if(a[1] == 'close') if(win.onClose) win.onClose(a[2])
  }, 'windowsChange', win.token+':'+win.id)
}