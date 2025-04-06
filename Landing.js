document.getElementById('loginForm').addEventListener('submit', function (event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    const users = {
        admin: { username: 'admin', password: 'password123', role: 'admin' },
        user: { username: 'user', password: 'user123', role: 'user' }
    };

    if ((username === users.admin.username && password === users.admin.password) ||
        (username === users.user.username && password === users.user.password)) {

        localStorage.setItem('username', username);
        localStorage.setItem('role', (username === 'admin') ? 'admin' : 'user');

        const currentDate = new Date();
        localStorage.setItem('loginTime', currentDate.toLocaleString('en-GB', {
            day: 'numeric', month: 'long', year: 'numeric',
            hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: true
        }));

        if (username === 'admin') {
            window.location.href = 'adminDashboard.html';
        } else {
            window.location.href = 'Home.html';
        }
    } else {
        alert('Incorrect username or password. Please try again.');
    }
});
