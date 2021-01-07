import Deck from './deck.js'

const deck = new Deck();
deck.shuffle();
const lists_of_cards = deck.split(2);
const player_deck = new Deck(lists_of_cards[0]);
console.log(player_deck);
const computer_deck = new Deck(lists_of_cards[1]);
console.log(computer_deck);

function update_card(class_name, card){
    console.log(card);
    const div = card.get_html();
    let card_slot = document.querySelector(class_name)
    if(card_slot.hasChildNodes())
        card_slot.innerHTML = '';
    card_slot.append(div);
}

function update_deck(class_name, number_of_cards){
    document.querySelector(class_name).innerHTML = number_of_cards;
}

function draw_cards(){
    update_card('.computer_card_slot', computer_deck.pop());
    update_deck('.computer_deck', computer_deck.number_of_cards);
    update_card('.player_card_slot', player_deck.pop());
    update_deck('.player_deck', player_deck.number_of_cards);
}

document.addEventListener('click', draw_cards);
document.addEventListener('keydown', event=>{
    if(event.key === ' ')
        draw_cards();
});
