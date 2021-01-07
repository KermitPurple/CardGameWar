import Deck from './deck.js'

const deck = new Deck();
deck.shuffle();
const lists_of_cards = deck.split(2);
const player_deck = new Deck(lists_of_cards[0]);
const computer_deck = new Deck(lists_of_cards[1]);
let in_round = false;
let player_card = null;
let computer_card = null;

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

function set_center_text(text){
    document.querySelector('.text').innerHTML = text;
}

function clear_cards(){
    document.querySelector('.computer_card_slot').innerHTML = '';
    document.querySelector('.player_card_slot').innerHTML = '';
}

function draw_cards(){
    if(player_card != null){
        if(player_card.compare(computer_card)){ // greater than
            player_deck.shuffle_in(player_card);
            player_deck.shuffle_in(computer_card);
            set_center_text("You win!")
        }else if(player_card.compare(computer_card, (a, b)=>{return a === b})){ // equal to
            player_deck.shuffle_in(player_card);
            computer_deck.shuffle_in(computer_card);
            set_center_text("Tie!")
        }else{ // less than
            computer_deck.shuffle_in(player_card);
            computer_deck.shuffle_in(computer_card);
            set_center_text("You lose!")
        }
        computer_card = null;
        player_card = null;
        clear_cards();
    }else{
        computer_card = computer_deck.pop();
        player_card = player_deck.pop();
        set_center_text("")
        update_card('.computer_card_slot', computer_card);
        update_card('.player_card_slot', player_card);
    }
    update_deck('.computer_deck', computer_deck.number_of_cards);
    update_deck('.player_deck', player_deck.number_of_cards);
}

document.addEventListener('click', draw_cards);
document.addEventListener('keydown', event=>{
    if(event.key === ' ')
        draw_cards();
});
