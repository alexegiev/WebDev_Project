window.onload = main;

function main()
{
    let name = document.getElementById("name")
    name.onchange = function()
    {
        if(name == "" || /\d/.test(name))
        {
            name.setCustomValidity("Δώστε σωστό όνομα")
            return false
        }
        else
        {
            name.setCustomValidity("")
        }
    }

    let surname = document.getElementById("surname")
    surname.onchange = function()
    {
        if(surname == "" || /\d/.test(surname))
        {
            surname.setCustomValidity("Δώστε σωστό επίθετο")
            return false
        }
        else
        {
            surname.setCustomValidity("")
        }
    }

    let email = document.getElementById("email")
    email.onchange = function()
    {
        let validEmailFormat = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if(!validEmailFormat.test(email))
        {
            email.setCustomValidity("Δώστε σωστό email")
            return false
        }
        else
        {
            email.setCustomValidity("")
        }
    }

    let address = document.getElementById("address")
    address.onchange = function()
    {
        
        if(/\d/(address))
        {
            address.setCustomValidity("Δώστε και τον αριθμό διεύθυνσης")
            return false
        }
        else
        {
            address.setCustomValidity("")
        }
    }
}