const weatherForm = document.querySelector('form')
const input = document.querySelector('input')
const messageOne = document.querySelector('#messageOne')
const messageTwo = document.querySelector('#messageTwo')



weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const location = input.value

    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''

    fetch('/weather?address=' + location).then((response) => {
        response.json().then((data) => {
            if(data.error){
                messageOne.textContent = data.error
            } else {
                messageOne.textContent = data.title
                messageTwo.textContent = data.currentTemperature + '°C. ' + data.weatherDescription + '. ' + data.chanceToRain + 
                '% chance to rain. Feels like ' + data.feelsLike+ '°C.'
            }
        })
    })
})