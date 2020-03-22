// from data.js
var tableData = data;

let tbody = d3.select("tbody");
let getEvents = date => {
    let event1 = new Date(date);
    let events = []
    data.forEach(record => {
        let event2 = new Date(record.datetime);
        if ((event2.getTime() === event1.getTime()) || (date === "")) {
            events.push(record);
        }
    });
    return events;
}
let updateTable = events => {
    tbody.html("");
    if (events.length < 1) return;
    events.forEach(event => {
        let row = tbody.append("tr");
        Object.entries(event).forEach(([key, value]) => {
            let cell = row.append("td");
            cell.text(value);
        });
    });
}
let button = d3.select("#filter-btn");
let inputSearch = () => {
    d3.event.preventDefault();
    let eventday = d3.select("#datetime").property("value");
    let events = getEvents(eventday);
    updateTable(events);
}
d3.select(window).on("load", inputSearch);
button.on("click", inputSearch);
d3.select("form").on("submit", inputSearch);