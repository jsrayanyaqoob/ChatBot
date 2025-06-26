// import { collection, addDoc } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-firestore.js"; 
const inputVal = document.getElementById("inputVal");
const heading = document.getElementById("heading");

const botMessages = []
const userMessages = []

inputVal.addEventListener("keydown", async (e) => {
  if (e.key === "Enter") {
    const userInput = inputVal.value;
    
    const res = await fetch("http://localhost:3000/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt: userInput }),
    });

    const data = await res.json()
    const result = data?.candidates?.[0]?.content?.parts?.[0]?.text
    userMessages.push(userInput)
    botMessages.push(result)
    console.log(userMessages)
    console.log(botMessages)
  }
})