document.addEventListener("DOMContentLoaded", function () {
    const username = localStorage.getItem("username");
    const loginTime = localStorage.getItem("loginTime");
    const role = localStorage.getItem("role");

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
        document.getElementById("birthdayMessage").innerText = "Happy Birthday!";
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
            if (role === "admin") {
                window.location.href = "BusSchedule.html";
            } else {
                alert("Access Denied! Only admins can update the bus schedule.");
            }
        });
    }

    // Load Notices for All Users
    loadNotices();

    // Admin-Only: Add Notice
    if (role === "admin") {
        setupNoticeAdding();
    }
});

// Function to Load Notices from localStorage
function loadNotices() {
    const noticesContainer = document.getElementById("notices");
    if (!noticesContainer) return;
    noticesContainer.innerHTML = ""; // Clear existing notices

    const notices = JSON.parse(localStorage.getItem("notices")) || [];
    notices.forEach((notice) => {
        const noticeElement = document.createElement("div");
        noticeElement.classList.add("notice");
        noticeElement.innerHTML = `
            <h3>${notice.title}</h3>
            <p>${notice.description} ${notice.file ? `<a href="#">(${notice.file})</a>` : ""}</p>
            <p class="author">${notice.author}</p>
        `;
        noticesContainer.appendChild(noticeElement);
    });
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
            fileName = fileInput.files[0].name;
        }

        if (title && description) {
            // Create Notice Object
            const newNotice = { title, description, file: fileName, author: "Admin" };

            // Save to localStorage
            const notices = JSON.parse(localStorage.getItem("notices")) || [];
            notices.push(newNotice);
            localStorage.setItem("notices", JSON.stringify(notices));

            // Refresh Notices
            loadNotices();

            alert("Notice added successfully!");
            document.getElementById("noticeTitle").value = "";
            document.getElementById("noticeDesc").value = "";
            fileInput.value = "";
            noticeForm.classList.add("hidden");
        } else {
            alert("Please fill in all required fields.");
        }
    });
}
