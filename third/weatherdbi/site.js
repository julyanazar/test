fetch("https://weatherdbi.herokuapp.com/data/weather/london")
    .then(res => res.json())
    .then(json => console.log(json))

const form = document.getElementById('processFrom')

form.addEventListener('submit', (e) => {
    e.preventDefault();
    fetch('https://weatherdbi.herokuapp.com/data/weather/london')
        .then((data) => data.json())
        .then((data) => {
            const day = data.next_days[0].day
            const max_temp = data.next_days[0].max_temp.c
            const min_temp = data.next_days[0].min_temp.c
            renderSunday(day, max_temp, min_temp);

            const comment = data.currentConditions.comment
            const dayhour = data.currentConditions.dayhour
            const humidity = data.currentConditions.humidity
            const precip = data.currentConditions.precip
            const temp = data.currentConditions.temp.c
            currentConditions(comment, dayhour, humidity, precip, temp);

        })
})

form.addEventListener('reset', (e) => {
    e.preventDefault();
    document.querySelectorAll('#app > *').forEach(d=> d.remove());
})

function renderSunday(day, max_temp, min_temp) {
    const div = document.createElement('div');
    div.innerHTML = `Day ${day} <br \/> Максимальная температура ${max_temp} <br \/> Минимальная температура ${min_temp}`
    document.getElementById('app').append(div);
}

function currentConditions(comment, dayhour, humidity, precip, temp) {
    const div = document.createElement('div');
    div.innerHTML = `Описание ${comment} <br \/> День и время ${dayhour} <br \/> Влажность ${humidity} <br \/> Осадки ${precip} <br \/> Температура ${temp}`
    document.getElementById('app').append(div);
}