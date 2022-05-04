
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

async function UserNameExist(user) {
        try{
            const response = await fetch(`http://localhost:3000/login/${user}`, {
                method: "GET",
                headers: { "Content-Type": "application/json" },
            });

            const checkUser = await response.json();
            console.log(checkUser.rows.length);
            if (checkUser.rows.length == 0){
                return false;
            }
            else{
                return true;
            }
        } catch(err){
            console.log(err.message);
        }
        
}

async function checkValidsUserPwd(){
    console.log("Checking valid username and password...");
    const username = document.querySelector("#user").value;
    const password = document.querySelector("#pw").value;
    const confirm = document.querySelector("#confPw").value;
    if (username == "" || password == "" || confirm == ""){
        var btn = document.getElementById("notif");
        btn.innerHTML = "<b> Please fill all the required fields</b>";
    }
    else{
        var ascii = password[0].charCodeAt(0);
        let validUser = (containsSpace(username) == false) && (!containsSpecialChars(username));
        let validPwd = (password.length >= 5) && (65 <= ascii && ascii <= 90) && (containsSpace(password) == false) && (containsSpecialCharsNumbers(password));

        if (validUser == false){
            alert("Invalid Username!");
            event.preventDefault();
        }
        else if (await UserNameExist(username) == true){
            alert("Username is taken! Please try a different username!");
            event.preventDefault();
        }
        else if (validPwd == false){
            if (password.length < 5){
                alert("Invalid Password! Must have at least 5 characters");
                event.preventDefault();
            }
            else if (65 > ascii || ascii > 90){
                alert("Invalid Password! Must be capitalized");
                event.preventDefault();
            }
            else if (containsSpace(password)){
                alert("Invalid Password! Must have no space");
                event.preventDefault();
            }
            else if (containsSpecialCharsNumbers(password) == false){
                alert("Invalid Password! Must have at least 1 special character or number");
                event.preventDefault();
            }console.log('testing line');
        }
        else if (password != confirm){
            alert("Password does not match!");
            event.preventDefault();
        }
        else{ ///valid, call server
            try{
                const response = await fetch(`http://localhost:3000/register/${username}/${password}/${confirm}`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify()
                });
            window.location.href = "afterreg.html";
            } catch(err){
                console.log(err.message);
            }
        }
    }
    
}

async function checkZip(){
    const fullName = document.querySelector("#fullname").value;
    const address1 = document.querySelector("#address1").value;
    var address2 = document.querySelector("#address2").value;
    const city = document.querySelector("#city").value;
    const state = document.querySelector("#state").value;
    const zipcode = document.querySelector("#zipcode").value;
    
    if (containsChar(zipcode) || containsSpace(zipcode) || containsSpecialChars(zipcode) || zipcode.length < 5){
        alert("Please enter a valid Zip Code!");
        var btn = document.getElementById("updatesuccess");
        btn.innerHTML = "";
        event.preventDefault();
    }
    else{
        if (address2 == "") address2 = "NA";
        if (fullName == "" || state == "" || address1 == "" || city == "" || zipcode == ""){
            var btn = document.getElementById("updatesuccess");
            btn.innerHTML = "<b> Please fill all the required fields</b>";
        }
        else{
            try{
                const response = await fetch(`http://localhost:3000/profile/${fullName}/${address1}/${address2}/${city}/${state}/${zipcode}`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify()
                });
                var btn = document.getElementById("updatesuccess");
                btn.innerHTML = "<b>Update successfully!</b>";
                
            } catch(err){
                console.log(err.message);
            }
        }
    }
    
}

async function pwRetrieve(){
    const user = document.querySelector("#retrieve-user").value;
    const full = document.querySelector("#retrieve-fullname").value;
    const zip = document.querySelector("#retrieve-zipcode").value;
    const password = document.querySelector("#retrieve-password").value;
    
    //checking if user enter valid information
    const response = await fetch(`http://localhost:3000/getprofile/${user}/${full}/${zip}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
    });

    const userinfo = await response.json();

    //if invalid
    if (userinfo.rows.length == 0){
        console.log("Invalid User Information!");
        var btn = document.getElementById("pwretrieve");
        btn.innerHTML = "<br> <b>No user information found. Try again!</b>";
    }
    //if valid
    else{
        //checking validation of new password
        var ascii = password[0].charCodeAt(0);
        let validPwd = (password.length >= 5) && (65 <= ascii && ascii <= 90) && (containsSpace(password) == false) && (containsSpecialCharsNumbers(password));
        if (validPwd == false){
            if (password.length < 5){
                alert("Invalid Password! Must have at least 5 characters");
                event.preventDefault();
            }
            else if (65 > ascii || ascii > 90){
                alert("Invalid Password! Must be capitalized");
                event.preventDefault();
            }
            else if (containsSpace(password)){
                alert("Invalid Password! Must have no space");
                event.preventDefault();
            }
            else if (containsSpecialCharsNumbers(password) == false){
                alert("Invalid Password! Must have at least 1 special character or number");
                event.preventDefault();
            }console.log('testing line');
        }

        //if new password is valid, update
        const response2 = await fetch(`http://localhost:3000/getprofile/${user}/${password}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
        });
        console.log("Password updated!");
        var btn = document.getElementById("pwretrieve");
        btn.innerHTML = "<br> <b>Password updated sucessfully!</b>";
        const userinfo2 = await response2.json();
    }
}
