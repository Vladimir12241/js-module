class App {
    constructor() {
        this.app = this
        this.navigator = (new Footer())
        this.id = this.randoId
        this.mainBox = document.createElement('section')
        this.head = document.createElement('header')
        this.headName = document.createElement('h1')
        this.inputSection = document.createElement('input')
        this.listBox = document.createElement('section')
        this.list = document.createElement('ul')
        this.select = document.createElement('div')
        this.getAll = document.createElement('input')
        this.getAllOf = document.createElement('ladel')

        this.mainBox.appendChild(this.head)
        this.head.appendChild(this.headName)
        this.head.appendChild(this.select)
        this.head.appendChild(this.inputSection)
        this.mainBox.appendChild(this.listBox)
        this.listBox.appendChild(this.list)

        this.select.appendChild(this.getAllOf)
        this.select.appendChild(this.getAll)

        this.mainBox.className = 'main'
        this.listBox.className = 'act-box'
        this.list.className = 'act-box-ul'
        this.getAll.type = 'checkbox'
        this.inputSection.type = 'text'
        this.inputSection.placeholder = 'What needs to be done?'
        this.headName.className = 'todoapp h1'
        this.headName.innerHTML = 'todos'
        this.getAll.className = 'get-all'
        this.getAllOf.className = 'all-of'
        this.inputSection.className = 'todo-input'
        this.select.classList.add('select-hide')

        this.ifAllcheck()

        this.inputSection.addEventListener('keydown', (e) => {
                  if (e.code === 'Enter') {
                      if (this.inputSection.value !== '') {
                    let show = JSON.parse(localStorage.getItem('todo')) 
                    if (show == null) {
                        show = []
                    }
                    let item = {
                        id: this.randoId(),
                        value: this.inputSection.value,
                        checked: ''
                    }

                    show.push(item)
                    localStorage.setItem('todo', JSON.stringify(show))
                    this.inputSection.value = ''
                  }
                } else {
                    return
                }

                this.printPage()
        })

        this.getAll.addEventListener('click', (e) => {
            let show = JSON.parse(localStorage.getItem('todo'))
            let retThis = []
            if (this.getAllOf.classList == 'all-of all-of-check') {
                show.map(item => { 
                    item.status = ''
                    retThis.push(item)
                })
            } else {show.map(item => { 
                item.status = 'checked'
                retThis.push(item)
                })
            }
            localStorage.setItem('todo', JSON.stringify(retThis))
            this.getAllOf.classList.toggle('all-of-check')
            this.printPage()
            this.navigator.counter()
        })

    }

    print () {
        document.body.appendChild(this.mainBox)
        this.printPage()
        this.navigator.print(this.mainBox)
        
    }

    printPage() {
        let show = JSON.parse(localStorage.getItem('todo'))
        if (show !== null && show.length !== 0){
            this.select.classList.remove('select-hide')
        } else { 
            this.select.classList.add('select-hide')
        }
        if (window.location.hash == '#/completed') {
            this.printCompleted()
        } else if (window.location.hash == '#/active') {
            this.printActive()
        } else { 
            window.location.hash = '#/'
            this.printAll()
        }
    }

    printAll() {
        let show = JSON.parse(localStorage.getItem('todo')) 
        this.list.innerHTML = ''
            if (show !== null) {
                show.map(item => new TobList(item).print(this.list))
                this.navigator.counter()
            }
    }

    printActive() {
        let show = JSON.parse(localStorage.getItem('todo'))
        let printThis = [] 
        this.list.innerHTML = ''
            if (show !== null) {
                show.map(item => {
                    if(item.status !== 'checked') {
                        printThis.push(item)
                    } 
                })
            }        
        this.list.innerHTML = ''           
        printThis.map(item => new TobList(item).print(this.list))
        this.navigator.counter()
    }

    printCompleted() { 
        let show = JSON.parse(localStorage.getItem('todo'))
        let printThis = [] 
        this.list.innerHTML = ''
            if (show !== null) {
                show.map(item => {
                    if(item.status == 'checked') {
                        printThis.push(item)
                    } 
                })
            }        
        this.list.innerHTML = ''           
        printThis.map(item => new TobList(item).print(this.list))
        this.navigator.counter()
    }

    randoId() {
        function random () { 
            return Math.ceil(Math.random(100, ) * 100000)
        }
        let show = JSON.parse(localStorage.getItem('todo'))
        if (show !== null) {
            show.map(item => {
                if (item.id !== random())
                return random()
            })
        } else {
            random()
        }
        return random()
    }

    ifAllcheck() {
        let actionArrayList = JSON.parse(localStorage.getItem('todo'))
        
        if(actionArrayList == null || actionArrayList.length == 0 ) {
            return
        } else if (actionArrayList !== 0) {
            this.select.classList.remove('select-hide')
            let seList = false 
            if (actionArrayList.every( function (element) {return element.status == 'checked'}) == true ){
                    seList = true
                } 
            if (seList == true) {
                this.getAllOf.classList.add('all-of-check')
            } else {
                return 
            }
        } else {
            return
        } 
        localStorage.setItem('todo', JSON.stringify(actionArrayList))
    }
}

class TobList {
    constructor ({id, value, status}) {
        this.input = value
        this.id = id
        this.status = status
        this.navigator = (new Footer())
        this.actBox = document.createElement('li')
        this.actItem = document.createElement('div')
        this.actCheck = document.createElement('input')
        this.actText = document.createElement('label')
        this.actDell = document.createElement('button')

        this.actItem.className = 'list-item'
        this.actText.className = 'text-area'
        this.actDell.className = 'delete'
        this.actBox.className = 'list-box '
        this.actCheck.type = 'checkbox'

        this.actBox.appendChild(this.actItem)
        this.actItem.appendChild(this.actCheck)
        this.actItem.appendChild(this.actText)
        this.actItem.appendChild(this.actDell)

        // this.actObj = {
        //     id: this.id,
        //     value: this.input,
        //     status: this.actCheck
        // }

        // let actionArrayList = JSON.parse(localStorage.getItem('todo'))
        //  if (actionArrayList !== null) {
        //     let seList = false 
        //     let compare = this.id
        //     if (actionArrayList.some( function (element) {
        //             return element.id == compare
        //         }) == true ){
        //             seList = true
        //         } 
        //     if (seList == true) {
        //         return
        //     } else {
        //         actionArrayList.push(this.actObj) 
        //     }
        // } else if (actionArrayList == null) {
        //     actionArrayList = []
        //     actionArrayList.push(this.actObj) 
        // } 
        // localStorage.setItem('todo', JSON.stringify(actionArrayList))
    }

    print (parent) {
        parent.appendChild(this.actBox)
        this.actText.innerHTML = this.input
        this.actDell.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-x-lg" viewBox="0 0 16 16">
        <path fill-rule="evenodd" d="M13.854 2.146a.5.5 0 0 1 0 .708l-11 11a.5.5 0 0 1-.708-.708l11-11a.5.5 0 0 1 .708 0Z"/>
        <path fill-rule="evenodd" d="M2.146 2.146a.5.5 0 0 0 0 .708l11 11a.5.5 0 0 0 .708-.708l-11-11a.5.5 0 0 0-.708 0Z"/>
      </svg>`
        if (this.status == 'checked') {
            this.actCheck.classList.add('complite')
            this.actItem.classList.add('text-complite')
        }else {
            this.actCheck.classList.add('chek-box')
        }
        this.actDell.addEventListener('click', () => this.dell())
        this.actCheck.addEventListener('click', () => this.checkThis())
    }

    checkThis() {
        let show = JSON.parse(localStorage.getItem('todo'))
        let retThis = []
            show.map(item => {
                if (item.id == this.id && item.status == 'checked') {  
                item.status = ''
                this.actCheck.classList.toggle('chek-box')
                this.actCheck.classList.toggle('complite')
                this.actItem.classList.remove('text-complite')

                retThis.push(item)
            } else if (item.id == this.id && item.status !== 'checked') {
                item.status = 'checked'
                this.actCheck.classList.toggle('chek-box')
                this.actCheck.classList.toggle('complite')
                this.actItem.classList.add('text-complite')
                retThis.push(item)
            } else {
                retThis.push(item)
            }
        })
            localStorage.setItem('todo', JSON.stringify(retThis))
            app.printPage()
            this.navigator.counter()
    }

    dell () {
        let toDell = JSON.parse(localStorage.getItem('todo'))
        let show = []
        toDell.filter(item => {
            if (item.id !== this.id){
                show.push(item)
            }})
        localStorage.setItem('todo', JSON.stringify(show))
        app.printPage()
        this.navigator.counter()
    }
}

class Footer {
    constructor () {
        this.actNaw = document.createElement('footer')
        this.count = document.createElement('span')
        this.nawList= document.createElement('ul')
        this.all = document.createElement('li')
        this.active = document.createElement('li')
        this.complet = document.createElement('li')
        this.allLink = document.createElement('a')
        this.activeLink = document.createElement('a')
        this.completLInk = document.createElement('a')
        this.allDell = document.createElement('button')
    
        this.actNaw.appendChild(this.count)
        this.actNaw.appendChild(this.nawList)
        this.nawList.appendChild(this.all)
        this.all.appendChild(this.allLink)
        this.nawList.appendChild(this.active)
        this.active.appendChild(this.activeLink)
        this.nawList.appendChild(this.complet)
        this.complet.appendChild(this.completLInk)

        this.allLink.href = '#/'
        this.allLink.innerText = 'All'
        this.activeLink.href = '#/active'
        this.activeLink.innerText = 'Active'
        this.completLInk.href = '#/completed'
        this.completLInk.innerText = 'Completed'

        this.actNaw.appendChild(this.allDell)
        this.allDell.type = 'button'
        this.allDell.innerHTML = 'Clear complited'

        this.nawList.className = 'naw-list'  
        this.all.className = 'naw-item'
        this.active.className = 'naw-item'
        this.complet.className = 'naw-item'
        this.allDell.className = 'dell-all'

        this.allDell.addEventListener('click', (e) => {
            let show = JSON.parse(localStorage.getItem('todo'))
            let retThis = []
            show.map(item => { 
                   if (item.status !== 'checked'){
                       retThis.push(item)
                    }
                })
            localStorage.setItem('todo', JSON.stringify(retThis))
            app.printPage()

        })

        this.allLink.addEventListener('click', () => {
            this.all.classList.add('page-select')
            this.active.classList.remove('page-select')
            this.complet.classList.remove('page-select')
            app.printAll()
        })
        this.activeLink.addEventListener('click', () => {
            this.all.classList.remove('page-select')
            this.active.classList.add('page-select')
            this.complet.classList.remove('page-select')
            app.printActive()
        })
        this.completLInk.addEventListener('click', () => {
            this.all.classList.remove('page-select')
            this.active.classList.remove('page-select')
            this.complet.classList.add('page-select')
            app.printCompleted()
        })
    }

    print (parent) {
        parent.appendChild(this.actNaw)
        this.selectedPage()
        let show = JSON.parse(localStorage.getItem('todo'))
        if (show == null || show.length == 0 ){
            this.actNaw.classList.add('foot-hide')
        }
    }

    counter() {
        let show = JSON.parse(localStorage.getItem('todo'))
        let retThis = []
        if (show == null || show.length == 0 ){
            this.actNaw.classList.add('foot-hide')
        } else {
            this.actNaw.classList.remove('foot-hide')
        }
        if (show !== null && show.length !== 0){
        show.map(item => { 
                if (item.status !== 'checked')
                retThis.push(item)
            })
        } 
        this.count.innerHTML = '';
        this.count.innerHTML = retThis.length + ' items left'

        if (show !== null && show.length == 0) {
            localStorage.removeItem('todo')
        }
    }

    selectedPage() {
        if (window.location.hash == '#/completed') {
            this.complet.classList.add('page-select')
        } else if (window.location.hash == '#/active') {
            this.active.classList.add('page-select')
        } else { 
            this.all.classList.add('page-select')
        } 
    }
}

let app = (new App())
app.print()
