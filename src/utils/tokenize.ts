export const tokenize = (s: string) => {
    const r = /"([^"]*)"|'([^']*)'|(\S+)/g
    const out: string[] = []
    let m: RegExpExecArray | null
    while ((m = r.exec(s))) out.push(m[1] ?? m[2] ?? m[3])
    return out
  }
  