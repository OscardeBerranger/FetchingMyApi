let baseUrl = 'https://kamelot.oscadeberranger.com'
let token
let buttonForQuotes
let mainContainer = document.querySelector('.mainContainer')
window.addEventListener('load', ()=>{
    mainContainer.innerHTML = getLogin()
    document.querySelector('.btnSubmit').addEventListener('click', ()=>{
        let username = document.querySelector('#logInUsername').value
        let password = document.querySelector('#logInPassword').value
        signIn(username, password)
    })
})
function getLogin(){
    let template =`
                <h1>Sign In</h1>
                    <input type="text" name = "username" id="logInUsername" placeholder="Enter your email">
                    <input type="password" name = "password" id="logInPassword" placeholder="Enter your password">
                    <button class = "btnSubmit">Sign In</button>
                    
    `

    return template
}

function signIn(username, password){
    let url = `${baseUrl}/api/login_check`
    let body = {
        username: username,
        password: password
    }
    let bodySerialise = JSON.stringify(body)

    let fetchParams = {
        headers: {
            'Content-Type': 'application/json'
        },
        method : "POST",
        body: bodySerialise

    }

    fetch(url, fetchParams)
        .then(response=>response.json())
        .then(data=>{
            if (data.token){
                token = data.token
                mainContainer.innerHTML = `
                <p>Connecté</p>
                <button class="bntGetJokeAndUserName">Give me info !</button>
    `

            }
        })
        .then(fetchMyStuffPlz)

}

function fetchMyStuffPlz(){
        document.querySelector('.bntGetJokeAndUserName').addEventListener('click', ()=>{
            let url = `${baseUrl}/api/citation/getCitation`

            let fetchParams = {
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": `Bearer ${token}`
                },
            }

            fetch(url, fetchParams)
                .then(response=>response.json())
                .then(data=>{
                    data.forEach((donné)=>{

                        mainContainer.innerHTML = `
                                <div class="card">
                    <h5 class="card-title">${data[0].auteur}</h5>
                <div class="card-text">${data[0].content}</div>
            </div>
                    
    `
                    })
                    console.log(data)
                })
        })

}