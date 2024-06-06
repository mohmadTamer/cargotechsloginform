function displayUserData(){
    const userName = localStorage.getItem('username');
    const useremail = localStorage.getItem('email');
    const phoneNumber = localStorage.getItem('phoneNumber');
    document.querySelector('.user-email').innerHTML+=userName ;
    document.querySelector('.user-number').innerHTML += useremail;
    document.querySelector('.user-phone').innerHTML += phoneNumber;
    }

function destroySession (){
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        localStorage.removeItem('email');
        localStorage.removeItem('phoneNumber');
        window.location.href="/index.html";
    }

    if(localStorage.getItem("token")){
        displayUserData()
    }else{
        window.location.href="/index.html";        
    }