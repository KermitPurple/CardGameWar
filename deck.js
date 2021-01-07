const SUITS = ['♥', '♦', '♣', '♠'];
const CARD_VALUES = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];

export default class Deck{
    constructor(cards = fresh_deck()){
        this.cards = cards;
    }

    get number_of_cards(){
        return this.cards.length;
    }

    shuffle(){
        for(let i = this.number_of_cards - 1; i > 0; i--){
            const new_index = Math.floor(Math.random() * (i + 1));
            const old_val = this.cards[new_index];
            this.cards[new_index] = this.cards[i];
            this.cards[i] = old_val;
        }
    }

    split(ways){
        let result = [];
        const new_length = Math.floor(this.number_of_cards / ways);
        let count = 0;
        let index = 0;
        while(count < ways){
            count++;
            result.push(this.cards.slice(index, index += new_length));
        }
        return result;
    }

    pop(index = 0){
        return this.cards.splice(index, 1)[0];
    }

    shuffle_in(card){
        const index = Math.floor(Math.random() * this.number_of_cards);
        this.cards.splice(index, 0, card);
    }
}

class Card{
    constructor(suit, value){
        this.suit = suit;
        this.value = value;
    }

    color(){
        return this.suit === '♥' || this.suit ===  '♦' ? 'red' : 'black'
    }

    get_html(){
        let div = document.createElement('div');
        div.className = "card";
        div.classList.add(this.color());
        div.setAttribute('data-value', this.value + ' ' + this.suit);
        div.innerHTML = this.suit;
        return div
    }

    compare(card, comparison = (a, b)=>{return a > b}){
        const index1 = CARD_VALUES.indexOf(this.value);
        const index2 = CARD_VALUES.indexOf(card.value);
        console.log(CARD_VALUES);
        console.log(`${index1}, ${index2}`);
        return comparison(index1, index2);
    }
}

function fresh_deck(){
    return SUITS.flatMap(suit=>{
        return CARD_VALUES.map(value=>{
            return new Card(suit, value);
        });
    });
}
