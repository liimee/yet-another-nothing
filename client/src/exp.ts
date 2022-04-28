import {addToQueue, startWindow} from './core';
import type {window} from './core';

type reg = {
  id: string,
  onInit: (token: string, functions: {
    startWindow: (win: window) => void
  }) => void
}

export function registerApp(reg: reg) {
  addToQueue({id: reg.id, re: (v) => reg.onInit(v, {
    startWindow: s
  })})
}

function s(win: window) {
  startWindow(win)
}