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
    },
    "GameFAQs": {
        "url": "https://gamefaqs.com",
        "description": "Where to find game cheats and secrets without watching a 10 minutes YouTube video where the video starts out with 'Hey guys'.",
        "tags": ["Free", "Gaming"]
    },
}

document.addEventListener('DOMContentLoaded', () => {
    const cardsDiv = document.querySelector('.cards');

    class Bookmarks {
        constructor(cardsDiv) {
            this.cards = [];
            this.cardsDiv = cardsDiv;
        }

        initialCreateCards() {
            for(let key in links) {
                let card = new Card(key, links[key].url, links[key].description, links[key].tags);
                this.cardsDiv.appendChild(card.getCardDiv())
                this.cards.push(card);
            }
        }
    }

    class Card {
        constructor(title, url, description, tags) {
            this.title = title;
            this.url = url;
            this.description = description;
            this.tags = tags;

            this.cardDiv = document.createElement('article');
            this.cardDiv.classList.add('card');
            this.titleBoxDiv = document.createElement('div')
            this.titleBoxDiv.classList.add('title-box');
            this.titleDiv = document.createElement('h3');
            this.titleDiv.classList.add('gradient-title');
            this.titleLink = document.createElement('a');
            this.titleLink.innerText = this.title;
            this.titleLink.href = this.url;
            this.titleLink.target = '_blank';
            this.cardDescDiv = document.createElement('div');
            this.cardDescDiv.classList.add('card-desc');
            this.cardDescDiv.innerText = this.description;
            this.tagsDiv = document.createElement('div');
            this.tagsDiv.classList.add('tags');
            this.tagButtons = [];
            this.tags.forEach(tag => {
                let tagButton = document.createElement('button');
                tagButton.classList.add('tag');
                tagButton.innerText = tag;
                this.tagButtons.push(tagButton);
                this.tagsDiv.appendChild(tagButton);
            });

            this.constructCard();
        }

        getCardDiv() {
            return this.cardDiv;
        }

        constructCard() {
            this.titleDiv.appendChild(this.titleLink);
            this.titleBoxDiv.appendChild(this.titleDiv);
            this.cardDiv.appendChild(this.titleBoxDiv);
            this.cardDiv.appendChild(this.cardDescDiv);
            this.cardDiv.appendChild(this.tagsDiv);
        }
    }

    const bookmarks = new Bookmarks(cardsDiv);
    bookmarks.initialCreateCards();
});
