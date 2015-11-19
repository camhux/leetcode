/**
 * @param {number[]} nums
 * @return {number}
 */
var jump = function(nums) {
  var jumps = 0;
  var pos = 0;
  var maxMoves;
  var maxMove;
  var j;

  while (pos < nums.length - 1) {
    maxMoves = nums[pos];

    if (maxMoves > 1) {

      for (j = maxMove = maxMoves; j > 0; j--) {
        if (pos + j >= nums.length - 1) {
          maxMove = j;
          break;
        }
        if (nums[pos + j] > nums[maxMove]) {
          maxMove = pos + j;
        }
      }

      pos += maxMove;

    } else {
      pos += 1;
    }
    jumps += 1;
  }

  return jumps;
};

console.log(jump([1,2,1,1,1]));
