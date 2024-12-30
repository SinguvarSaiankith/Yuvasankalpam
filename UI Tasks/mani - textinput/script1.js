document.getElementById('userInput').addEventListener('input', function() {
    const userInput = this.value;  // Get the input value from the textarea
    const outputTextElement = document.querySelector('.output-text');
  
    // If input is empty, don't display anything
    if (userInput.trim() === '') {
      outputTextElement.textContent = '';
      return;
    }
  
    // Apply a random gradient to the output text
    const randomGradient = `linear-gradient(${Math.random() * 360}deg, #${Math.floor(Math.random() * 16777215).toString(16)}, #${Math.floor(Math.random() * 16777215).toString(16)})`;
    outputTextElement.style.background = randomGradient;
    outputTextElement.style.WebkitBackgroundClip = "text";  // Ensure the gradient is clipped to the text
    outputTextElement.textContent = userInput;  // Display the entered text
});
