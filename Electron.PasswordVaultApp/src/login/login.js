function showPassword() {
    let password = document.getElementById("password");

    if (password.type == "password") {
        password.type = "text";
    } else {
        password.type = "password";
    }
}

function establishConnection() {
    let dbConfig = {
        host: 'localhost',
        user: document.getElementById("username").value,
        password: document.getElementById("password").value,
        database: 'personal'
    };

    connectionAPI.databaseConnection(dbConfig);
}