var total = -1;

async function calPrice(){
    console.log('Calculating suggested price and total amount...')

    //access table "usercredentials" to get the logged user's information for "location factor"
  
    const response = await fetch(`http://localhost:3000/getprofile/`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
    });

    const info = await response.json();
    const location = info.rows[0].state;
    let location_factor = 0.04;
    if (location == "TX") location_factor = 0.02;

    //access table "fuelquote" to get the logged user's information for "rate history factor"
    
    const response1 = await fetch(`http://localhost:3000/quote`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
    });
        
    const quote = await response1.json();

    let rate_history_factor = 0;
    if (quote.rows.length > 0) rate_history_factor = 0.01;

    //access html file to get gallon request input from user
    const galreq = document.querySelector("#gallonRequest").value;
    let gallon_request_factor = 0.03;
    if (galreq >= 1000) gallon_request_factor = 0.02;

    //company profit factor
    let company_profit_factor = 0.1;

    
    //calculate total amount due
    let current_price = 1.5;
    let margin = current_price * (location_factor - rate_history_factor + gallon_request_factor + company_profit_factor);
    let suggested_price = (current_price + margin).toFixed(2);
    total = (suggested_price*galreq).toFixed(2);
    console.log("Current Price: ", current_price);
    console.log("Margin: ", margin);
    console.log("+ location factor: ", location_factor);
    console.log("+ rate history factor: ", rate_history_factor);
    console.log("+ gallon request factor: ", gallon_request_factor);
    console.log("+ company profit factor: ", company_profit_factor);
    console.log("Suggested Price: ", suggested_price)
    console.log("Total amount due: ", total);

    //print out suggested price and total amount due to html file
    document.getElementById("print-price").innerHTML = '$' + suggested_price;
    document.getElementById("printtotal").innerHTML = '$' + total;
}


async function gallonCal(){
    const galreq = document.querySelector("#gallonRequest").value;
    var datereq = document.querySelector("#dateRequest").value;
    if (total < 0) {
        console.log ("Please click `CALCULATE` to get total");
        document.getElementById("fuelquote").innerHTML = '<i>Please click `CALCULATE` to get your total due!</i>';
    }
    else {
        console.log("Submit a fuel quote form on: ",datereq);
        document.getElementById("fuelquote").innerHTML = '<i> Your fuel quote form is submitted successfully! </i>';
        try{
            const response = await fetch(`http://localhost:3000/quote/${galreq}/${datereq}/${total}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify()
            });
            
        }catch(err){
            console.log(err.message);
        }
    }
    
}


window.onload = async function fuelQuoteHist() {
    try{
        //print fuel quote history
        const response1 = await fetch(`http://localhost:3000/quote`, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
        });
        
        const quote = await response1.json();
        console.log(quote.rows.length);
        if (quote.rows.length > 0){            
            var btn = document.getElementById("hist");
            btn.innerHTML = "";
            for (var i = 0; i < quote.rows.length; i++){
                var rate = (quote.rows[i].total/quote.rows[i].galreqs).toFixed(2);
                btn.innerHTML += "Date: " + quote.rows[i].deldate + "  <br> <span style='font-size: 80%'> Address: " + quote.rows[i].deladdr + "</span> <br><div style='border-style: double;'> <h3>" 
                + "Rate: " + rate + "<br> Gallon(s) requested: " + quote.rows[i].galreqs + "<br> Total: $" + quote.rows[i].total + "</h3></div><br>";
            }
        }
        console.log(quote);
        
    } catch(err){
        console.log(err.message);
    }
}
