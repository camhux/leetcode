var invertTree = function(root) {
  if (!root) return [];  
  var temp = root.left;
  root.left = root.right;
  root.right = temp;
  invertTree(root.left);
  invertTree(root.right);
  return root;
};

var tree = {value: 4 , left: {value: 2, left: {value: 1, left: null, right: null}, right: {value: 3, left: null, right: null} }, right: {value: 7, left: {value:6 , left: null, right: null}, right:{value: 6, left: null, right: null} }}

console.log(invertTree());