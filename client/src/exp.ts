import {addToQueue, startWindow, type winp} from './core';

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
}