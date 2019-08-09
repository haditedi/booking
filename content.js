const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

exports.today = () => {
    let d = new Date();
    return d.getDate()+' '+months[d.getMonth()]+' '+d.getFullYear();
}

exports.fdate = (el) => {
    const d = new Date(el);
    return d.getDate()+' '+months[d.getMonth()]+' '+d.getFullYear();
}

exports.opening="Thank you for your booking at Monarch House Apartments. Here are all your reservation details:"

exports.mybody = `We would be grateful if you would check to ensure the above details are correct. If you have any queries or amendments to your booking, please let us know. 
Full payment will be taken on arrival`;

