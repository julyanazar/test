const form = document.getElementById('processFrom')


form.addEventListener('submit', (e)=> {
    e.preventDefault();
    const formData = new FormData(form);
    const roomNumber = formData.get('room');
    fetch('https://time.ulstu.ru/api/1.0/timetable?filter=' + roomNumber)
    .then((data) => data.json())
    .then((data) => {
        for (const w of data.response.weeks)
            renderWeek(w);
    })
})

form.addEventListener('reset', (e) => {
    e.preventDefault();
    document.querySelectorAll('#app > *').forEach(d=> d.remove());
})

function renderWeek(w){
    const table = document.createElement('table');
    for (const d of w.days)
        renderDay(d, table);
    document.getElementById('app').append(table);  
}

function renderDay(d, table){
    const row = document.createElement('tr');
    for (const l of d.lessons)
        renderLesson(l, row);
    table.append(row);
}

function renderLesson(l, row){
    const cell = document.createElement('td');
    if (l.length > 0){
        cell.innerHTML = l.map(d => d.group).join(', ');
        cell.style = 'background-color: #2E8B57';
    } else{
        cell.innerHTML = '-';
        cell.style = 'background-color: #FA8072';
    }
    row.append(cell);
}

