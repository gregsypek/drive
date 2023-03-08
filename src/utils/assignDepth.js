const assignDepth = (arr, depth = 0, index = 0) => {
  console.log("🚀 ~ file: assignDepth.js:2 ~ assignDepth ~ arr!!!!:", arr)
  // TODO EMPTY OBJECT SHOULD NOT EXIST IN STATE ARRAY - CAUSE PROBLEMS HERE (arr[index] === {depth: 0}) - no other properties and arr[index] has length
  if (index < arr.length && arr[index].id !== undefined) {
    arr[index].depth = depth;
    if (arr[index].folders.length) {
      return assignDepth(arr[index].folders, depth + 1, 0);
    }
    return assignDepth(arr, depth, index + 1);
  }
  return;
};


export default assignDepth;


// var object = {
//   a: {
//       b: 1,
//       c: {
//           a: 1,
//           d: {},
//           e: {
//             f: {} 
//           }
//       }
//   },
//   b: {}
// }

// function clearEmpties(o) {
// for (var k in o) {
//   if (!o[k] || typeof o[k] !== "object") {
//     continue // If null or not an object, skip to the next iteration
//   }

//   // The property is an object
//   clearEmpties(o[k]); // <-- Make a recursive call on the nested object
//   if (Object.keys(o[k]).length === 0) {
//     delete o[k]; // The object had no properties, so delete that property
//   }
// }
//   return o;
// }

// clearEmpties(object)