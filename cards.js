'use strict';

const links = {
    "Wikipedia": {
        "url": "https://wikipedia.org",
        "description": "Ad free wiki created by volunteers that I should probably fact check more.",
        "tags": ["Wiki", "Free"]
    },
    "Mozilla Developer Network (MDN)": {
        "url": "https://developer.mozilla.org/en-US/",
        "description": "Free web development knowledge base by Mozilla, maintained by volunteers.",
        "tags": ["Wiki", "Free", "Web development"]
    } 
}

document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelector('.cards');

    class Bookmarks {
        constructor(cards) {
            this.cards = cards;
        };

        createCards() {
            for(let key in links) {
                this.createCard(key);
            }
        }

        createCard(name) {
                let card = document.createElement('div');
                card.classList.add('card');
                let titleBox = document.createElement('div')
                titleBox.classList.add('title-box');
                let title = document.createElement('h3');
                title.classList.add('gradient-title');
                title.innerText = name;
                let cardDesc = document.createElement('div');
                cardDesc.classList.add('card-desc');
                cardDesc.innerText = links[name].description;

                titleBox.appendChild(title);
                card.appendChild(titleBox);
                card.appendChild(cardDesc);
                this.cards.appendChild(card);
        }
    }

    const bookmarks = new Bookmarks(cards);
    bookmarks.createCards();
});
