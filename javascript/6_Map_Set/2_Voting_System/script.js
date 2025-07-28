// ✅ Initialize poll variable
const poll = new Map();

// ✅ Add option to the poll
function addOption(option) {
  if (option === '') {
    return 'Option cannot be empty.';
  }
  if (poll.has(option)) {
    return `Option "${option}" already exists.`;
  }
  poll.set(option, new Set());
  return `Option "${option}" added to the poll.`;
}

// ✅ Vote function with duplicate check
function vote(option, voterId) {
  if (!poll.has(option)) {
    return `Option "${option}" does not exist.`;
  }
  const voters = poll.get(option);
  if (voters.has(voterId)) {
    return `Voter ${voterId} has already voted for "${option}".`;
  }
  voters.add(voterId);
  return `Voter ${voterId} voted for "${option}".`;
}

// ✅ Display results
function displayResults() {
  let result = 'Poll Results:\n';
  for (const [option, voters] of poll.entries()) {
    result += `${option}: ${voters.size} votes\n`;
  }
  return result.trim();

  //  let resut = 'Poll Results:\n';
  //   pool.forEach((value, key) => {
  //       resut += `${key}: ${value.size} votes\n`;
  //   });
  //   return resut;
}

// ✅ Add at least 3 options
addOption('Turkey');
addOption('Morocco');
addOption('Vietnam');

// ✅ Add at least 3 votes
vote('Turkey', 'voter1');
vote('Morocco', 'voter2');
vote('Vietnam', 'voter3');

// ✅ Display final results
console.log(displayResults());
