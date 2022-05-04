


window.onload = async function printAddress() {
    //print address in fuel quote form
    const response2 = await fetch(`http://localhost:3000/getprofile`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
    });

        
    const userProfile = await response2.json();
    var address = userProfile.rows[0].address1;
    if (userProfile.rows[0].address2 != "NA") address += userProfile.rows[0].address2;
    console.log("User address: ", address);
    var btn = document.getElementById("print-address");
    btn.innerHTML = "Address: " + address;
}