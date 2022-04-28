import {addToQueue} from './core';

type reg = {
  id: string,
  onInit: (token: string) => void
}

export function registerApp(reg: reg) {
  addToQueue({id: reg.id, re: reg.onInit})
}