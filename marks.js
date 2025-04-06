document.addEventListener("DOMContentLoaded", function() {
    // Sidebar button active state toggle
    let buttons = document.querySelectorAll(".sidebar-btn");

    buttons.forEach(button => {
        button.addEventListener("click", function() {
            document.querySelector(".sidebar-btn.active")?.classList.remove("active");
            this.classList.add("active");
        });
    });

    // Table row hover effect
    let tableRows = document.querySelectorAll(".info-table tr:not(.title-row)");

    tableRows.forEach(row => {
        row.addEventListener("mouseenter", function() {
            this.style.backgroundColor = "#eef";
            this.style.transition = "background-color 0.3s ease-in-out";
        });

        row.addEventListener("mouseleave", function() {
            this.style.backgroundColor = "";
        });
    });

    // Semester switching logic
    let semesterButtons = document.querySelectorAll(".sem-btn");

    semesterButtons.forEach(button => {
        button.addEventListener("click", function() {
            document.querySelector(".sem-btn.active")?.classList.remove("active");
            this.classList.add("active");

            let semesterId = this.innerText.split(" ")[1]; // Extract semester number
            document.querySelectorAll(".semester").forEach(sem => sem.style.display = "none");
            document.getElementById(`semester${semesterId}`).style.display = "block";
        });
    });

    // Set default semester display on page load
    document.getElementById("semester3").style.display = "block"; // Default to Semester 3
});
