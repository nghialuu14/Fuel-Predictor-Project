
async function printProfile(callback){
    callback();
    try{
        const response = await fetch(`http://localhost:3000/getprofile/`, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
        });

    } catch(err){
        
    }
    
}

module.exports = printProfile