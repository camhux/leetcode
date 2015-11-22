// Simple stack class with protected storage.
// Usual methods, plus `_print` for seeing what's been done to it.
function makeStack(array) {
  var stack = {};
  var storage = array || [];

  stack.push = function(value) {
    storage.push(value);
  };
  stack.pop = function() {
    return storage.length > 0 ? storage.pop() : null;
  };
  stack.peek = function() {
    return storage[storage.length-1];
  };
  stack.isEmpty = function() {
    return storage.length === 0;
  };
  stack._print = function() {
    return storage.toString();
  };

  return stack;
}

// In-place ascending sort. No return value.
function sortStackAscending(stack) {
  // If empty, nothing to do.
  if (stack.isEmpty()) return;

  // Need a second stack as a buffer.
  var buffer = makeStack();
  // `unwound` will track number of values that have
  // been flip-flopped between the stacks in the process of sorting.
  var unwound = 0;
  // Two variables for comparisons between popped values.
  // This algorithm may be possible with just one.
  var held, next;

  // Prime our iterations by grabbing our top value as first operand
  // of comparisons that drive the sort.
  held = stack.pop();
  // Loop until we've exhausted the unsorted values.
  while (!stack.isEmpty()) {
    // Grab the next value off the stack.
    next = stack.pop();
    // Compare the next value to the value we're holding.
    if (next > held) {
      // If our next value is greater than our held value,
      // we then must unwind the buffer until we find the
      // sorted place for the next value.
      while (next > buffer.peek()) {
        // Original stack now acts as a buffer for the buffer.
        stack.push(buffer.pop());
        unwound += 1;
      }
      // When the loop breaks, we're in the sorted location for our
      // `next` value, so we insert it here.
      buffer.push(next);
      // Clear out our first stack's buffered items back onto the
      // buffer stack.
      while (unwound > 0) {
        buffer.push(stack.pop());
        unwound -= 1;
      }
    } else {
      buffer.push(held);
      held = next;
    }
  }
  // We'll still be holding the smallest value.
  // Push it to the top of the buffer.
  buffer.push(held);

  // Reverse buffer back onto the original stack.
  while (!buffer.isEmpty()) {
    stack.push(buffer.pop());
  }

}
