export class SelectionSort {
  static sort<T>(array: T[]) {
    for (let i = 0; i < array.length; i++) {
      let min = i
      for (let j = i + 1; j < array.length; j++) {
        if (SelectionSort.less(array[j], array[min])) {
          min = j
        }
      }
      SelectionSort.exchange(array, i, min)
    }
  }

  static exchange<T>(array: T[], i: number, j: number) {
    const temp = array[i]
    array[i] = array[j]
    array[j] = temp
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

const array = [10, 15, 1, 2, 9, 4, 5]
SelectionSort.sort(array)
console.log(array)
