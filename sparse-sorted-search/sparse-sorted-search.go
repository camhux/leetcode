package sparse

import "sync"

func Search(array []string, target string) int {
	var n, low, mid, high int

	n = len(array)
	low = 0
	high = n - 1

	for low < high {

		mid = (high-low)/2 + low

		if array[mid] == "" {
			var lBound, rBound int
			lBound = mid
			rBound = mid

			var wg sync.WaitGroup

			wg.Add(2)

			go func() {
				for array[lBound] == "" && lBound > 0 {
					lBound--
				}
				wg.Done()
			}()

			go func() {
				for array[rBound] == "" && rBound < n-1 {
					rBound++
				}
				wg.Done()
			}()

			wg.Wait()

			left := array[lBound]
			right := array[rBound]

			switch {
			case left == target:
				return lBound
			case right == target:
				return rBound
			case left > target:
				high = lBound - 1
				continue
			case right < target:
				low = rBound + 1
				continue
			default:
				break
			}
		}

		switch s := array[mid]; {
		case s == target:
			return mid
		case s > target:
			high = mid - 1
			continue
		case s < target:
			low = mid + 1
			continue
		}
	}

	return -1
}
