import {appQueue, startWindow, type winp, listen, stopListening, type desktopEntry, regDesktop} from './core';

type reg = {
  id: string,
  onInit: (token: string, functions: {
    startWindow: (win: winp) => void
  }) => void
}

export function registerApp(reg: reg) {
  appQueue.addToQueue((v) => reg.onInit(v, {
    startWindow: s
  }), reg.id)
}

export function registerDesktopEntry(w: desktopEntry) {
  regDesktop(w);
}

function s(win: winp) {
  startWindow(win)

  listen((a) => {
    if(a[1] == 'close') {
      if(win.onClose) win.onClose(a[2]);
      stopListening(win.token+':'+win.id, 'windowsChange');
    }
  }, 'windowsChange', win.token+':'+win.id)
}