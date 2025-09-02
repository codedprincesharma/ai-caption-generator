// Import the correct package
const { GoogleGenerativeAI } = require("@google/generative-ai");

// API key (environment variable use karna best practice hai)
const ai = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function main() {
  const model = ai.getGenerativeModel({ model: "gemini-1.5-flash" });

  const result = await model.generateContent("Explain how AI works in a few words");

  console.log(result.response.text());
}

main();
