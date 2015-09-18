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
  if (low === undefined) {
    low = 0;
  }
  if (high === undefined) {
    high = nums.length - 1;
  }

  if (high < low) return null;
  if (high === low) return new TreeNode(nums[low]);

  var center = Math.floor((high - low )/ 2) + low;
  var rootNode = new TreeNode(nums[center]);

  rootNode.left = sortedArrayToBST(nums, low, center - 1);
  rootNode.right = sortedArrayToBST(nums, center + 1, high);

  return rootNode;
};
