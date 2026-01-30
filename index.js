const $modal_Choose_Currency_From = document.querySelector('.modal_Choose_Currency_From');
const $modal_Choose_Currency_To = document.querySelector('.modal_Choose_Currency_To');
const $card_option_From = document.querySelector('.card_option_From');
const $card_option_To = document.querySelector('.card_option_To');
const $closeModalChoose = document.querySelectorAll('.closeModalChoose');
const $cardsPopulars = document.querySelector('.cardsPopulars_From');
const $cardsPopulars_To = document.querySelector('.cardsPopulars_To');
const $currentCurrencyFrom = document.querySelector('.currentCurrencyFrom');
const $currentNameCurrencyFrom = document.querySelector('.currentNameCurrencyFrom');
const $currentCurrencyTo = document.querySelector('.currentCurrencyTo');
const $currentNameCurrencyTo = document.querySelector('.currentNameCurrencyTo');
const $convert_Currency = document.querySelector('.convert_Currency');
const $inputAmount = document.querySelector('.inputAmount');
const $amoutTotal = document.querySelector('.amoutTotal');
const $dateInfo = document.querySelector('.dateInfo');
const $investCurrency = document.querySelector('.investCurrency');

let dataCurrent = [];
const API_KEY = '2d77691890a5509a234c0f54'

$modal_Choose_Currency_From.classList.add('display_view');
$modal_Choose_Currency_To.classList.add('display_view');

function desactiveModal () {
    $modal_Choose_Currency_From.classList.add('display_view')
    $modal_Choose_Currency_To.classList.add('display_view');
}

function currentagreeDate () {
    const mesesCortos = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"];
    const ahora = new Date()
    const mes = ahora.getMonth()
    const dia = ahora.getDay()
    const año = ahora.getFullYear()
    const hora = ahora.toLocaleTimeString()

    $dateInfo.textContent = `${mesesCortos[mes]} ${dia}, ${año}, ${hora}`
}

currentagreeDate ()

async function activeDataCards () {
    try {
        const api_Data = await fetch('api_Data.json')
        const api_Json = await api_Data.json()

        api_Json.currencies.forEach((data) => {
            createCards_From  (data) 
            createCards_To (data)
            agreeEventsListenersOfCard(data)
        })


    } catch (error) {
        
    }
} 

function createCards_From (data) {
    const $card = document.createElement('div');
    $card.classList.add('cardCurrency');
    $card.className = 'cardCurrency car_From';

    $card.innerHTML = `
        <div class="cardInfoData">
            <div class="cardCurrencyImg">
                <img src="${data.flag}" alt="">
            </div>

            <div class="name_Currency">
                <span data-code="${data.code}">${data.code}</span>
                ${data.name}
            </div>
        </div>

        <button class="select_check" style="display: none;">
            <i class="ri-check-line"></i>
        </button>
    `

    $cardsPopulars.appendChild($card)
}

function createCards_To (data) {
    const $card = document.createElement('div');
    $card.classList.add('cardCurrency');
    $card.className = 'cardCurrency card_To';

    $card.innerHTML = `
        <div class="cardInfoData">
            <div class="cardCurrencyImg">
                <img src="${data.flag}" alt="">
            </div>

            <div class="name_Currency">
                <span data-code="${data.code}">${data.code}</span>
                ${data.name}
            </div>
        </div>

        <button class="select_check" style="display: none;">
            <i class="ri-check-line"></i>
        </button>
    `

    $cardsPopulars_To.appendChild($card)
}

function agreeEventsListenersOfCard (data) {
    const $card_From = document.querySelectorAll('.car_From')
    const $card_To = document.querySelectorAll('.card_To')

    dataCurrent.push(data);

    $card_From.forEach((button, index) => {
        button.addEventListener('click', () => {
            $currentCurrencyFrom.textContent = dataCurrent[index].code
            $currentNameCurrencyFrom.textContent = dataCurrent[index].name

            desactiveModal ()
        })
    })

    $card_To.forEach((button, index) => {
        button.addEventListener('click', () => {
            $currentCurrencyTo.textContent = dataCurrent[index].code
            $currentNameCurrencyTo.textContent = dataCurrent[index].name

            desactiveModal ()
        })
    })
}

async function activeAPI () {
    try {
        const Api_Data = `https://v6.exchangerate-api.com/v6/${API_KEY}/pair/${$currentCurrencyFrom.textContent}/${$currentCurrencyTo.textContent}/${$inputAmount.value}`
        
        const api = await fetch(Api_Data)
        const api_json = await api.json()
        
        $amoutTotal.innerHTML = `
            ${api_json.conversion_result.toFixed(2)}
            <span>${$currentCurrencyTo.textContent}</span>
        ` 
       
    } catch (error) {
        console.log(error)
    }
}

$convert_Currency.addEventListener('click', activeAPI)

function investCurrency () {
    let invest_1 = $currentCurrencyFrom.textContent
    let invest_2 = $currentCurrencyTo.textContent

    $currentCurrencyFrom.textContent = invest_2
    $currentCurrencyTo.textContent = invest_1
}

$investCurrency.addEventListener('click', investCurrency)

function optionsOpenAndCloseModal () {
    $card_option_From.addEventListener('click', () => {
        $modal_Choose_Currency_From.classList.remove('display_view')
    })

    $card_option_To.addEventListener('click', () => {
        $modal_Choose_Currency_To.classList.remove('display_view')
    })
    
    $closeModalChoose.forEach((button) => {
        button.addEventListener('click', () => {
            desactiveModal ()
        })
    })
}

activeDataCards ()
optionsOpenAndCloseModal ()
