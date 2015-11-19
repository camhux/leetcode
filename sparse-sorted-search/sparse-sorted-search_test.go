package sparse

import (
	"math/rand"
	"testing"
	"time"
)

type Test struct {
	array    []string
	target   string
	expected int
}

var cases = []Test{

	{
		[]string{"", "", "", "a", "", "", "b", "", "", "c", ""},
		"b",
		6,
	},

	{
		[]string{"abc", "", "", "", "abd", "", "", "bcd", "", "", "", "", "", "ded", "", ""},
		"ded",
		13,
	},

	{
		[]string{"", "", "", "", "", "", "", "", "", "", ""},
		"unfound",
		-1,
	},

	{
		[]string{"at", "", "", "", "ball", "", "", "car", "", "", "dad", "", ""},
		"ball",
		4,
	},

	{
		[]string{"at", "", "", "", "ball", "", "", "car", "", "", "dad", "", ""},
		"dog",
		-1,
	},
}

func init() {
	rand.Seed(time.Now().UnixNano())
}

func TestSearch(t *testing.T) {
	for _, test := range cases {
		if actual := Search(test.array, test.target); actual != test.expected {
			t.Errorf("Wrong index from search. Expected %v, got %v", test.expected, actual)
		}
	}
}

func TestSearchLinear(t *testing.T) {
	for _, test := range cases {
		if actual := SearchLinear(test.array, test.target); actual != test.expected {
			t.Errorf("Wrong index from linear search. Expected %v, got %v", test.expected, actual)
		}
	}
}

func TestSearchConcurrent(t *testing.T) {
	for _, test := range cases {
		if actual := SearchConcurrent(test.array, test.target); actual != test.expected {
			t.Errorf("Wrong index from concurrent search. Expected %v, got %v", test.expected, actual)
		}
	}
}

var benchmarkCase = genBenchmarkCase()

func BenchmarkSearch(b *testing.B) {
	for i := 0; i < b.N; i++ {
		Search(benchmarkCase.array, benchmarkCase.target)
	}
}

func BenchmarkSearchLinear(b *testing.B) {
	for i := 0; i < b.N; i++ {
		SearchLinear(benchmarkCase.array, benchmarkCase.target)
	}
}

func BenchmarkSearchConcurrent(b *testing.B) {
	for i := 0; i < b.N; i++ {
		SearchConcurrent(benchmarkCase.array, benchmarkCase.target)
	}
}

func genBenchmarkCase() Test {
	out := make([]string, 10000)
	target := genRandomStringN(3)
	targetIdx := rand.Intn(10001)

	out[targetIdx] = target

	for i := range out {
		if out[i] == "" && rand.Intn(10) < 2 {
			out[i] = genRandomStringN(2)
		}
	}

	return Test{
		out,
		target,
		targetIdx,
	}
}

const letters = "abcdefghijklmnopqrstuvwxyz"
const (
	letterIdxBits = 5
	letterIdxMask = 1<<letterIdxBits - 1
	letterIdxMax  = 63 / letterIdxBits
)

func genRandomStringN(n int) string {
	out := make([]byte, n)

	for i, cache, remain := n-1, rand.Int63(), letterIdxMax; i >= 0; {
		if remain == 0 {
			cache, remain = rand.Int63(), letterIdxMax
		}
		if idx := int(cache & letterIdxMask); idx < len(letters) {
			out[i] = letters[idx]
			i--
		}
		cache >>= letterIdxBits
		remain--
	}

	return string(out)
}
