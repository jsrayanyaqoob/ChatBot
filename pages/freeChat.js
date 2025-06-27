const inputVal = document.getElementById("inputVal");
const heading = document.getElementById("heading");
const chatContainer = document.getElementById("chatContainer");
const inputContainer = document.getElementById("inputContainer");

inputVal.addEventListener("keydown", async (e) => {
  if (e.key === "Enter") {
  const userInput = inputVal.value.trim();
  if (!userInput) return;

  if (heading && !heading.classList.contains("fade-out")) {
    heading.classList.add("fade-out");
  }

  displayMessage(userInput, "user");
  inputVal.value = "";

  try {
    const res = await fetch("http://localhost:3000/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt: userInput }),
    });

    const data = await res.json();
    const result = data?.candidates?.[0]?.content?.parts?.[0]?.text || "Sorry, I couldn’t respond.";

    displayMessage(result, "bot");

  } catch (error) {
    displayMessage("There was an error fetching the response.", "bot");
    console.error(error);
  }
}

});



function displayMessage(message, sender) {
  const messageWrapper = document.createElement("div")
  messageWrapper.className = `flex items-start gap-3 ${sender === "user" ? "justify-end" : "justify-start"}`

  const avatar = document.createElement("img")
  avatar.src = sender === "user" ? "/assets/guestUser.png" : "/assets/chatBot.png";
  avatar.className = "w-8 h-8 rounded-full border bg-white object-cover";

  const msg = document.createElement("div");
  msg.textContent = message;
  msg.className = `max-w-[75%] p-3 rounded-xl text-white text-sm leading-relaxed ${
    sender === "user" ? "bg-[#4a4a4a]" : "bg-[#3A3A3A]"
  }`;

  messageWrapper.appendChild(sender === "user" ? msg : avatar);
  messageWrapper.appendChild(sender === "user" ? avatar : msg);

  chatContainer.appendChild(messageWrapper);
  chatContainer.scrollTop = chatContainer.scrollHeight;

  inputVal.classList.remove("pb-12")
  inputVal.classList.add("pb-5")
  inputContainer.classList.add('mt-5')

}
