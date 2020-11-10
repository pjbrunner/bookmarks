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
    "Python Documentation": {
        "url": "https://docs.python.org/3",
        "description": "Python 3 documentation.",
        "tags": ["Free", "Coding"]
    },
    "Wolfram Alpha": {
        "url": "https://www.wolframalpha.com/",
        "description": "Math engine, life engine, for a computer it can answer a lot of difficult question.",
        "tags": ["Search engine", "Math"]
    },
}

function listButtons() {
    console.log('Button pressed')
}
document.addEventListener('DOMContentLoaded', () => {
    const cardsDiv = document.querySelector('.cards');

    class Cards {
        constructor(cardsDiv) {
            this.cards = [];
            this.cardsDiv = cardsDiv;
            this.uniqueTags = [];
            this.sortedLinks = this.alphabeticalSort();
            this.tagDictionary = {};
        }
        
        alphabeticalSort() {
            let sortedLinks = [];
            for(let [key, _] of Object.entries(links)) {
                sortedLinks.push(key)
            }
            sortedLinks = sortedLinks.sort();
            return sortedLinks;
        }

        generateCardsAlphabetically(reverse=false, getUniqueTags=false) {
            let sortedLinks;
            reverse ? sortedLinks = this.sortedLinks.reverse() : sortedLinks = this.sortedLinks;

            for(let link of sortedLinks) {
                let card = new Card(link, links[link].url, links[link].description, links[link].tags);
                this.cardsDiv.appendChild(card.getCardDiv())
                this.cards.push(card);
                if(getUniqueTags) this.uniqueTags = this.uniqueTags.concat(links[link].tags);
            }
            if(getUniqueTags) {
                // Get duplicate entries out by turning into tags into Set then back into an Array.
                let tagsSet = new Set(this.uniqueTags);
                this.uniqueTags = Array.from(tagsSet);
                this.uniqueTags = this.uniqueTags.sort();
            }
        }

        createCategoryGroups() {
            this.createTagDictionary();
            for(let card of this.cards) {
                for(let [key, _] of Object.entries(this.tagDictionary)) {
                    if(card.tags.includes(key)) this.tagDictionary[key].push(card.createCopy());
                }
            }
        }

        createTagDictionary() {
            this.uniqueTags.forEach(tag => {
                this.tagDictionary[tag] = [];
            });
        }

        eraseAllCards() {
            for(let card of this.cards) {
                card.cardDiv.remove();
            }
        }
    }

    class Card {
        constructor(title, url, description, tags) {
            this.title = title;
            this.url = url;
            this.description = description;
            this.tags = tags;

            this.constructCard();
        }

        getCardDiv() {
            return this.cardDiv;
        }

        createCopy() {
            return new Card(this.title, this.url, this.description, this.tags);
        }

        hide() {
            this.cardDiv.classList.add('hide');
        }

        unhide() {
            this.cardDiv.classList.remove('hide');
        }

        createElements() {
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
        }

        constructCard() {
            this.createElements();
            this.titleDiv.appendChild(this.titleLink);
            this.titleBoxDiv.appendChild(this.titleDiv);
            this.cardDiv.appendChild(this.titleBoxDiv);
            this.cardDiv.appendChild(this.cardDescDiv);
            this.cardDiv.appendChild(this.tagsDiv);
        }
    }


    const cards = new Cards(cardsDiv);
    cards.generateCardsAlphabetically(false, true);
    cards.createCategoryGroups();
});
