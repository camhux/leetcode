function insertBits(n, m, i, j) {
  // Clear bits i..j of n
  var clearedN = n & ~(((1 << j) - 1) & ~((1 << i) - 1));
  // Create integer mask <- m << i
  var mask = m << i;
  // Return n | mask
  return clearedN | mask;
}
