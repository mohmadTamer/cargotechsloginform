const formElements = document.querySelector('.loginform'); // get form data
const loginBtn = document.querySelector(".lgn-button"); // login button to change to loading 
const alertbox = document.querySelector(".error-msg"); // alert box to put errors

if(localStorage.getItem('token'))
    {
        window.location.href="/home.html";
    }
// login form submition
formElements.addEventListener('submit', e => {
    e.preventDefault();
    loginBtn.innerHTML = "<button class='button is-success is-fullwidth is-loading'>Loading</button>"
    sendPostRequest();
})

//store user data on local storage
function saveUserData(data){
    localStorage.setItem('token', data.token)
    localStorage.setItem('username', data.user.user_name)
    localStorage.setItem('email', data.user.user_email)
    localStorage.setItem('phoneNumber', data.user.user_phone)
}


// check user data validation on the server
function validateUserInput(data){
    setTimeout(()=>{
        if(!data.code){
            saveUserData(data);
            window.location.href="/home.html";
        }else if(data.code === 422){
            let passwordError = 'Password '+ data.errors.json.password[0];
            createToastTag(passwordError);
        }else {
            let errorMsg = 'Invalid Email or Password';
            createToastTag(errorMsg);
        }
        loginBtn.innerHTML = "<button class='button is-success is-fullwidth'>Login</button>";
    },5000)
}

// send post requset to server using api url 
function sendPostRequest (){
    const formData = new FormData(formElements);
    const userData = Object.fromEntries(formData);
    
    fetch('https://2cdhd3vem9.execute-api.us-east-2.amazonaws.com/dev/auth/login',{
        method:'POST',
        headers:{
            'Content-Type' : 'application/json'
        },
        body: JSON.stringify(userData)
    }).then(res => res.json())
    .then(data =>{
        validateUserInput(data)
    })
    .catch(errors => console.log(errors))
}

// error msg function
function createToastTag(errorMsg){
    let toast = document.createElement('div');
    toast.classList.add('notification');
    toast.classList.add('is-light');
    toast.classList.add('toast');
    toast.innerHTML ='<i class="fa-solid fa-circle-xmark"> </i>'+errorMsg;
    alertbox.appendChild(toast);
    setTimeout(()=>{
        toast.remove();
    },5000)
}


