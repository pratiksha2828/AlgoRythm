const axios = require('axios');

// Store API key and URL directly
const apiKey = "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"; // Replace with your actual API key
const apiUrl = "https://openrouter.ai/api/v1/chat/completions"; // Replace with your actual API URL

// Example of faulty JavaScript code
const faultyCode = `
function add(a, b) {
    return a + b;   // Fixed missing semicolon
    console.log("This won't execute"); // Unreachable code
}
`;

async function refactorCode(code) {
    try {
        const requestData = {
            model: "google/gemma-3-27b-it:free",
            messages: [
                { role: "user", content: `Fix the errors in this JavaScript code:\n${code}` }
            ]
        };

        console.log("Sending request to API...\n", JSON.stringify(requestData, null, 2));

        const response = await axios.post(apiUrl, requestData, {
            headers: { Authorization: `Bearer ${apiKey}` }
        });

        console.log("\nResponse Received:");
        console.log(JSON.stringify(response.data, null, 2));

        console.log("\nFixed Code:\n", response.data.choices[0].message.content);

        return response.data.choices[0].message.content;
    } catch (error) {
        console.error("Error:", error.response ? error.response.data : error.message);
    }
}

// Exporting the function and faultyCode so it can be used in another file
module.exports = {
    refactorCode,
    faultyCode
};
