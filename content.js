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

exports.policy = `We would be grateful if you would check to ensure the above details are correct. If you have any queries or amendments to your booking, please let us know. Full payment will be taken on arrival unless other arrangement has been made.

Terms and Conditions
For cancellation, a maximum charge of 14 days will apply.
14 days’ notice of cancellation is required prior to check-in for all lengths of stay in order to avoid charges. Notice given within 14 days will result in a charge equal to 14 nights minus the number of days’ notice given. This also applies to in-house guests should a stay requires to be shortened. 
Option to extend is subject to availability.
Please note the policy above increases to 28 days notice required for bookings falling (even partially or less) in July and August months.
 
Please note that check-in time is from 14:00 (except 3 bedroom apartments from 15:00) and check-out is by 11:00. If you arrive early, our Concierge will be happy to store your luggage until the flat becomes available. You can collect your flat keys at Reception desk which is manned 24/7.
For departure after the official check-out time but before 17:00, a half day rate charge applies, for departure after 17:00 onwards, one full day rate applies. This is subject to availability and should be requested with sufficient notice. 
Monarch House is a non-smoking property and pet is not allowed.
 
A complimentary daily maid service is provided from Monday to Friday (excluding public holidays), linen is changed twice a week.
 

Yours Sincerely
 
Hadi Tedi

`;

exports.footer = `
241 Kensington High Street London W8 6EL
Tel +44 (0)20 7890 8800   Fax +44 (0)20 7890 8801Email: sales@monarchhouse.co.uk  Web: www.monarchhouse.co.uk 
`;