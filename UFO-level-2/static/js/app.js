// from data.js
var tableData = data;

// add filters to the "Filter Search"
let addFilters = (setSelect,attribute) => {
    Object.entries(attribute).forEach(([key,value]) => {
        setSelect.attr(key,attribute[key]);
    });
}
let filters = d3.select("#filters");
let labels = ["city","state","country","shape"];
let attributes = labels.map( label => {
    return {"class":"form-control","id":label,"type":"text","placeholder":""};
});
for(let i = 0;i<labels.length;i++){
    let li = filters.append("li");
    li.attr("class", "filter list-group-item");
    let label = li.append('label');
    label.attr("for",labels[i]);
    label.text(labels[i]);
    let field = li.append('input');
    addFilters(field,attributes[i]);
}
// Same as UFO 1 but allowing for added filters
let tbody = d3.select("tbody");
let getEvents = (date,filter) => {
    let event1 = new Date(date);
    let events = []
    data.forEach((record) => {
        let event2 = new Date(record.datetime);
        if (((event2.getTime() === event1.getTime()) || (date === ""))
        && ((filter[0] === record.city) || (filter[0] === ""))
        && ((filter[1] === record.state) || (filter[1] === ""))
        && ((filter[2] === record.country) || (filter[2] === ""))
        && ((filter[3] === record.shape) || (filter[3] === ""))){
            events.push(record);
        }
    });
    return events;
}
let updateTable = events => {
    tbody.html("");
    if (events.length < 1) return;
    events.forEach((event) => {
        let row = tbody.append("tr");
        Object.values(event).forEach(value => {
            let cell = row.append("td");
            cell.text(value);
        });
    });
}
let button = d3.select("#filter-btn");
let search = () => {
    d3.event.preventDefault();
    let filter = labels.map(label =>{
        return d3.select(`#${label}`).property("value").toLowerCase();
    });
    let eventday = d3.select("#datetime").property("value");
    updateTable(getEvents(eventday,filter));
}
button.on("click", search);
d3.select("form").on("submit", search);