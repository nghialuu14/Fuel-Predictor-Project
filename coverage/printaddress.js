


async function printAddress(callback) {
    callback();
    //print address in fuel quote form
    try{
        const response2 = await fetch(`http://localhost:3000/getprofile`, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
        });

        
    }catch (err){

    }
}

module.exports = printAddress