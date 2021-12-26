export class CountingSort {
  static sort(array: number[], radix: number) {
    const count = Array.from<number>({ length: radix + 1 }).fill(0)
    const aux = Array.from<number>({ length: array.length })

    // count frequency
    for (let i = 0; i < array.length; i++) {
      count[array[i] + 1]++
    }

    // compute cumulates
    for (let i = 0; i < radix; i++) {
      count[i + 1] += count[i]
    }

    for (let i = 0; i < array.length; i++) {
      aux[count[array[i]]++] = array[i]
    }

    for (let i = 0; i < array.length; i++) {
      array[i] = aux[i]
    }
  }
}

const array = [4, 5, 2, 2, 1, 3, 3, 3, 0, 9]

// radix = 9, alphabet = 0, 1, 2, 3, 4, 5, 6, 7, 8, 9
CountingSort.sort(array, 10)
console.log(array)
