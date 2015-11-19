package sparse

import "testing"

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
}

func TestSearch(t *testing.T) {
	for _, test := range cases {
		if actual := Search(test.array, test.target); actual != test.expected {
			t.Errorf("Wrong index from search. Expected %v, got %v", test.expected, actual)
		}
	}
}
