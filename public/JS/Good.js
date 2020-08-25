class Good {
  constructor(props) {
    this.id = Number(props.id) || null
    this.img = props.img || null
    this.name = props.name || null
    this.description = props.description || null
    this.in_top = Number(props.in_top) || null
    this.ingridients = props.ingridients || null
    this.price_eur = Number(props.price_eur) || null
    this.price_usd = Number(props.price_usd) || null
    this.priority_level = Number(props.priority_level) || null
    this.selectedCurrency = 0 || null
    this.enableAddToBasket = true || null
    this.type = props.type
  }

  append(element, condition = 'all', type = 'pizza') {
    if (this.in_top === condition || condition === 'all' && this.type === 'pizza') {
      this.card = this.card ? this.card : this.createGoodCard()
      this.orderWindow = this.orderWindow ? this.orderWindow : this.createOrderWindow()
      this.orderWindow.querySelector('.good-card__choose-btn').addEventListener('click', ()=>{
        if (this.enableAddToBasket) {
          this.toBasket()
          this.enableAddToBasket = false
        }
        setTimeout(()=>{
          this.enableAddToBasket = true
        }, 300)
      })
      this.card.querySelector('.good-card__choose-btn').addEventListener('click', ()=>{
        this.orderWindow.querySelector('.order-window-close').addEventListener('click', ()=>{
          this.orderWindow.remove()  
          document.querySelector('body').classList.remove('no-scroll')
        })
        document.querySelector('body').append(this.orderWindow)
        document.querySelector('body').classList.add('no-scroll')
      })
      if (element) {
        element.append(this.card)
      }
    }
  } 

  async updatePrice(type = 'USD') {
    switch (type) {
      case 'USD':
          this.card.querySelector('.good-card__price').innerHTML = this.price_usd + ' $'
          this.orderWindow.querySelector('.good-card__price').innerHTML = this.price_usd + ' $'
          this.selectedCurrency = 1
        break;
      default:
          this.card.querySelector('.good-card__price').innerHTML = this.price_eur + ' €'
          this.orderWindow.querySelector('.good-card__price').innerHTML = this.price_eur + ' €'
          this.selectedCurrency = 0
        break;
    }
  }

  createGoodCard() {
    let ingridients = []
    if (this.ingridients) {
      this.ingridients.forEach((ingridient) => {
        ingridients.push(this.create({ classes: 'ingridient', element: 'div', innerData: ingridient }))
      })
    }

    let Image = this.create({ 
      classes: 'good-card__image', 
      element: 'img',
      src: '/public/images/pizza/' + this.img,
      alt: this.name
    })
    let CardTextBody = this.create({ 
      classes: 'good-card__container', 
      element: 'div', 
      innerData: [ 
          this.create({ 
            classes: 'good-card__title', 
            element: 'div',
            innerData: this.name, 
          }), 
          this.create({ 
            classes: 'good-card__subtitle', 
            element: 'div',
            innerData: [
              this.create({
                classes: 'good-card__description',
                element: 'div',
                innerData: this.description,
              }),
              this.create({
                classes: 'good-card__ingridients',
                element: 'div',
                innerData: ingridients,
              }),
              this.create({
                classes: 'good-card__footer',
                element: 'div',
                innerData: [
                  this.create({
                    classes: 'good-card__price',
                    element: 'div',
                    innerData: this.price_eur + ' €',
                  }),
                  this.create({
                    classes: 'good-card__choose-btn',
                    element: 'input',
                    type: 'submit',
                    value: 'Choose'
                  })
                ]
              })
            ], 
          }),
        ]
      })
    let wrapper = this.create({ 
      classes: 'good-card__wrapper', 
      element: 'div', 
      dataset: {
        id: this.id
      },
      innerData: [ 
        Image, 
        CardTextBody 
      ] 
    })
    return wrapper
  }

  createOrderWindow() {
    let ingridients = []
    if (this.ingridients) {
      this.ingridients.forEach((ingridient) => {
        ingridients.push(this.create({ classes: 'ingridient', element: 'div', innerData: ingridient }))
      })
    }

    return this.create({ 
      classes: 'order-wrindow-wrapper', 
      element: 'div', 
      innerData: [
        this.create({ 
          classes: 'order-window-card', 
          element: 'div', 
          innerData: [
            this.create({ 
              classes: 'order-wrindow-image', 
              element: 'img',
              src: '/public/images/pizza/' + this.img,
              alt: this.name
            }),
            this.create({ 
              classes: 'order-window-card__aside-content', 
              element: 'div', 
              innerData: [
                this.create({ 
                  classes: 'good-card__subtitle', 
                  element: 'div',
                  innerData: [
                    this.create({ 
                      classes: 'good-card__title', 
                      element: 'div',
                      innerData: this.name, 
                    }), 
                    this.create({
                      classes: 'good-card__description',
                      element: 'div',
                      innerData: this.description,
                    }),
                    this.create({
                      classes: 'good-card__ingridients',
                      element: 'div',
                      innerData: ingridients,
                    }),
                    this.create({
                      classes: 'good-card__footer',
                      element: 'div',
                      innerData: [
                        this.create({
                          classes: 'good-card__price',
                          element: 'div',
                          innerData: this.price_eur + ' €',
                        }),
                        this.create({
                          classes: 'good-card__choose-btn',
                          element: 'input',
                          type: 'submit',
                          value: 'To basket'
                        })
                      ]
                    })
                  ], 
                }),
              ]
            }),
            this.create({
              classes: 'order-window-close',
              element: 'div',
              innerData: ''
            })
          ]
        })
      ] 
    })
  }

  create(props) {
    let element = document.createElement(props.element)
    let classes = props.classes.split(' ')
    switch (props.element) {
      case 'input':
        element.type = props.type
        element.value = props.value
      break;
      case 'img':
        element.src = props.src
        element.alt = props.alt
      break;
    }

    classes.forEach((Class)=>{
      element.classList.add(Class)
    })
    if (props.dataset) {
      element.dataset.id = props.dataset.id
    }

    if (props.element !== 'input' && props.element !== 'img') {
      Array.isArray(props.innerData) 
      ? props.innerData.forEach((data) => {
        element.append(data)
      }) 
      : element.append(props.innerData)
    }

    return element
  }

  getPrice() {
    return ((localStorage.getItem('current_valute') === 'USD' ? this.price_usd : this.price_eur) * this.amount).toFixed(2) + (localStorage.getItem('current_valute') === 'USD' ? ' $' : ' €')
  }

  toBasket() {
    $.ajax({
      url: '/app/api/addToBasket.php',
      type: 'post',
      data: { GoodId: this.id, Valute: this.selectedCurrency },
      dataType: 'json',
      success: (response)=>{
        document.querySelector('#card-amount').innerHTML = response.all_data_in_the_basket
      },
      error: (err)=>{
        console.log(err)
      }
    })
  }
}

Good.prototype.appendOrder = function(element) {
  let OrderIMG = this.create({ classes: 'Order-img', element: 'img', alt: this.name, src: '/public/images/pizza/' + this.img })
  
  let OrderName = this.create({ classes: 'Order-name', element: 'div', innerData: this.name })
  
  let OrderMinus = this.create({ classes: 'Decrease-amount', element: 'div', innerData: '—' })
  let OrderAmount = this.create({ classes: 'Inner-order-amount', element: 'div', innerData: this.amount || 0 })
  let OrderPlus = this.create({ classes: 'Increase-amount', element: 'div', innerData: '+' })

  let OrderSetAmount = this.create({ classes: 'Order-amount', element: 'div', innerData: [ OrderMinus, OrderAmount, OrderPlus ] })
  let OrderPrice = this.create({ classes: 'Order-price', element: 'div', innerData: this.getPrice() })
  let OrderDelete = this.create({ classes: 'Order-delete', element: 'div', innerData: '' })
  this.OrderCart = this.create({ classes: 'Order-row', element: 'div', innerData: [ OrderIMG, OrderName, OrderSetAmount, OrderPrice, OrderDelete ] })
  OrderMinus.addEventListener('click', ()=>{
    if ( this.amount > 1 ) {
      this.amount -= 1
      removeFormBasket(this.id)
    }
    this.OrderCart.querySelector('.Inner-order-amount').innerHTML = this.amount
    this.OrderCart.querySelector('.Order-price').innerHTML = this.getPrice()
    TotalsPrice(OrderedGoods)
  })
  OrderPlus.addEventListener('click', ()=>{
    this.amount += 1
    addOneToBasket(this.id)
    this.OrderCart.querySelector('.Inner-order-amount').innerHTML = this.amount
    this.OrderCart.querySelector('.Order-price').innerHTML = this.getPrice()
    TotalsPrice(OrderedGoods)
  })
  OrderDelete.addEventListener('click', ()=>{
    this.OrderCart.remove()
    this.isRemoved = true
    TotalsPrice(OrderedGoods)
    if (document.querySelector('.all-orders').querySelectorAll('.Order-row').length === 0) {
      document.querySelector('.all-orders').innerHTML = `<h2 class="no-found notification">Please, add something from the menu</h2>`
    }
    $.ajax({
      url: '/api/removeToBasket',
      type: 'post',
      data: { GoodId: this.id },
      dataType: 'json',
    })
  })
  element.append(this.OrderCart)
}

Good.prototype.appendByType = function(element, condition = 'all') {
  if (this.type === condition) {
    this.card = this.card ? this.card : this.createGoodCard()
    this.orderWindow = this.orderWindow ? this.orderWindow : this.createOrderWindow()
    this.orderWindow.querySelector('.good-card__choose-btn').addEventListener('click', ()=>{
      if (this.enableAddToBasket) {
        this.toBasket()
        this.enableAddToBasket = false
      }
      setTimeout(()=>{
        this.enableAddToBasket = true
      }, 300)
    })
    this.card.querySelector('.good-card__choose-btn').addEventListener('click', ()=>{
      this.orderWindow.querySelector('.order-window-close').addEventListener('click', ()=>{
        this.orderWindow.remove()  
        document.querySelector('body').classList.remove('no-scroll')
      })
      document.querySelector('body').append(this.orderWindow)
      document.querySelector('body').classList.add('no-scroll')
    })
    if (element) {
      element.append(this.card)
    }
  }
} 

Good.prototype.setCurrentPrice = function (type = 'USD') {
  this.OrderCart.querySelector('.Order-price').innerHTML = this.getPrice()
}