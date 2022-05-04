

window.onload = async function printProfile(){
    console.log('Getting last user information...')
    try{
        const response = await fetch(`http://localhost:3000/getprofile/`, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
        });

    const info = await response.json();
    console.log(info);
    var btn = document.getElementById("hello-user");
    btn.innerHTML = info.rows[0].username;

    btn = document.getElementById("full-name");
    btn.innerHTML = info.rows[0].fullname;

    btn = document.getElementById("address-1");
    btn.innerHTML = info.rows[0].address1;

    btn = document.getElementById("address-2");
    btn.innerHTML = info.rows[0].address2;

    btn = document.getElementById("print-city");
    btn.innerHTML = info.rows[0].city;

    btn = document.getElementById("print-state");
    btn.innerHTML = info.rows[0].state;

    btn = document.getElementById("print-zipcode");
    btn.innerHTML = info.rows[0].zipcode;
    } catch(err){
        console.log(err.message);
    }
    
}