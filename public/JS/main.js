let AllGoods = []
let AllPopUpWindows = []
let allowToScroll = false

document.querySelector('#bar-close').addEventListener('click', ()=>{
  document.querySelector('.bar').classList.add('close-bar')
})
document.querySelector('#bar-open').addEventListener('click', ()=>{
  document.querySelector('.bar').classList.remove('close-bar')
})

var stringToHTML = function (str) {
  let parser = new DOMParser()
  let doc = parser.parseFromString(str, 'text/html')
  return doc.querySelectorAll('body > *')
}

const scrollTo = (target) => {
  if (document.querySelector(target)) {
    document.querySelector(target).scrollIntoView({
      behavior: "smooth",
      block: "start",
      inline: "center",
    })
  }
}

function Alert(Text, Type, opt = {}) {
  Options = { 
    ...opt,
    globalPosition: 'top center',
    autoHideDelay: 4000,
  }
  switch (Type) {
    case 'success':
      Options.className = 'success'
      return $.notify(Text, Options)
    case 'info':
      Options.className = 'info'
      return $.notify(Text, Options)
    case 'warn':
      Options.className = 'warn'
      return $.notify(Text, Options)
    case 'error':
      Options.className = 'error'
      return $.notify(Text, Options)
    default:
      Options.className = 'info'
      return $.notify(Text, Options)
    break;
  }
}

function removeFormBasket(id) {
  $.ajax({
    url: '/basket/remove_one',
    type: 'POST',
    dataType: 'json',
    data: { id: id }
  }).then((response)=>{
    return response
  })
}

function createNewOrder(obj, values) {
  $.ajax({
    url: '/api/createNewOrder',
    type: 'post',
    data: {...values},
    dataType: 'json',
    success: (result) => {
      console.log(result)
      if (result.response) {
        Alert(`Order created, wait for a call`, "success")
      } else {
        Alert(`Something is wrong`, "error")
      }
      obj.window.remove()
      setTimeout(()=>{
        window.location = '/'
      }, 2000)
    },
    error: (err) => {
      console.log(err)
    }
  })
}

function addOneToBasket(id) {
  $.ajax({
    url: '/basket/add_one_to_the_basket',
    type: 'POST',
    dataType: 'json',
    data: { id: id }
  }).then((response)=>{
    return response
  })
}

document.addEventListener("DOMContentLoaded", function(event){
  setTimeout(()=>{
    document.querySelector('.preloader').classList.add('flow-out')
  }, 800)
  setTimeout(()=>{
    document.querySelector('.preloader').remove()
  }, 1600)
})

// Create Goods Objects And Add Them To Page 
$(() => {
  // Get Goods - Newest
  let GoodsContainer = document.querySelector('#newest-goods')
  let GoodsListElement = document.querySelector('#goods-list')
  $.ajax({
    url: '/api/getGoods',
    type: 'get',
    dataType: 'json'
  }).then((goods)=>{
    GoodsList = goods.flat()
    GoodsList.forEach((goodData)=>{
      let good = new Good(goodData)
      AllGoods.push(good)
      good.append(GoodsContainer, 4)
      good.append(GoodsListElement, 2)
    })
    let CurrCurrency = document.querySelector('#selected-currency')
    CurrCurrency.innerHTML = localStorage.getItem('current_valute') === 'USD' ? '$' : '€'
    AllGoods.forEach(Good=>{
      Good.updatePrice(localStorage.getItem('current_valute'))
    })
    $('#goods-list').slick({
      slidesToShow: 3,
      infinite: false,
      responsive: [
        {
          breakpoint: 840,
          settings: {
            slidesToShow: 2
          }
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1
          }
        }
      ]
    });
    $('#newest-goods').slick({
      slidesToShow: 3,
      infinite: false,
      responsive: [
        {
          breakpoint: 840,
          settings: {
            slidesToShow: 2
          }
        },
        {
          breakpoint: 481,
          settings: {
            slidesToShow: 1
          }
        }
      ]
    })
    if (window.scrollY <= 620) {
      scrollTo('.title')
    }
    // Change Currency
    let Currency = document.querySelectorAll('.select-currency-btn')
    Currency.forEach(curr => {
      curr.addEventListener('click', async (elem) => {
        localStorage.setItem('current_valute', elem.target.dataset.currType)
        document.querySelector('#selected-currency').innerHTML = elem.target.innerHTML
        AllGoods.forEach(Good=>{
          Good.updatePrice(elem.target.dataset.currType)
        })
      })
    })
  })

})

// Arrow And Scrolls
$(()=>{
  // Preview
  let arrowToUp = true
    document.querySelector('.preview__bottom-btn-toscroll').addEventListener('click', ()=>{
      if (window.scrollY <= 0) {
        scrollTo('.preview__bottom-btn-toscroll')
        document.querySelector('.preview__bottom-btn-toscroll').querySelector('.scroll-bottom-btn').classList.add('scroll-bottom-btn-reverse')
      } else {
        scrollTo('.preview')
        document.querySelector('.preview__bottom-btn-toscroll').querySelector('.scroll-bottom-btn').classList.remove('scroll-bottom-btn-reverse')
      }
    })
    window.addEventListener('scroll', ()=>{
      if (window.scrollY > 0 && arrowToUp) {
        document.querySelector('.preview__bottom-btn-toscroll').querySelector('.scroll-bottom-btn').classList.add('scroll-bottom-btn-reverse')
      }
      if (window.scrollY <= 10) {
        document.querySelector('.preview__bottom-btn-toscroll').querySelector('.scroll-bottom-btn').classList.remove('scroll-bottom-btn-reverse')
      }
    })    
})

