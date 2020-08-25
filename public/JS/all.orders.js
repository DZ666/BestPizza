let OrderPrice = document.querySelector('#order-price') 
let OrderDeliveryBill = document.querySelector('#order-delivery-bill') 
let OrderTotalPrice = document.querySelector('#order-whole-price') 
let OrderedGoods = []
let Totals_Price = 0
let Delivery_Bill = {
  price_eur: 0.3,
  price_usd: 0.35
}
let Total_Price = 0

let getPrefix = () => {
  return (localStorage.getItem('current_valute') === 'USD' ? ' $' : ' €')
}

let TotalsPrice = (OrderedGoods, CalcPrice = 0, elem = null) => {
  OrderedGoods.forEach(Good => {
    if (!Good.isRemoved) {
      CalcPrice += Number(((localStorage.getItem('current_valute') === 'USD' ? Good.price_usd * Good.amount : Good.price_eur * Good.amount )))
    }
    if (elem) {
      Good.setCurrentPrice(elem.target.dataset.currType)
    }
    Totals_Price = CalcPrice
    OrderPrice.innerHTML = (CalcPrice).toFixed(2) + getPrefix()
    OrderTotalPrice.innerHTML = Number(Totals_Price + Number(localStorage.getItem('current_valute') === 'USD' ? Delivery_Bill.price_usd : Delivery_Bill.price_eur)) + getPrefix()
    OrderDeliveryBill.innerHTML = localStorage.getItem('current_valute') === 'USD' ? Delivery_Bill.price_usd + getPrefix() : Delivery_Bill.price_eur + getPrefix()
  })
}

PopUpWindow.prototype.ConfirmAddress = function(SelectingName) {

  this.body.querySelector(SelectingName).addEventListener('click', (target)=>{
    target.preventDefault()
    let values = {
      Name: this.body.querySelector('#Name').value,
      Phone_Number: this.body.querySelector('#Phone_Number').value,
      Street: this.body.querySelector('#Street').value,
      Flat_Number: this.body.querySelector('#Flat_Number').value,
      Front_Door: this.body.querySelector('#Front_Doore').value,
      Door_Code: this.body.querySelector('#Door_Code').value,
      Floor: this.body.querySelector('#Floor').value,
      Comment: this.body.querySelector('#Comment').value,
    }
     
    if (!values.Phone_Number) {
      Alert(`Please fill in the "Phone number" field`, "error")
    } else if (!values.Street) {
      Alert(`Please fill in the "Street" field`, "error")
    } else {
      createNewOrder(this, values)
    }
  })
}

let OrdersFields = document.querySelector('.all-orders')
$.ajax({
  url: '/api/get_ordered_goods',
  type: 'GET',
  dataType: 'json',
  success: (ordered_goods)=>{
    let CalcPrice = 0
    let Amounts  = {}
    ordered_goods.forEach((GoodData)=>{
      Amounts[GoodData.name] = (Amounts[GoodData.name] || 0) + 1 
      if (Amounts[GoodData.name] <= 1) {
        let good = new Good(GoodData)
        OrderedGoods.push(good)
      }
    })
    OrderedGoods.forEach(Good => {
      Good.amount = Amounts[Good.name]
      Good.appendOrder(OrdersFields)
      CalcPrice += localStorage.getItem('current_valute') === 'USD' ? Good.price_usd * Good.amount : Good.price_eur * Good.amount
    })
    Totals_Price = CalcPrice
    OrderPrice.innerHTML = (CalcPrice).toFixed(2) + getPrefix()
    OrderDeliveryBill.innerHTML = localStorage.getItem('current_valute') === 'USD' ? Delivery_Bill.price_usd + getPrefix() : Delivery_Bill.price_eur + getPrefix()
    OrderTotalPrice.innerHTML = Number(Totals_Price + Number(localStorage.getItem('current_valute') === 'USD' ? Delivery_Bill.price_usd : Delivery_Bill.price_eur)) + getPrefix()
    // Change Currency
    let Currency = document.querySelectorAll('.select-currency-btn')
    Currency.forEach(curr => {
      curr.addEventListener('click', async (elem) => {
        localStorage.setItem('current_valute', elem.target.dataset.currType)
        document.querySelector('#selected-currency').innerHTML = elem.target.innerHTML
        TotalsPrice(OrderedGoods, 0, elem)
      })
    })
    if (ordered_goods.length === 0) {
      return OrdersFields.innerHTML = `<h2 class="no-found notification">Please, add something from the menu</h2>`
    }
  },
  error: (err)=>{
    console.log(err)
  }
})

// order-delivery-bill
// order-whole-price

$(()=>{
  setTimeout(()=>{
    if ((document.querySelector('.all-orders').querySelectorAll('.Order-row')).length > 0) {
      GoodCardOpenWindow()
    } else {
      document.querySelector('#good-card-open-window').classList.add('disabled')
      let int = setInterval(()=>{
        if ((document.querySelector('.all-orders').querySelectorAll('.Order-row')).length > 0) {
          GoodCardOpenWindow()
          document.querySelector('#good-card-open-window').classList.remove('disabled')
          clearInterval(int)
        }
      }, 200)
    }
  }, 200)
})

let GoodCardOpenWindow = () => {
  document.querySelector('#good-card-open-window').addEventListener('click', ()=>{
    let title = document.createElement('div')
    title.classList.add('title')
    title.append('Where to deliver?')

    let prepData = `
      <form class="checkout-wrapper">
        <div class="inner-checkout">
          <div class="w100 flex wrap jc-fs">
            <label class="flex w100 jc-fs">Name</label>
            <input id="Name" class="checkout-text w40" type="text" placeholder="Jonh Doe" required />
          </div>
          <div class="w100 flex wrap jc-fs">
            <label class="flex w100 jc-fs">Phone Number</label>
            <input id="Phone_Number" class="checkout-text w40" type="tel" placeholder="+7 999 999-99-99" value="+7" required />
          </div>
          <div class="w100 flex wrap jc-fs">
            <label class="flex w100 jc-fs">Street</label>
            <input id="Street" class="checkout-text w100" type="text" placeholder="Street" required />
          </div>
          <div class="flex w100 jc-sa inner-m-l">
            <input id="Flat_Number" class="checkout-text w20" type="text" placeholder="Flat Number" />
            <input id="Front_Doore" class="checkout-text w20" type="text" placeholder="Front Door" />
            <input id="Door_Code" class="checkout-text w20" type="text" placeholder="Door Code" />
            <input id="Floor" class="checkout-text w20" type="text" placeholder="Floor" />
          </div>
        </div>
        <div class="w100 flex wrap jc-fs mt-18">
          <label class="flex w100 jc-fs">Comment</label>
          <textarea id="Comment" class="checkout-comment" placeholder="Comment"></textarea>
        </div>
        <div class="w100 flex wrap jc-fs">
          <input type="submit" class="good-card__choose-btn" id="good-card__choose-btn" value="Confirm Address" />
        </div>
      </form>
    `
    if ((document.querySelector('.all-orders').querySelectorAll('.Order-row')).length > 0) {
      let Window = new PopUpWindow({ title: title, body: stringToHTML(prepData)[0] })
      Window.ConfirmAddress('#good-card__choose-btn')
      let phones = [{ "mask": "+7 (###) ###-##-##"}, { "mask": "(###) ###-##############"}]
      $(Window.body.querySelector('#Phone_Number')).inputmask(
      {
        mask: phones, 
        greedy: false, 
        definitions: { 
          '#': { 
            validator: "[0-9]", 
            cardinality: 1
          }
        } 
      })
      AllPopUpWindows.push(Window)
      Window.OpenWindow()
    }
  })
}