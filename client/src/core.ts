let su = '';
let started = false;

type appQ = { id: string, re: (s: string) => void };

export type window = {
  id: string,
  gid: number,
  title: string,
  render: (arg0: HTMLElement) => void
}

export type winp = {
  id: string,
  title: string,
  token: string,
  onClose?: (id: string) => void,
  render: (arg0: HTMLElement) => void
}

const appQueue: appQ[] = [];
const registered: string[] = [];
const windows: window[] = [];
let lastwindow = 0;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const l: {[key: string]: ({id: string, fun: (...v: any[]) => void})[]} = {}

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

export function startWindow(b: winp) {
  windows.push({
    id: b.id,
    gid: lastwindow,
    title: b.title,
    render: b.render
  });

  lastwindow++;

  notify('windowsChange', windows);
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function notify(a: string, ...b: any[]) {
  (l[a]||[]).forEach(v => v.fun([...b]));
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function listen(a: ((...v: any[]) => void), b: string, c: string) {
  if(l[b]) l[b].push({id: c, fun: a}); else l[b] = [{id: c, fun: a}];
}

export function closeWin(gid: number) {
  const k = windows.find(v => v.gid === gid)
  windows.splice(windows.findIndex(v => v.gid === gid), 1);

  notify('windowsChange', windows, 'close', k);
}

export function stopListening(id: string, ev: string) {
  if(l[ev]) {
    l[ev].splice(l[ev].findIndex(v => v.id === id), 1)
  }
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