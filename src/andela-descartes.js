'use strict'

const Descartes = (tree) => {
	var check = applyMixins(tree);
	var objStyles = flatten(tree);
	applyStyles(objStyles);
}

let applyStyles = (objStyles) => {
	var elements, selector, style, lastIndex;
	for (var key in objStyles) {
		lastIndex = key.lastIndexOf(' ');
		selector = key.substring(0, lastIndex);
		style = key.substring(lastIndex).trim();
		elements = document.querySelectorAll(selector);
		for (var i = 0; i < elements.length; i++) {
			elements[i].style[style] = objStyles[key];
		}
	}
}

let flatten = (obj) => {
  let builtObj = {}
  for (var key in obj) {
    flattenNode(obj, key, builtObj)
  }
  console.log(builtObj)
  return builtObj;
}

let applyMixins = (obj, parentKey) => {
	for (var key in obj) {
		if (key === "_mixin")  {
			obj[parentKey] = obj[key];
		} else if (typeof key === 'object') {
			applyMixins(obj[key], key)
		}
	}
	return obj;
}

let flattenNode = (obj, key, builtObj, parentKey, str) => {
  str = str || ""
  str += ((str.length > 0) ? " " + key : key)
  if (typeof obj[key] == 'object'){
		for (var k in obj[key]) {
			flattenNode(obj[key], k, builtObj, key, str)
		}
  } else {
      builtObj[str] = obj[key]
  }
}
