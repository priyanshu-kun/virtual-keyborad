
/*Globle variable declaration*/

var keyboard = $(".keyboard");
let keyboard_screen = $(".form-control");
let data_string = "";
let flag = true;
let newflag = true;
let btn_flag = true;


/*Hide keyboard and screen*/
$(".wrapper").fadeOut();

// create non Alphanumeric and numeric buttons


function createButtons(letter) {
    if (letter === " ") {
        return `<button style="padding-left: 200px; padding-right: 200px;" class="btn btn-primary btn-lg">${letter}</button>`
    }
    else {
        return `<button class="btn btn-primary btn-lg ">${letter}</button>`
    }
}


// Append non alphanumeric buttons into container 

function appendButtons() {
    keyboard.html("");
    let buttons = `qwertyuiopasdfghjklzxcvbnm${"\u2616"}${"\u2191"}, .${"\u23CE"}${"\u232B"}`.split("").map(createButtons).join("");
    // console.log(buttons)
    keyboard.html(buttons);

    // fire logic for normal buttons
    clickevent();
}


// create numeric and alphanumeric buttons

function createButtonsNewButtons(letter) {

    return `<button  class="btn btn-primary btn-lg ">${letter}</button>`;
}


// append (don't confuse by function name it is an appending function) alphanumeric and numeric buttons

function createAlphaNumericAndNumericButtons() {
    keyboard.html("");
    let buttons = `1234567890~!@#$%^&*()_+{}[];:\'\"<>/?\`${"\u2616"}${"\u23CE"}${"\u232B"}`.split("").map(createButtonsNewButtons).join("");
    // console.log(buttons)
    keyboard.html(buttons);

    // fire click event on numeric and alphanumric buttons
    clickevent();
}


/*Initilize stating buttons Like: non alphanumeric and numeric*/

(function () {
    appendButtons();
})()


// Update output screen

function InputScreen(characters) {
    data_string += characters;
    keyboard_screen.val(data_string);
}


//handle click event 


function clickevent() {

// select all buttons

    $(".btn").on("click", function (e) {
        // console.log(this)

// prevent screen of non characters buttons press

        if (e.target.innerHTML !== "\u232B" && e.target.innerHTML !== "\u23CE" && e.target.innerHTML !== "\u2191" && e.target.innerHTML !== "\u2616") {
            if (flag === true) {

                // without capslock
                InputScreen(e.target.innerHTML)
            }
            else {
                // with capslock
                InputScreen(e.target.innerHTML.toUpperCase())
            }


        }
        else if (e.target.innerHTML === "\u232B") {

        // performing backspace logic remove last character from output string

            // both are right way to remove last character
            // data_string = data_string.slice(0, -1); 

            data_string = data_string.substring(0, data_string.length - 1);
            keyboard_screen.val(data_string);
        }
        else if (e.target.innerHTML === "\u23CE") {

            // performing enter logic clear screen and show output message

            keyboard_screen.val("");
            data_string = "";
            $(".feedback").removeClass('d-none');
            setTimeout(() => {
                $(".feedback").addClass('d-none');
            }, 3000);
        }
        else if (e.target.innerHTML === "\u2191") {

            // capslock trigger logic add and remove background color with classes 

            if (flag === true) {
                this.classList.add('capslock');
                flag = false;
            }
            else {
                this.classList.remove('capslock');
                flag = true;
            }
        }
        else if (e.target.innerHTML === "\u2616") {
           
            // change keybord between alphanumeric and normal characters 

            if (newflag === true) {
               
                createAlphaNumericAndNumericButtons();
                newflag = false;
            }
            else {
               
                appendButtons();

                newflag = true;
            }

        }
    })
}


// show and hide wrapper btn


$(".wrapper_btn").on('click', function (e) {

    e.preventDefault();
    keyboard_screen.val("");
    if (btn_flag === true) {
        $(".wrapper_btn").html("Hide My keyboard and screen!")
        btn_flag = false;
    }
    else {
        $(".wrapper_btn").html("Show My keyboard and screen!")
        btn_flag = true;
    }

    // show and hide keyboard and screen logic

    $(".wrapper").fadeToggle(1000);
})