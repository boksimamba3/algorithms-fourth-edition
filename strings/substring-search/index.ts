export class Substring {
  static search(pattern: string, text: string) {
    const n = text.length
    const m = pattern.length

    for (let i = 0; i <= n - m; i++) {
      let j
      for (j = 0; j < m; j++) {
        if (text.charCodeAt(i + j) !== pattern.charCodeAt(j)) break
      }
      if (j === m) {
        return i
      }
    }

    return n
  }
}
