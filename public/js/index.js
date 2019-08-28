let arrDate= new Date();
let currentDate = arrDate.toISOString().slice(0,10);

function myfunc() {
document.getElementById("arrival").min=currentDate;
}

function validate() {
    if ($("#numAdults").val() === "" && $("#occ").val() === "") {
        let select = document.getElementById("numAdults");
        select.style.backgroundColor = "yellow";
        select.fontWeight = "bold";
        select.placeholder = "please enter a number";
        return false;
    }
    
}