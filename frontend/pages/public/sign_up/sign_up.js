
function toggleSensitiveDataDisplay() {
    const sensitiveData = [
        ...document.getElementsByClassName('password'), // spread operator expands arrays
        document.getElementById('accountCreationKey')
    ];
    
    for(let i=0 ; i<sensitiveData.length; i++){
        const pwd = sensitiveData[i];
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
    const accountCreationKey = document.getElementById('accountCreationKey').value;

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

        body: JSON.stringify({username: username, password: password1, accountCreationKey: accountCreationKey})
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