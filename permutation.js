// Helper function to calculate factorial
function factorial(n) {
    if (n <= 1)
        return 1;
    return n * factorial(n - 1);
}
function CountPermutation(word) {
    // Remove spaces from the input word
    const filteredWord = word.replace(/\s+/g, "");
    const letterCounts = {};
    // Count occurrences of each letter
    for (const letter of filteredWord) {
        letterCounts[letter] = (letterCounts[letter] || 0) + 1;
    }
    const totalLetter = filteredWord.length;
    let denominator = 1;
    // Calculate the denominator (product of factorials of letter counts)
    for (const count of Object.values(letterCounts)) {
        denominator *= factorial(count);
    }
    // Calculate the total permutations
    const totalPermutations = factorial(totalLetter) / denominator;
    return totalPermutations;
}
export default CountPermutation;
