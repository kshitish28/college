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

    // Display the notices on page load for all users
    displayNotices();
};

// Handle notice submission (Admin only)
document.getElementById('submitNotice').addEventListener('click', () => {
    const noticeTitle = document.getElementById('noticeTitle').value;
    const noticeDesc = document.getElementById('noticeDesc').value;
    const noticeFile = document.getElementById('noticeFile').files[0];

    if (!noticeTitle || !noticeDesc) {
        alert("Please fill in both the title and description.");
        return;
    }

    // Create a notice object with title, description, and file
    const notice = {
        title: noticeTitle,
        description: noticeDesc,
        file: noticeFile ? noticeFile.name : 'No file attached',
        author: "Admin" // Identify the author as Admin
    };

    // Retrieve existing notices from localStorage or initialize an empty array
    let notices = JSON.parse(localStorage.getItem('notices')) || [];
    notices.push(notice); // Add the new notice to the array

    // Store the updated array of notices in localStorage
    localStorage.setItem('notices', JSON.stringify(notices));

    alert("Notice submitted successfully!");

    // Clear the form after submission
    document.getElementById('noticeTitle').value = '';
    document.getElementById('noticeDesc').value = '';
    document.getElementById('noticeFile').value = '';

    // Refresh the displayed notices
    displayNotices();
});

// Function to display all notices on the dashboard
function displayNotices() {
    const noticesContainer = document.getElementById('notices');
    noticesContainer.innerHTML = ''; // Clear previous displayed notices

    const notices = JSON.parse(localStorage.getItem('notices')) || [];

    // Loop through notices and create elements to display them
    notices.forEach((notice, index) => {
        const noticeElement = document.createElement('div');
        noticeElement.classList.add('notice');
        noticeElement.innerHTML = `
            <h3>${notice.title}</h3>
            <p>${notice.description}</p>
            <p>File: ${notice.file ? notice.file : "No file attached"}</p>
            <p>Posted by: ${notice.author}</p> <!-- Include author -->
            <button class="remove-notice" data-index="${index}">Remove Notice</button> <!-- Remove notice button -->
        `;
        noticesContainer.appendChild(noticeElement); // Append to the notice board
    });

    // Add event listeners to all "Remove Notice" buttons
    document.querySelectorAll('.remove-notice').forEach(button => {
        button.addEventListener('click', (event) => {
            const noticeIndex = event.target.getAttribute('data-index');
            removeNotice(noticeIndex);
        });
    });
}

// Function to remove a notice based on its index
function removeNotice(index) {
    let notices = JSON.parse(localStorage.getItem('notices')) || [];
    notices.splice(index, 1); // Remove the notice at the specified index
    localStorage.setItem('notices', JSON.stringify(notices)); // Update localStorage
    alert("Notice removed successfully!");
    displayNotices(); // Refresh the displayed notices
}
