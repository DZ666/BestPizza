class HistoryRow {
  constructor(props) {
    this.Order_Id = props.Order_Id
    this.Order_Require_Time = props.Order_Require_Time
    this.GoodsList = props.GoodsList
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

  append(element) {
    let id = this.create({ classes: 'history-id', element: 'div', innerData: '#' + this.Order_Id })
    let ReqTime = this.create({ classes: 'history-req-time', element: 'div', innerData: this.Order_Require_Time })
    let title = this.create({ classes: 'history-title', element: 'div', innerData: [ id, ReqTime ] })
    let goods = []
    this.GoodsList.forEach(Good => {
      goods.push(Good.card)
    })
    let allGoods = this.create({ classes: 'history-content', element: 'div', innerData:  [ ...goods ] })
    this.card = this.create({ classes: 'history-row', element: 'div', innerData: [title, allGoods] })
    element.append(this.card)
  }
}

Good.prototype.createHistoryGoodCard = function() {
  let historyImg = this.create({ classes: 'history__img', element: 'img', src: '/public/images/pizza/' + this.img, alt: this.name })
  let historyName = this.create({ classes: 'history__name', element: 'div', innerData: this.name })
  let historyAmount = this.create({ classes: 'history__amount', element: 'div', innerData: this.amount })
  let historyPrice = this.create({ classes: 'good-card__price', element: 'div', innerData: this.getPrice() })
  this.card = this.create({ classes: 'history__good', element: 'div', innerData: [ historyImg, historyName, historyAmount, historyPrice ] })
}

function CreateHistoryRow(AllHistoryRows, element) {
  let HistoryRows = []
  let HistoryRowsIn = {}
  AllHistoryRows.forEach(Row => {
    if (!HistoryRowsIn[Row.Order_Id]) {
      HistoryRowsIn[Row.Order_Id] = Row.Order_Id
      let historyRow = new HistoryRow({
        Order_Id: Number(Row.Order_Id),
        Order_Require_Time: Row.Order_Require_Time,
        GoodsList: []
      })
      HistoryRows.push(historyRow)
    }
  })
  HistoryRows.forEach(Row => {
    let Amounts = {}
    AllHistoryRows.forEach(indexRow => {
      if (Number(indexRow.Order_Id) === Number(Row.Order_Id)) {
        Amounts[indexRow.Good_Name] = (Amounts[indexRow.Good_Name] || 0) + 1
        if (Amounts[indexRow.Good_Name] <= 1) {
          let row = new Good({
            img: indexRow.Good_Img,
            name: indexRow.Good_Name,
            price_usd: indexRow.price_usd,
            price_eur: indexRow.price_eur,
          })
          AllGoods.push(row)
          Row.GoodsList.push(row)
        }
      }
    })
    Row.GoodsList.forEach(indexRow => {
      indexRow.amount = Amounts[indexRow.name]
      indexRow.createHistoryGoodCard()
    })
    Row.append(element)
  })
}

let AllOrderRows = []

$(()=>{
  let History_List_Wrapper = document.querySelector('#order-history-list')
  $.ajax({
    url: '/account/get_orders_history',
    type: 'get',
    dataType: 'json',
    success: (AllHistoryRows)=>{
      CreateHistoryRow(AllHistoryRows, History_List_Wrapper)
    },
    error: (err)=>{
      console.log(err)
    }
  })
})