function togglePassword() {
            const pwd = document.getElementById('password');
            pwd.type = (pwd.type === 'password') ? 'text' : 'password';
        }
        function login() {
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;
            const errorMsg = document.getElementById('errorMsg');

       
            const validUsername = "user";
            const validPassword = "1234";

            if(username === validUsername && password === validPassword) {
                alert("Login successful!");
            } else {
                errorMsg.textContent = "Invalid username or password!";
            }
        }