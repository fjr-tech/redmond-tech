function togglePassword() {
    const pwd = document.getElementById('password');
    pwd.type = (pwd.type === 'password') ? 'text' : 'password';
}

function login2() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const errorMsg = document.getElementById('errorMsg');



    
}

async function logincheck(){
    // Get username and password
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    // Semds Login to backend
    const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },


        body: JSON.stringify({username: username, password: password})
    });
    //wait for response
    const data = await response.json();
    console.log(data);
}
