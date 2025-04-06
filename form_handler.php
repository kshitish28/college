<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Student Desk</title>
    <link rel="stylesheet" href="StudentDesk.css">
</head>

<body>
    <header>
        <div class="top-bar">
            <div class="logo">Student Desk</div>
            <div class="top-right">
                <a href="#">Module</a>
                <a href="Landing.html">Log Out</a>
            </div>
        </div>
        <div class="user-bar">
            <div class="profile">
                <img src="/Images/profile.png" alt="Profile">
            </div>
            <div class="user-info">
                <p>Welcome <strong>User</strong></p>
                <p>Logged in as <span class="highlight">Student</span></p>
                <p id="date-time"></p>
            </div>
        </div>
        <marquee class="marquee">2018 & 2019 Graduating Batch can <span class="red-text">Download</span></marquee>
        <nav class="nav-links">
            <a href="#">Placement Registration Process</a>
            <a href="#">Download Resume Formats</a>
        </nav>
    </header>

    <div class="container">
        <aside class="sidebar">
            <button>View Information</button>
            <button>View Attendance</button>
            <button>View Internal Marks</button>
            <button>View Dues</button>
            <button>View Clearance Details</button>
            <button>Regular Registration</button>
            <button>Back Paper Registration</button>
            <button>Remedial Registration</button>
            <button>Special Exam Registration</button>
            <button>Rechecking With Photocopy</button>
            <button>View Timetable</button>
            <button>View Syllabus</button>
            <button>Request For Update</button>
            <button>Download Class Materials</button>
            <button>Previous Year Question</button>
        </aside>

        <main class="content">
            <table class="info-table">
                <tr>
                    <th colspan="5" class="title-row">Student Details</th>
                </tr>
                <tr>
                    <th colspan="5" class="section-row">Academic Information</th>
                </tr>
                <tr>
                    <th>Name</th>
                    <td>User</td>
                    <td rowspan="6" class="profile-cell">
                        <img src="/Images/profile.png" alt="Profile">
                    </td>
                </tr>
                <tr>
                    <th>Roll Number</th>
                    <td>202326171</td>
                </tr>
                <tr>
                    <th>Registration Number</th>
                    <td>2301423136</td>
                </tr>
                <tr>
                    <th>Batch</th>
                    <td>2023</td>
                </tr>
                <tr>
                    <th>Branch</th>
                    <td>BTech-CSE</td>
                </tr>
                <tr>
                    <th>Blood Group</th>
                    <td>A+</td>
                </tr>

                <tr>
                    <th colspan="5" class="title-row">Admission Details</th>
                </tr>
                <tr>
                    <th>Admission Year</th>
                    <td>2023</td>
                    <th>Admission Type</th>
                    <td>Regular</td>
                </tr>

                <tr>
                    
                </tr>
                <tr>
                    <th>Admission Number</th>
                    <td>230310597762</td>
                </tr>
            </table>
        </main>
    </div>

    <script>
        function updateTime() {
            const now = new Date();
            document.getElementById("date-time").innerText = now.toLocaleString();
        }
        setInterval(updateTime, 1000);
        updateTime();
    </script>

</body>

</html>