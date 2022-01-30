import { SuffixArray } from '../suffix-array'

const query = 'Lorem'

let text = `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.`

const n = text.length
const context = 3

const sa = new SuffixArray(text)

for (let i = sa.rank(query); i < n; i++) {
  let from = sa.index(i)
  let to = Math.min(n, from + query.length)
  if (query !== text.substring(from, to)) break
  from = Math.max(0, sa.index(i) - context)
  to = Math.min(n, sa.index(i) + context + query.length)
  console.log(text.substring(from, to))
}
