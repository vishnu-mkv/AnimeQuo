let content = document.getElementById('content');
let form = document.getElementById('search');
let query = document.getElementById('search-text');

function createQuote(obj) {
    let element = document.createElement('div');
    element.className = 'container';
    let quote = document.createElement('p');
    quote.className = 'quote';
    quote.innerText = obj.quote;
    let who = document.createElement('p');
    who.className = 'who-said';
    who.innerText = '-' + obj.character + ', ' + obj.anime;
    element.appendChild(quote);
    element.appendChild(who);
    content.appendChild(element);
}

axios({
    method: 'get',
    url: 'https://animechan.vercel.app/api/quotes'
}).then(res => {
    res.data.map(quote => createQuote(quote));
});

form.addEventListener('submit', e => {
    e.preventDefault();
    content.innerHTML = ''
    
    axios({
        method: 'get',
        url: 'https://animechan.vercel.app/api/quotes/anime?title='+query.value
    }).then(res => {
        res.data.map(quote => createQuote(quote));
    }).catch(err => {
        let error = document.createElement('p');
        error.innerText = 'No results found!';
        content.appendChild(error);
    })
})
