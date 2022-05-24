fetch("https://www.7timer.info/bin/api.pl?lon=48.4&lat=54.3&product=astro&output=json")
    .then(res => res.json())
    .then(json => console.log(json))

const form = document.getElementById('processFrom')
const url = " https://www.7timer.info/bin/api.pl?lon=48.4&lat=54.3&product=astro&output=json"

form.addEventListener('submit', (e) => {
    e.preventDefault();
    fetch(url, {
        method: 'GET',
        headers: {
            'Accept': '*/*',
            'Accept-Encoding': 'gzip, deflate, br',
            'Connection': 'keep-alive'
        }
    })
        .then((data) => data.json())
        .then((data) => {
            const currentdate = data.init
            renderDate(currentdate)

            data.dataseries.map((_, index) => {
                const time = data.dataseries[index].timepoint
                const temp = data.dataseries[index].temp2m
                renderWeather(time, temp);
            })
        })
})

function renderDate(currentdate) {
    const div = document.createElement('div');
    const year = +currentdate.substring(0, 4);
    const month = +currentdate.substring(4, 6);
    const day = +currentdate.substring(6, 8);
    const hour = +currentdate.substring(8, 10);
    div.innerHTML = `Текущая дата: ${day}.${month}.${year} Время прогноза: ${hour}:00`
    document.getElementById('app').append(div);
}

function renderWeather(time, temp) {
    const div = document.createElement('div');
    div.innerHTML = `время + ${time}ч ко времени прогноза <br \/> температура ${temp}&#8451;`
    document.getElementById('app').append(div);
}

form.addEventListener('reset', (e) => {
    e.preventDefault();
    document.querySelectorAll('#app > *').forEach(d => d.remove());
})