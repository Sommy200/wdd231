document.addEventListener("DOMContentLoaded", () => {
    // Set current date and time in the hidden timestamp input
    const timestampField = document.getElementById("timestamp");
    if (timestampField) {
        const now = new Date();
        timestampField.value = now.toLocaleString();
    }

    // Modal triggers
    const openButtons = document.querySelectorAll(".open-modal-btn");
    openButtons.forEach((button) => {
        button.addEventListener("click", () => {
            const modalId = button.getAttribute("data-modal");
            const modal = document.getElementById(modalId);
            if (modal) {
                modal.showModal();
            }
        });
    });

    // Close buttons inside modals
    const closeButtons = document.querySelectorAll(".close-modal-btn");
    closeButtons.forEach((button) => {
        button.addEventListener("click", () => {
            const modal = button.closest("dialog");
            if (modal) {
                modal.close();
            }
        });
    });

    // Close modal when clicking outside the dialog box
    const modals = document.querySelectorAll(".membership-modal");
    modals.forEach((modal) => {
        modal.addEventListener("click", (event) => {
            const rect = modal.getBoundingClientRect();
            const isInDialog =
                event.clientX >= rect.left &&
                event.clientX <= rect.right &&
                event.clientY >= rect.top &&
                event.clientY <= rect.bottom;
            if (!isInDialog) {
                modal.close();
            }
        });
    });
});