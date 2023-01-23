function createCalendar(elem, year, month) {
	
	//Create table element
	let table;
	let head = "<tr><th>ПН</th><th>ВТ</th><th>СР</th><th>ЧТ</th><th>ПТ</th><th>СБ</th><th>ВС</th></tr>";

	//Get all dates of this month in array
	let allDates = getMonthDates(year, month);

	//Create an array for <tr><td></td></tr>
	let datesIns = ["<tr>"];

	//Fill the array
	for (let i = 0; i < allDates.length; i++) {
		if(i % 7 === 0) {
			datesIns.push("</tr>")
			if(allDates[i + 1]) {
				datesIns.push("<tr>")
			}
		}
		datesIns.push(`<td>${allDates[i]}</td>`);
	}

	//Fill the table
	table = `<table>${head}${datesIns.join('')}</table>`;
	elem.innerHTML = table;
}
//Creates an array with dates and empty dates. Divisible by 7.
function getMonthDates(year, monthNumber) {

	let dates = [];

	let firstOfMonth = new Date(year, monthNumber-1, 1);
	let lastOfMonth = new Date(year, monthNumber, 0);

	//Get day of the week start from
	let startFrom = firstOfMonth.getDay();

	//If first day of the month is Sunday. 0 => 7
	if (startFrom === 0) {
		startFrom = 7;
	}
	let endWith = lastOfMonth.getDate();

	//Create empty array. Max length possible (6 weeks or 42 days)
	for (let i = 0; i < 42; i++) {
		dates[i] = "";
	}

	//Fill array with dates from the start day
	let day = 1;
	for (let j = startFrom - 1; j < dates.length; j++) {
		dates[j] = day;
		if (day === endWith) {
			break;
		}
		day++;
	}

	//If last week is empty
	if (dates[35] === "") {
		return dates.slice(0, 35);
	}

	return dates;
}

//TESTS
let container = document.getElementById('container');
createCalendar(container, 2023, 2); 


