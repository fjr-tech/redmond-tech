
function togglePassword() {
    const passwords = document.getElementsByClassName('password');
    for(let i=0 ; i<passwords.length; i++){
        const pwd = passwords[i];
        pwd.type = (pwd.type === 'password') ? 'text' : 'password';
    }
}

document.addEventListener("keydown",function(event){
    if(event.key==="Enter"){
        logincheck();
    }
});

function displayError(message) {
    const errMessageEle = document.getElementById('errorMsg');
    errMessageEle.innerText = message;

    setTimeout(() => {
        errMessageEle.innerText = '';
    }, 2000);

}

async function accountCreationCheck(){
    // Get username and password
    const username = document.getElementById('username').value;
    const password1 = document.getElementById('password1').value;
    const password2 = document.getElementById('password2').value;
    // Check if passwords match
    if(password1 !== password2){
        displayError("Passwords do not match");
        return;

    }
    // Sends account creation to backend
    const response = await fetch('/api/accounts/new', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },

        body: JSON.stringify({username: username, password: password1})
    });
    //wait for response
    const data = await response.json();
    if (response.ok){
        document.location='/';

    }else{
        displayError(data.message);
    }
    console.log(data); 
}