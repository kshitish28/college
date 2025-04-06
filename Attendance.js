document.addEventListener("DOMContentLoaded", function () {
    function updateTime() {
        document.getElementById("update-time").textContent = formattedTime;
    }
    setInterval(updateTime, 1000);
    updateTime();
});
