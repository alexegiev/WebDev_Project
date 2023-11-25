
window.onload = main;
function main()
{

    let username = document.getElementById("username")
    let password = document.getElementById("psw")
    let password_2 = document.getElementById("psw_check")
    let name = document.getElementById("name")
    let surname = document.getElementById("surname")
    let email = document.getElementById("email")
    let address = document.getElementById("address")
    let phone_num = document.getElementById("txt_phone_number")
    let home_num = document.getElementById("txt_home_number")
    // regular expressions used for validation of input
    var name_ok = /^[a-zA-Z]{3,20}$/
    var user_ok = /^(?=.*\d)(?=.*[a-z]).{6,15}$/
    var psw_ok = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,15}$/
    var email_ok = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    //var address_ok = /^([a-zA-Z]{3,10} +(\w)? + [0-9]{1,3}).{5,30}$/
    var phone_ok = /^(?=.[0-9]).{10,15}$/
    
    var letter = document.getElementById("letter");
    var number = document.getElementById("number");
    var length = document.getElementById("length");
    //for password
    var letter_psw = document.getElementById("letter_psw");
    var capital_psw = document.getElementById("capital_psw");
    var number_psw = document.getElementById("number_psw");
    var length_psw = document.getElementById("length_psw");


    // login form validation
    username.addEventListener('change', function(evt){
        if(username.value.match(user_ok)) 
        { 
            evt.target.setCustomValidity('')
        }
        else
        { 
            evt.target.setCustomValidity('Εισάγεται έγκυρο username')
        }
    })   

    username.onfocus = function() 
    {
        document.getElementById("username_requierments").style.display = "block";
    }
    username.onblur = function()
    {
        document.getElementById("username_requierments").style.display = "none";
    }

    username.onkeyup = function() 
    {
        // Validate lowercase letters
        var lowerCaseLetters = /[a-z]/g;
        if(username.value.match(lowerCaseLetters)) 
        {
            letter.classList.remove("invalid");
            letter.classList.add("valid");
        } else 
        {
            letter.classList.remove("valid");
            letter.classList.add("invalid");
        }
      
        // Validate numbers
        var numbers = /[0-9]/g;
        if(username.value.match(numbers)) 
        {
            number.classList.remove("invalid");
            number.classList.add("valid");
        } else 
        {
            number.classList.remove("valid");
            number.classList.add("invalid");
        }
      
        // Validate length
        if(username.value.length >= 6) 
        {
            length.classList.remove("invalid");
            length.classList.add("valid");
        } else 
        {
            length.classList.remove("valid");
            length.classList.add("invalid");
        }
    }

    password.addEventListener('change', function(evt){
        if(password.value.match(psw_ok)) 
        { 
            evt.target.setCustomValidity('')
        }
        else
        { 
            evt.target.setCustomValidity('Εισάγεται έγκυρο password')
        }
    }) 
    
    password_2.addEventListener('change', function(evt){
        if(password_2.value.match(psw_ok) && password_2.value === password.value) 
        { 
            evt.target.setCustomValidity('')
        }
        else
        { 
            evt.target.setCustomValidity('Εισάγεται έγκυρο password')
        }
    })   

    password.onfocus = function() 
    {
        document.getElementById("psw_requierments").style.display = "block";
    }
    password.onblur = function()
    {
        document.getElementById("psw_requierments").style.display = "none";
    }

    password.onkeyup = function() 
    {
        // Validate lowercase letters
        var lowerCaseLetters_psw = /[a-z]/g;
        if(password.value.match(lowerCaseLetters_psw)) 
        {
            letter_psw.classList.remove("invalid");
            letter_psw.classList.add("valid");
        } else 
        {
            letter_psw.classList.remove("valid");
            letter_psw.classList.add("invalid");
        }
      
        // Validate capital letters
        var upperCaseLetters_psw = /[A-Z]/g;
        if(password.value.match(upperCaseLetters_psw)) 
        {

            capital_psw.classList.remove("invalid");
            capital_psw.classList.add("valid");
        } else 
        {
            capital_psw.classList.remove("valid");
            capital_psw.classList.add("invalid");
        }
      
        // Validate numbers
        var numbers_psw = /[0-9]/g;
        if(password.value.match(numbers_psw)) 
        {
            number_psw.classList.remove("invalid");
            number_psw.classList.add("valid");
        } else 
        {
            number_psw.classList.remove("valid");
            number_psw.classList.add("invalid");
        }
      
        // Validate length
        if(password.value.length >= 8) 
        {
            length_psw.classList.remove("invalid");
            length_psw.classList.add("valid");
        } else 
        {
            length_psw.classList.remove("valid");
            length_psw.classList.add("invalid");
        }
    }


    // personal info form validation
    name.addEventListener('change', function(evt){
        if(name.value.match(name_ok)) 
        { 
            evt.target.setCustomValidity('')
        }
        else
        { 
            evt.target.setCustomValidity('Εισάγεται έγκυρο όνομα')
        }
    })   
    
    surname.addEventListener('change', function(evt){
        if(surname.value.match(name_ok)) 
        { 
            evt.target.setCustomValidity('')
        }
        else
        { 
            evt.target.setCustomValidity('Εισάγεται έγκυρο επώνυμο')
        }
    })

    email.addEventListener('change', function(evt){
        if(email.value.match(email_ok)) 
        { 
            evt.target.setCustomValidity('')
        }
        else
        { 
            evt.target.setCustomValidity('Εισάγεται έγκυρο email')
        }
    })

    address.addEventListener('change', function(evt){
        if(address.value.match(address_ok)) 
        { 
            evt.target.setCustomValidity('')
        }
        else
        { 
            evt.target.setCustomValidity('Εισάγεται έγκυρη διεύθυνση')
        }
    })

    phone_num.addEventListener('change', function(evt){
        if(phone_num.value.match(phone_ok)) 
        { 
            evt.target.setCustomValidity('')
        }
        else
        { 
            evt.target.setCustomValidity('Εισάγεται έγκυρο αριθμό')
        }
    })

    home_num.addEventListener('change', function(evt){
        if(home_num.value.match(phone_ok)) 
        { 
            evt.target.setCustomValidity('')
        }
        else
        { 
            evt.target.setCustomValidity('Εισάγεται έγκυρο αριθμό')
        }
    })
}
