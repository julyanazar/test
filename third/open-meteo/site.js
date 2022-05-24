fetch("https://api.open-meteo.com/v1/forecast?latitude=55.7558&longitude=37.6176&hourly=temperature_2m&current_weather=true")
    .then(res => res.json())
    .then(json => console.log(json))

const form = document.getElementById('processFrom')

form.addEventListener('submit', (e) => {
    e.preventDefault();
    fetch('https://api.open-meteo.com/v1/forecast?latitude=55.7558&longitude=37.6176&hourly=temperature_2m&current_weather=true')
        .then((data) => data.json())
        .then((data) => {
            data.hourly.time.map((_, index) => {
                const date=data.hourly.time[index]
                const temp=data.hourly.temperature_2m[index]
            renderTemps(date, temp);
            })

            const currentdate = data.current_weather.time
            const currenttemp = data.current_weather.temperature
            //renderTemps(currentdate, currenttemp)
        })
})

form.addEventListener('reset', (e) => {
    e.preventDefault();
    document.querySelectorAll('#app > *').forEach(d=> d.remove());
})

function renderTemps(time, temp) {
    const div = document.createElement('div');
    var date = new Date(time).toDateString()
    var hours = new Date(time).getHours()
    var minutes = new Date(time).getMinutes()
    div.innerHTML = `дата ${date} время ${hours}:${minutes} температура ${temp}`
    document.getElementById('app').append(div);
}