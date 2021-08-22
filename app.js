const api = {
    get(url) {
        switch (url) {
            case '/lots':
                return new Promise((resolve, reject) => {
                    setTimeout(() => {
                        resolve(
                            [{
                                    id: 1,
                                    name: 'Apple',
                                    description: 'Apple description',
                                    price: 16
                                },
                                {
                                    id: 2,
                                    name: "Orange",
                                    description: 'Orange description',
                                    price: 41
                                }
                            ]

                        )
                    }, 1000)
                })
            default:
                throw new Error('Unknow url')
        }
    }
}

let state = {
    time: new Date(),
    // lots: [
    //     { id: 1, name: 'Apple', description: 'Apple description', price: 16 },
    //     { id: 2, name: "Orange", description: 'Orange description', price: 41 }
    // ]
    lots: null
}

function renderView(state) {
    render(
        App({ state }),
        document.getElementById('root')
    )
}
renderView(state)

setInterval(() => {
    // state.time = new Date()


    state = {
        ...state,
        time: new Date(),
    }

    renderView(state)

    // render(
    //     App({ state }), document.getElementById('root')
    // )
    // // const app = App({ state })
    // const root = document.getElementById('root')
    // root.innerHTML = ''



    // root.append(app)

    // const clock = app.querySelector('.clock')
    // const newClock = Clock({ time })
    // root.replaceChild(newApp, app)
    // // clock.querySelector('.value') = time.toLocaleTimeString()

    // if (time.getHours() > 7 && time.getHours() < 21) {
    //     clock.querySelector('.icon').classN ame = 'icon day'
    // } else {
    //     clock.querySelector('.icon').className = 'icon night'
    // }

}, 1000)

api.get('/lots').then((lots) => {
    state = {
        ...state,
        lots
    }
    renderView(state)
})

function render(newDOM, realDOMRoot) {
    realDOMRoot.innerHTML = ''
    realDOMRoot.append(newDOM)
}




function App({ state }) {
    const app = document.createElement('div')
    app.className = 'app'
    app.append(Header())
    app.append(Clock({ time: state.time, zone: state.zone }));
    app.append(Lots({ lots: state.lots }));
    return app
}

function Header() {
    const header = document.createElement('header')
    header.className = 'header'
    header.append(Logo())
    return header
}

function Logo() {
    const logo = document.createElement('img')
    logo.className = 'logo'
    // logo.classList.add('logo')
    logo.src = 'logo.png'

    return logo
}


function Clock({ time, zone }) {
    // const { time, zone } = props
    const clock = document.createElement('div')
    clock.className = 'clock'

    const clockValue = document.createElement('span')
    clockValue.className = 'value'
    clockValue.innerText = time.toLocaleTimeString()

    clock.append(clockValue)


    const icon = document.createElement('span')
    if (time.getHours() >= 7 && time.getHours < 21) {
        icon.className = 'icon day'

    } else {
        icon.className = 'icon night'

    }
    clock.append(icon)
    return clock
}

function Loading() {
    const node = document.createElement('div')
    node.className = 'loading'
    node.innerHTML = 'Loading'
    return node
}


function Lots({ lots }) {
    if (lots === null) {
        return Loading()
    }

    const list = document.createElement('div')
    list.className = 'lots'

    lots.forEach((lot) => {

        list.append(Lot({ lot }))
    })
    return list
}

function Lot({ lot }) {
    const node = document.createElement('article')
    node.className = 'lot'

    const price = document.createElement('div')
    price.className = 'price'
    price.innerText = lot.price
    node.append(price)

    const name = document.createElement('h1')
    name.innerText = lot.name
    node.append(name)

    const description = document.createElement('p')
    description.innerText = lot.description
    node.append(description)

    return node

}
