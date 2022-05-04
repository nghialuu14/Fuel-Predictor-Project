
function containsChar(s) {
    for (var i = 0; i < s.length; i++){
        let c = s[i].charCodeAt(0);
        if ((65 <= c && c <= 90) || (97 <= c && c <= 122))
            return true;
    }
    return false;
}

function containsSpecialChars(str) {
    const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
    return specialChars.test(str);
}
function containsSpecialCharsNumbers(str) {
    const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~1234567890]/;
    return specialChars.test(str);
}
function containsSpace(s){
    for (var i = 0; i < s.length; i++)
        if (s[i] == ' ') return true;
    return false;
}

async function UserNameExist(callback, user) {
    callback();
        try{
            const response = await fetch(`http://localhost:3000/login/${user}`, {
                method: "GET",
                headers: { "Content-Type": "application/json" },
            });

        } catch(err){
            
        }
        
}

async function checkValidsUserPwd(callback, username, password, confirm){
    callback();
    try{
        /*const username = document.querySelector("#user").value;
        const password = document.querySelector("#pw").value;
        const confirm = document.querySelector("#confPw").value;*/
        if (username == "" || password == "" || confirm == ""){
        }
        else{
            
                try{
                    const response = await fetch(`http://localhost:3000/register/${username}/${password}/${confirm}`, {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify()
                    });
                
                } catch(err){
                    
                }
        }
    }catch(err){
        
    }
}

async function checkZip(callback){
    callback();
    /*const fullName = document.querySelector("#fullname").value;
    const address1 = document.querySelector("#address1").value;
    var address2 = document.querySelector("#address2").value;
    const city = document.querySelector("#city").value;
    const state = document.querySelector("#state").value;
    const zipcode = document.querySelector("#zipcode").value;*/
    
    try{
        const response = await fetch(`http://localhost:3000/profile/${fullName}/${address1}/${address2}/${city}/${state}/${zipcode}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify()
        });
        
    } catch(err){
        
    }
    
}

async function pwRetrieve(callback){
    callback();
    /*const user = document.querySelector("#retrieve-user").value;
    const full = document.querySelector("#retrieve-fullname").value;
    const zip = document.querySelector("#retrieve-zipcode").value;
    const password = document.querySelector("#retrieve-password").value;*/
    
    //checking if user enter valid information
    try{
        const response = await fetch(`http://localhost:3000/getprofile/${user}/${full}/${zip}`, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
        });

        const response2 = await fetch(`http://localhost:3000/getprofile/${user}/${password}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
        });
    }catch(err){

    }
}

module.exports = {containsChar, containsSpecialChars, containsSpecialCharsNumbers, containsSpace, UserNameExist, checkValidsUserPwd, checkZip, pwRetrieve}