let su = '';
let started = false;

type appQ = { id: string, re: (s: string) => void };

const appQueue: appQ[] = [];
const registered: string[] = [];

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