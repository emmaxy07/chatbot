const spinner = document.getElementById("spinner");
// Set up variables for the API endpoint and your API key
const endpoint = 'https://api.openai.com/v1/chat/completions';
const apiKey = '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';

// Function to send user input to the GPT API and display the response
async function askGpt(question) {
spinner.style.display = "block";
    // Set up the API request body
    const requestBody = {
        model: 'gpt-3.5-turbo',
        messages: [
        {
            role: 'user',
            content: question
        }
    ]
    };

    // Send the API request using the Fetch API
    const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify(requestBody)
    });
spinner.style.display = "none";
    // Parse the API response and display the generated text
    const data = await response.json();
    const text = data.choices[0].message.content;
    const chatbotResponse = document.getElementById('answer');
    chatbotResponse.innerHTML += `
    <div>
    <div class="chatbot-card"><strong>You:</strong> ${question}</div>`;
    chatbotResponse.innerHTML += `<div class="chatbot-card"><strong>Chatbot:</strong> ${text}</div> </div> <hr>`;
}

// Event listener to send user input to the chatbot when the Enter key is pressed
const userInput = document.getElementById('user-input');
const submit = document.querySelector('.submit');
userInput.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        const question = event.target.value;
        event.target.value = '';
        askGpt(question);
    }
});

submit.addEventListener('click', function(){
    const question = userInput.value;
    userInput.value = '';
    askGpt(question);
})
