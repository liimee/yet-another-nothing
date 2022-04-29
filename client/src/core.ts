let su = '';
let started = false;

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

type qItem<T> = {
  id: string,
  val: T
}

class Queue<T> {
  queue: qItem<T>[] = [];
  done: string[] = [];
  do: (arg0: qItem<T>[]) => void;
  dn = false;

  constructor(d: (arg0: qItem<T>[]) => void) {
    this.do = d;
  }

  addToQueue(a: T, id: string) {
    this.queue.push({
      id,
      val: a
    });

    if(this.dn) this.run();
  }

  finish(id: string) {
    this.done.push(id);
  }

  run() { this.do(this.queue); this.dn = true; }

  clean() {
    this.queue = this.queue.filter((v) => !this.done.includes(v.id))
  }
}

export const appQueue = new Queue<(arg0: string) => void>((v) => {
  v.forEach(v => {
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
      appQueue.finish(v.id);
      v.val(p.token);
    })
  })
});

const windows: window[] = [];
let lastwindow = 0;

export type desktopEntry = {
  title: string,
  onClick: ()=>void
};

const desktopEntries: desktopEntry[] = [];

export function regDesktop(a: desktopEntry) {
  desktopEntries.push(a);

  notify('desktopEntries', desktopEntries);
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const l: { [key: string]: ({ id: string, fun: (...v: any[]) => void })[] } = {}

export function start(s: string) {
  if (!started) {
    su = s;
    started = true;
    const modules = import.meta.glob('../../data/pkg/*/main.js')
    for (const path in modules) {
      modules[path]()
    }
    appQueue.run();
  }
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
  (l[a] || []).forEach(v => v.fun([...b]));
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function listen(a: ((...v: any[]) => void), b: string, c: string) {
  if (l[b]) l[b].push({ id: c, fun: a }); else l[b] = [{ id: c, fun: a }];
}

export function closeWin(gid: number) {
  const k = windows.find(v => v.gid === gid)
  windows.splice(windows.findIndex(v => v.gid === gid), 1);

  notify('windowsChange', windows, 'close', k);
}

export function stopListening(id: string, ev: string) {
  if (l[ev]) {
    l[ev].splice(l[ev].findIndex(v => v.id === id), 1)
  }
}