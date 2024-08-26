function numTowords(num: number): string {
    if (num < 0 || num > 1000000000000) {
        console.error("Number out of range, must be between 0 and 1,000,000,000,000");
        return "";
    }

    const ones: string[] = [
        "Zero", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine",
        "Ten", "Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen", "Sixteen", "Seventeen", "Eighteen", "Nineteen"
    ];

    const tens: string[] = [
        "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety"
    ];

    const thousand: string = "Thousand";
    const million: string = "Million";
    const billion: string = "Billion";
    const trillion: string = "Trillion";
    const hundred: string = "Hundred";

    function convertLessThanOneThousand(n: number): string {
        if (n === 0) return "";
        if (n < 20) return ones[n];
        if (n < 100) return tens[Math.floor(n / 10) - 2] + (n % 10 === 0 ? "" : " " + ones[n % 10]);
        return ones[Math.floor(n / 100)] + " " + hundred + (n % 100 === 0 ? "" : " and " + convertLessThanOneThousand(n % 100));
    }

    function convert(num: number): string {
        if (num === 0) return ones[0];

        if (num < 1000) {
            return convertLessThanOneThousand(num);
        } else if (num < 1000000) { // Thousands
            return convertLessThanOneThousand(Math.floor(num / 1000)) + " " + thousand + (num % 1000 !== 0 ? " " + convertLessThanOneThousand(num % 1000) : "");
        } else if (num < 1000000000) { // Millions
            return convertLessThanOneThousand(Math.floor(num / 1000000)) + " " + million + (num % 1000000 !== 0 ? " " + convert(num % 1000000) : "");
        } else if (num < 1000000000000) { // Billions
            return convertLessThanOneThousand(Math.floor(num / 1000000000)) + " " + billion + (num % 1000000000 !== 0 ? " " + convert(num % 1000000000) : "");
        } else { // Trillions
            return convertLessThanOneThousand(Math.floor(num / 1000000000000)) + " " + trillion + (num % 1000000000000 !== 0 ? " " + convert(num % 1000000000000) : "");
        }
    }

    return convert(num);
}

export default numTowords;
