
function weather(){
    const key = "72340f84ec4773c804e96befe3f91afc"
    let cityIn = document.getElementById("input").value

    const list = document.querySelectorAll(".listSection .cities .city")
    const listCitiesArray = Array.from(list)

    filteredArray = []
    if(listCitiesArray.length>0){
            filteredArray = listCitiesArray.filter(el =>{
            let content = ""
            if(cityIn.includes(",")){
                if(cityIn.split(",")[1].length >2){
                    cityIn = cityIn.split(",")[0]
                    content = el.querySelector(".city-name span").textContent.toLowerCase()
                }else{
                    content = el.querySelector(".city-name span").textContent.toLowerCase()
                }
            return content == cityIn.toLowerCase()
        }else{
            content = el.querySelector(".city-name span").textContent.toLowerCase()
        }
        return content == cityIn.toLowerCase()
    })
    if (filteredArray.length > 0) {
        document.getElementById("error").innerText = `You already know the weather for ${
          filteredArray[0].querySelector(".city-name span").textContent
        } try being more specific`
        form.reset()
        form.focus()
      }
    }
    var call = "https://api.openweathermap.org/data/2.5/weather?q=" + cityIn + "&appid=" + key + "&units=metric"

    let request = new XMLHttpRequest()
    request.open("GET", call)
    request.send()
    request.onload = () => {
        if (request.status === 200) {
            document.getElementById("error").innerText = ""
            obj = JSON.parse(request.responseText)

            cityName = obj.name
            country = obj.sys.country
            temp = obj.main.temp
            description = obj.weather[0].description
            getIcon = obj.weather[0].icon
            const icon = "http://openweathermap.org/img/w/"+getIcon+".png"

            const li = document.createElement("li")
            li.classList.add("city")

            const markup = `<div class = "city-name">
                    <h2 class></h2>
                    <span>${cityName}</span>
                    <sup>${country}</sup></h2>
                    </div>
                    <div class="city-temp">${parseInt(temp)}<sup>°C</sup></div>
                    <figure>
                    <img class = "city-icon" src=${icon}>            
                    <figcaption>${description}</figcaption>
                    </figure>`

            li.innerHTML = markup
            document.getElementById("list").appendChild(li)

        } else {
            document.getElementById("error").innerText = "Please enter a valid city"
        }
    }
    document.getElementById("in").reset()
    document.getElementById("input").focus()
}