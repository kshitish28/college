document.addEventListener("DOMContentLoaded", function () {
    const username = localStorage.getItem("username");
    const loginTime = localStorage.getItem("loginTime");
    const role = localStorage.getItem("role");

    // Display user information
    if (username) {
        document.getElementById("welcomeUser").innerText = `Welcome, ${username}`;
    }
    if (loginTime) {
        document.getElementById("loginTime").innerText = loginTime;
    }

    // Birthday Message
    const currentDate = new Date();
    const birthday = new Date(currentDate.getFullYear(), 2, 10);
    if (currentDate.toDateString() === birthday.toDateString()) {
        document.getElementById("birthdayMessage").innerText = "🎉 Happy Birthday! 🎂";
    }

    // "More..." link functionality
    document.querySelectorAll(".more").forEach((moreLink) => {
        moreLink.addEventListener("click", () => {
            alert("More details will be available soon.");
        });
    });

    // Bus Schedule Update (Admin-Only)
    const updateBusScheduleButton = document.getElementById("updateBusSchedule");
    if (updateBusScheduleButton) {
        updateBusScheduleButton.addEventListener("click", () => {
            if (role && role.toLowerCase() === "admin") {
                window.location.href = "BusSchedule.html";
            } else {
                alert("🚫 Access Denied! Only admins can update the bus schedule.");
            }
        });
    }

    // Load Notices for All Users (both admin and normal users)
    loadNotices();

    // Admin-Only: Setup Notice Adding Form
    if (role && role.toLowerCase() === "admin") {
        setupNoticeAdding();
    }
});

// Function to Load Notices from localStorage (Shared for Both Admin and User)
function loadNotices() {
    const noticesContainer = document.getElementById("notices"); // Ensure 'notices' div exists in the user's home page
    if (!noticesContainer) return; // If the container isn't found, exit.

    // Clear any existing notices
    noticesContainer.innerHTML = ""; 

    // Fetch notices from localStorage
    const notices = JSON.parse(localStorage.getItem("notices")) || [];

    // Check if there are notices available
    if (notices.length === 0) {
        noticesContainer.innerHTML = "<p>No notices available</p>";
    } else {
        notices.forEach((notice) => {
            const noticeElement = document.createElement("div");
            noticeElement.classList.add("notice");
            noticeElement.innerHTML = `
                <h3>${notice.title}</h3>
                <p>${notice.description}</p>
                ${notice.file ? `<a href="#">${notice.file}</a>` : ""}
                <p class="author">Posted by: ${notice.author}</p>
            `;
            noticesContainer.appendChild(noticeElement);
        });
    }
}

// Function to Set Up "Add Notice" for Admins
function setupNoticeAdding() {
    const addNoticeBtn = document.getElementById("addNoticeBtn");
    const noticeForm = document.getElementById("noticeForm");
    const submitNotice = document.getElementById("submitNotice");

    if (!addNoticeBtn || !noticeForm || !submitNotice) return;

    addNoticeBtn.classList.remove("hidden");

    addNoticeBtn.addEventListener("click", () => {
        noticeForm.classList.toggle("hidden");
    });

    // Prevent form submission on Enter key
    noticeForm.addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            event.preventDefault();
        }
    });

    submitNotice.addEventListener("click", () => {
        const title = document.getElementById("noticeTitle").value.trim();
        const description = document.getElementById("noticeDesc").value.trim();
        const fileInput = document.getElementById("noticeFile");
        let fileName = "";

        if (fileInput.files.length > 0) {
            fileName = fileInput.files[0].name; // Get file name if a file is uploaded
        }

        if (title && description) {
            // Create Notice Object
            const newNotice = { title, description, file: fileName, author: username || "Admin" };

            // Retrieve existing notices from localStorage
            const notices = JSON.parse(localStorage.getItem("notices")) || [];
            
            // Add the new notice to the existing notices array
            notices.push(newNotice);

            // Save the updated notices array back to localStorage
            localStorage.setItem("notices", JSON.stringify(notices));

            // Refresh Notices on both Admin and Home Page
            loadNotices();

            alert("Notice added successfully!");

            // Clear form inputs
            document.getElementById("noticeTitle").value = "";
            document.getElementById("noticeDesc").value = "";
            fileInput.value = "";

            // Hide the form after submission
            noticeForm.classList.add("hidden");
        } else {
            alert("Please fill in all required fields.");
        }
    });
}
