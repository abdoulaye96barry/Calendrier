const calendrierWeekday = document.querySelector(".calendrier-weekday")
const calendrierContent = document.querySelector(".calendrier-content")
const selectMonth = document.querySelector("select[name='curentMonth' ] ")
const selectYear = document.querySelector("select[name='curentYear' ] ")
const weekDays = ["Dim", "Lun", "Mar", "Mer", "Jeu", "Ven", "Sam"]
const prevMonth = document.getElementById("prevMonth")
const nextMonth = document.getElementById("nextMonth")
const months = [
    {
        name:  "Janvier",
        numDays: 31
    },
    {
        name:  "Fevrier",
        numDays: 28 // !!!!
    },
    {
        name:  "Mars",
        numDays: 31
    },
    {
        name:  "Avril",
        numDays: 30
    },
    {
        name:  "Mai",
        numDays: 31
    },
    {
        name:  "Juin",
        numDays: 30
    },
    {
        name:  "Juillet",
        numDays: 31
    },
    {
        name:  "Août",
        numDays: 30
    },
    {
        name:  "Septembre",
        numDays: 31
    },
    {
        name:  "Octobre",
        numDays: 30
    },
    {
        name:  "Novembre",
        numDays: 30
    },
    {
        name:  "Decembre",
        numDays: 31
    },
   
]

const date = new Date();
const currentMonthIndex = date.getMonth();
const currentYear = date.getFullYear()

export const Calendrier = {
    initCalendrier: () => {
        console.log("initCalendrier");
        weekDays.forEach((day) => {
            calendrierWeekday.innerHTML += ` <div class="weekday-item">${day} </div> `
        });
        Calendrier.initMonth()
        Calendrier.initYear()

        const numDays = months[currentMonthIndex].numDays
        Calendrier.displayDay(numDays)

        prevMonth.onclick = ()=>{
            if (selectMonth.value > 0) {
                selectMonth.value--
            } else {
                selectMonth.value = 11
                selectYear.value--
            }
        }
        Calendrier.updateCalendrier()

        nextMonth.onclick = ()=>{
            if (selectMonth.value < 11) {
                selectMonth.value++
            } else {
                selectMonth.value = 0
                selectYear.value++
            }
        }
        Calendrier.updateCalendrier()
    },
    displayDay: (num) => {

        console.log(selectMonth.value);
        if(selectMonth.value == 1){
            // Février
            const year = parseInt(selectYear.value)
            if( ((year%4 === 0)&& (year%100 > 0)) || (year%400 === 0)){
                // année bissextile
                num = 29
            }
            // else{
            //     // année non bissextile

            // }
        }

        let day = 1
        calendrierContent.innerHTML = " "
        while (day <= num) {
            calendrierContent.innerHTML += `<div class="day-item">${day} </div>`
            day++
        }

        let firstDayIndex = Calendrier.getWeekDay()

        const firstItem = document.querySelector(".calendrier .calendrier-content .day-item:nth-child(1)")
        firstItem.style.gridColumn = (firstDayIndex+1)+"/"+(firstDayIndex+2)
        //let nameOfFirstDay = weekDays[firstDayIndex] 
        //console.log({nameOfFirstDay});

    },

    initMonth: () => {
        months.forEach((month, index) => {
            if (index == currentMonthIndex) {
                selectMonth.innerHTML += ` <option value="${index}" selected>${month.name}</option> `
                
            }else{
                selectMonth.innerHTML += ` <option value="${index}">${month.name}</option> `
            }
        });
        selectMonth.onchange = () =>{
         Calendrier.updateCalendrier()
        }

    },
    initYear: () => {
        for (let year = 2060; year >= 1900; year--) {
            if (year === currentYear) {
                selectYear.innerHTML += ` <option selected>${year}</option> `        
            } else {
                
                selectYear.innerHTML += ` <option>${year}</option> `  
            }
        }
        selectYear.onchange = () =>{
            Calendrier.updateCalendrier()
        }
        
    },
    updateCalendrier: ()=>{
        const numDays = months[selectMonth.value].numDays
        Calendrier.displayDay(numDays)
    },
    getWeekDay: () =>{
        let weekday
        const d = 1
        const m = parseInt(selectMonth.value) + 1
        const y = parseInt(selectYear.value)
        if(m<3){
            weekday = (Math.trunc((23*m)/9) +d +4 + y +Math.trunc((y-1)/4) - Math.trunc((y-1)/100)+Math.trunc((y-1)/400))%7
        }else{
            weekday = (Math.trunc((23*m)/9) +d +2 + y +Math.trunc((y)/4) - Math.trunc((y)/100)+Math.trunc((y)/400))%7
        }
        return weekday
    }
}