let day = document.querySelector(".day"),
   city = document.querySelector(".city"),
   search = document.querySelector("#search"),
   date = document.querySelector(".date"),
   time = document.querySelector(".time")

function fetchData(URL, callback) {
   fetch(URL)
      .then(response => response.json())
      .then(data => callback(data))
}

function renderData(data) {

   city.textContent = data.region
   date.textContent = data.date

   time.textContent = "00:00:00"

   setInterval(() => {
      let timeNow = new Date()

      time.textContent = `${String(timeNow.getHours()).padStart(2, 0)}:${String(timeNow.getMinutes()).padStart(2, 0)}:${String(timeNow.getSeconds()).padStart(2, 0)}`
   }, 1000)

   for (const [key, value] of Object.entries(data.times)) {

      let card = `
   
      <div class="card w-[250px] h-[397px] rounded-3xl mt-[130px] ">
         <h2 class="uppercase text-[#FFC700] font-bold pt-5 text-[27px]">${key.split("_")[0]}</h2>
        
         ${key == "tong_saharlik" ? `<img src="./images/tong.svg" alt="" class="mt-[14px]">` : key == "asr" ? `<img src="./images/asr.svg" alt="">` : key == "peshin" ? `<img src="./images/peshin.svg" alt="">` : key == "quyosh" ? `<img src="./images/quyosh.svg" alt="">` : key == "shom_iftor" ? `<img src="./images/shom.svg" alt="">` : key == "hufton" ? `<img src="./images/hufton.svg" alt="" class="mt-[8px]">` : null
         }
         <h1 class="text-[48px] mt-5 font-bold text-[#FFC700]">${value}</h1>
      </div>
   
      `

      day.insertAdjacentHTML("beforeend", card)
   }

}

fetchData("https://islomapi.uz/api/present/day?region=Toshkent", renderData)

search.addEventListener("keyup", e => {
   if (e.keyCode == 13) {

      day.innerHTML = null

      fetchData(`https://islomapi.uz/api/present/day?region=${search.value}`, renderData)
   }
})

