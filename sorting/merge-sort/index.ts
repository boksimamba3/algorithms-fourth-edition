export class MergeSort {
  static sort<T>(array: T[], lo: number, hi: number) {
    if (hi <= lo) {
      return
    }
    const mid = lo + Math.floor((hi - lo) / 2)
    MergeSort.sort(array, lo, mid)
    MergeSort.sort(array, mid + 1, hi)
    MergeSort.merge(array, lo, mid, hi)
  }

  static merge<T>(array: T[], lo: number, mid: number, hi: number) {
    const aux: T[] = Array.from({ length: hi - lo + 1 })
    let i = lo
    let j = mid + 1
    // Copy array[lo...hi] to aux[lo...hi]
    for (let k = lo; k <= hi; k++) {
      aux[k] = array[k]
    }
    for (let k = lo; k <= hi; k++) {
      if (i > mid) {
        array[k] = aux[j++]
      } else if (j > hi) {
        array[k] = aux[i++]
      } else if (MergeSort.less(aux[j], aux[i])) {
        array[k] = aux[j++]
      } else {
        array[k] = aux[i++]
      }
    }
  }

  static less<T>(a: T, b: T) {
    return a < b
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
MergeSort.sort(array, 0, array.length - 1)
console.log(array)
console.log('Sorted:', MergeSort.isSorted(array))
