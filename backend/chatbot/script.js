const messagesDiv = document.getElementById("messages");
const inputBox = document.getElementById("input-box");

async function sendMessage() {
    const userMessage = inputBox.value.trim();
    if (!userMessage) return;
    messagesDiv.innerHTML += `<p><strong>You:</strong> ${userMessage}</p>`;
    inputBox.value = "";

    try {
        const response = await fetch("http://localhost:5000/chat", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ message: userMessage }),
        });

        const data = await response.json();

        messagesDiv.innerHTML += `<p><strong>Bot:</strong> ${data.reply}</p>`;
        messagesDiv.scrollTop = messagesDiv.scrollHeight;
    } catch (error) {
        console.error("Error:", error);
        messagesDiv.innerHTML += `<p><strong>Bot:</strong> Error connecting to server.</p>`;
    }
}
