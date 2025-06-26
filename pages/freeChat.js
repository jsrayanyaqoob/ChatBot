import GoogleGenAI from 'https://cdn.jsdelivr.net/npm/@google/genai';


const api_key = 'AIzaSyBlHiEte7wAH2AFLN6Q3ihCF-VQu4uYFG0'
const inputVal = document.getElementById("inputVal")
const heading = document.getElementById("nheading")


const ai = new GoogleGenAI({ apiKey: api_key });

async function main() {
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: inputVal,
  });
  console.log(response.text);
}

main();

// console.log(main())8