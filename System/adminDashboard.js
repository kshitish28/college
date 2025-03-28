window.onload = function () {
    // Fetch stored user details
    const username = localStorage.getItem('username') || "User";
    const loginTime = localStorage.getItem('loginTime') || "";
    const role = localStorage.getItem('role') || "guest"; // Default to "guest" if no role is found

    // Update welcome message
    document.getElementById('welcomeUser').innerText = `Welcome, ${username}`;
    document.getElementById('loginTime').innerText = loginTime;

    // Display birthday message if applicable
    const currentDate = new Date();
    const birthday = new Date(currentDate.getFullYear(), 2, 10); // March 10 (Month index starts from 0)
    if (currentDate.toDateString() === birthday.toDateString()) {
        document.getElementById('birthdayMessage').innerText = "🎉 Happy Birthday! 🎂";
    }

    // Add event listeners to "More..." links
    document.querySelectorAll('.more').forEach(moreLink => {
        moreLink.addEventListener('click', () => {
            alert("More details will be available soon.");
        });
    });

    // Handle "Update Bus Schedule" button
    const updateBusScheduleButton = document.getElementById("updateBusSchedule");
    if (updateBusScheduleButton) {
        updateBusScheduleButton.addEventListener("click", () => {
            if (role.toLowerCase() === "admin") {
                window.location.href = "BusSchdule.html"; // Redirect admins
            } else {
                alert("🚫 Access Denied! Only admins can update the bus schedule.");
            }
        });
    }
};
