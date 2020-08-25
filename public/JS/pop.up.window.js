class PopUpWindow {
  constructor(props) {
    this.title = props.title
    this.body = props.body
  }

  OpenWindow() {
    this.window_wrapper = document.createElement('div')
    this.window_wrapper.classList.add('window-wrapper')
    this.window = document.createElement('div')
    this.window.classList.add('window')
    this.window.append(this.title)
    this.window.append(this.body)

    this.closeBTN = document.createElement('div')
    this.closeBTN.classList.add('Order-delete')
    this.closeBTN.addEventListener('click', ()=>{
      this.window_wrapper.remove()
    })
    this.window.append(this.closeBTN)

    this.window_wrapper.append(this.window)
    document.querySelector('body').append(this.window_wrapper)
  }
}