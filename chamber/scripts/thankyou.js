document.addEventListener("DOMContentLoaded", () => {
    const resultsContainer = document.getElementById("results");
    if (!resultsContainer) return;

    const params = new URLSearchParams(window.location.search);

    const firstName = params.get("fname") || "Not provided";
    const lastName = params.get("lname") || "Not provided";
    const email = params.get("email") || "Not provided";
    const phone = params.get("phone") || "Not provided";
    const organization = params.get("organization") || "Not provided";
    const timestamp = params.get("timestamp") || "Not recorded";

    resultsContainer.innerHTML = `
        <p><strong>Applicant Name:</strong> ${firstName} ${lastName}</p>
        <p><strong>Email Address:</strong> ${email}</p>
        <p><strong>Mobile Phone:</strong> ${phone}</p>
        <p><strong>Business / Organization:</strong> ${organization}</p>
        <p><strong>Submitted On:</strong> ${timestamp}</p>
    `;
});