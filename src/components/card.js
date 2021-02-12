const { default: axios } = require("axios");

const Card = (article) => {
  // TASK 5
  // ---------------------
  // Implement this function, which should return the markup you see below.
  // It takes as its only argument an "article" object with `headline`, `authorPhoto` and `authorName` properties.
  // The tags used, the hierarchy of elements and their attributes must match the provided markup exactly!
  // The text inside elements will be set using their `textContent` property (NOT `innerText`).
  // Add a listener for click events so that when a user clicks on a card, the headline of the article is logged to the console.
  //
  // <div class="card">
  //   <div class="headline">{ headline }</div>
  //   <div class="author">
  //     <div class="img-container">
  //       <img src={ authorPhoto }>
  //     </div>
  //     <span>By { authorName }</span>
  //   </div>
  // </div>
  //
  const card = lazy("div", "card");
  card.appendChild(lazytxt("div", "headline", article.headline));

  const author = lazy("div", "author");
  const img = lazy("div", "img-container");
  const image = document.createElement("img");
  image.src = article.authorPhoto;
  img.appendChild(image);
  author.appendChild(img);
  const name = lazytxt("span", "", `By ${article.authorName}`);
  author.appendChild(name);
  card.appendChild(author);


  card.addEventListener('click', (event) => {
    console.log(article.headline);
  });

  return card;
}

const cardAppender = (selector) => {
  // TASK 6
  // ---------------------
  // Implement this function that takes a css selector as its only argument.
  // It should obtain articles from this endpoint: `https://lambda-times-api.herokuapp.com/articles`
  // However, the articles do not come organized in a single, neat array. Inspect the response closely!
  // Create a card from each and every article object in the response, using the Card component.
  // Append each card to the element in the DOM that matches the selector passed to the function.
  //
  axios.get('https://lambda-times-api.herokuapp.com/articles')
  .then(response => {
    const data = Object.values(response.data.articles);
    const card = document.querySelector(selector);
    data.forEach(function(e){
      e.forEach(function(a){
        card.appendChild(Card(a));
      })
    })
  })
}

function lazy(type, clas){
  const element = document.createElement(type);
  element.classList.add(clas);
  return element;
}
function lazytxt(type, clas, txt){
  const element = document.createElement(type);
  if(clas != "")
  {
    element.classList.add(clas);
  }
  element.textContent = txt;
  return element;
}

export { Card, cardAppender }
