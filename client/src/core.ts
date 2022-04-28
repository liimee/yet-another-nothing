let su = '';
let started = false;

type appQ = { id: string, re: (s: string) => void };

export type window = {
  id: string
}

const appQueue: appQ[] = [];
const registered: string[] = [];
const windows: window[] = [];

const l: {[key: string]: ((...v: any[]) => void)[]} = {}

export function start(s: string) {
  if (!started) {
    su = s;
    started = true;
    const modules = import.meta.glob('../../data/pkg/*/main.js')
    for (const path in modules) {
      modules[path]()
    }
    doQ();
  }
}

export function addToQueue(a: appQ) {
  appQueue.push(a);
  if (started) doQ();
}

export function startWindow(b: window) {
  windows.push(b);

  notify('windowsChange', windows);
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function notify(a: string, ...b: any[]) {
  (l[a]||[]).forEach(v => v(...b));
}

export function listen(a: ((...v: any[]) => void), b: string) {
  if(l[b]) l[b].push(a); else l[b] = [a];
}

function doQ() {
  appQueue.forEach(v => {
    if (!registered.includes(v.id)) {
      fetch(import.meta.env.VITE_SERVER + '/token', {
        method: 'POST',
        headers: new Headers({
          'Content-Type': 'application/json'
        }),
        body: JSON.stringify({
          su,
          id: v.id
        })
      }).then(v => v.json()).then(p => {
        registered.push(v.id);
        v.re(p.token);
      })
    }
  })
}