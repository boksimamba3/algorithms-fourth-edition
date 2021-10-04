import { InsertionSort } from '../insertion-sort'

const CUTOFF = 5

export class QuickSort {
  static sort<T>(array: T[], lo: number, hi: number) {
    if (hi <= lo + 5) {
      InsertionSort.sort(array) // 👈 improves quick sort for tiny subarray's
      return
    }
    const j = QuickSort.partition(array, lo, hi)
    QuickSort.sort(array, lo, j - 1)
    QuickSort.sort(array, j + 1, hi)
  }

  static partition<T>(array: T[], lo: number, hi: number): number {
    let i = lo
    let j = hi + 1
    const v = array[lo]
    while (true) {
      while (QuickSort.less(array[++i], v)) if (i === hi) break
      while (QuickSort.less(v, array[--j])) if (j === lo) break
      if (i >= j) break
      QuickSort.exchange(array, i, j)
    }
    QuickSort.exchange(array, lo, j)

    return j
  }

  static less<T>(a: T, b: T) {
    return a < b
  }

  static exchange<T>(array: T[], i: number, j: number) {
    const temp = array[i]
    array[i] = array[j]
    array[j] = temp
  }

  static isSorted<T>(array: T[]) {
    for (let i = 0; i < array.length; i++) {
      if (array[i] < array[i - 1]) {
        return false
      }
    }

    return true
  }
}

const array = [10, 15, 1, 2, 9, 4, 5, 3]
QuickSort.sort(array, 0, array.length - 1)
console.log(array)
console.log('Sorted:', QuickSort.isSorted(array))
