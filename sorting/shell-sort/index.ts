export class ShellSort {
  static sort<T>(array: T[]) {
    let h = 1
    while (h < Math.floor(array.length / 3)) {
      h = 3 * h + 1
    }
    while (h >= 1) {
      for (let i = h; i < array.length; i++) {
        for (
          let j = i;
          j >= h && ShellSort.less(array[j], array[j - h]);
          j -= h
        ) {
          ShellSort.exchange(array, j, j - h)
        }
      }
      h = Math.floor(h / 3)
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
ShellSort.sort(array)
console.log(array)
console.log('Sorted:', ShellSort.isSorted(array))
