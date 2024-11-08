// script.js
document.getElementById("contactForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent form from submitting in the traditional way

    // Simulate a response
    document.getElementById("responseMessage").textContent = "Thank you for contacting us! We'll get back to you shortly.";
    
    // Clear the form
    event.target.reset();
});
