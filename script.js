const spinner = document.getElementById("spinner");
// Set up variables for the API endpoint and your API key
const endpoint = 'https://api.openai.com/v1/chat/completions';

// Function to send user input to the GPT API and display the response
async function askGpt(question, apiKey) {
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

    try{
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
    console.log(data)
    const text = data.choices[0].message.content;
    const chatbotResponse = document.getElementById('answer');
    chatbotResponse.innerHTML += `
    <div>
    <div class="chatbot-card"><strong>You:</strong> ${question}</div>`;
    chatbotResponse.innerHTML += `<div class="chatbot-card"><strong>Chatbot:</strong> ${text}</div> </div> <hr style="height: 2px; 
    border: none;
    background-color: black;
    margin: 10px 0;">`;} catch(error){
        console.error(error);
    } finally {
        spinner.style.display = "none";
    }
}

async function getApiKey() {
    const response = await fetch('http://localhost:3000/api-key');
    const data = await response.json();
    return data.apiKey;
  }

// Event listener to send user input to the chatbot when the Enter key is pressed
const userInput = document.getElementById('user-input');
const submit = document.querySelector('.submit');
userInput.addEventListener('keydown', async function(event) {
    if (event.key === 'Enter') {
        const question = event.target.value;
        event.target.value = '';
        const apiKey = await getApiKey();
        askGpt(question, apiKey);
    }
});

submit.addEventListener('click', async function(){
    const question = userInput.value;
    userInput.value = '';
    const apiKey = await getApiKey();
    askGpt(question, apiKey);
})
