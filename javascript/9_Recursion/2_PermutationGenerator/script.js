const permuteString = (str, prefix = "", results = []) => {
   if (str.length === 0) {
    results.push(prefix);
   return results;
  }

  for (let i = 0; i < str.length; i++) {
    const itemCurrentChar = str[i];
    const remaining = str.slice(0, i) + str.slice(i + 1);
    permuteString(remaining, prefix + itemCurrentChar, results);
  }

  return [...new Set(results)];
};

console.log(permuteString("far"));
console.log(permuteString("fcc"));
console.log(permuteString("p"));
console.log(permuteString(""));
console.log(permuteString("walk"));

