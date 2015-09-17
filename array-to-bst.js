/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {number[]} nums
 * @return {TreeNode}
 */

 var TreeNode = function(val) {
    this.val = val;
    this.left = this.right = null;
 };

 //[1,2,3,4]
var sortedArrayToBST = function(nums, low, high) {
  low = low || 0;
  high = high || nums.length - 1;


  var center = Math.ceil((high - low) / 2);
  var rootNode = new TreeNode(nums[center]);

  console.log(low, high);

  rootNode.left = sortedArrayToBST(nums, low, center - 1);
  rootNode.right = sortedArrayToBST(nums, center + 1, high);

  return rootNode;
};

console.log(sortedArrayToBST([-90, -80, -50, -10, 0, 5, 10, 15, 20, 25, 30]));