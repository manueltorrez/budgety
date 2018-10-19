//Budget controller 
let budgetController = (function() {
    //TODO
}());


//UI Controller 
let UIController = (function() {

    let DOMstrings = {
        inputType: '.add__type',
        inputDescription: '.add__description',
        inputValue: '.add__value',
        inputBtn: '.add__btn'
    }
    
    return {
        getInput() {
            return {
                type: document.querySelector(DOMstrings.inputType).value, //Either income or expense
                description: document.querySelector(DOMstrings.inputDescription).value,
                value: document.querySelector(DOMstrings.inputValue).value,
            }
        },

        getDOMstrings() {
            return DOMstrings;
        }
    }

}());


//Global controller
let controller = (function(budgetCtrl, UICtrl) {

    let DOM = UICtrl.getDOMstrings();

    //Function to follow DRY principle
    let ctrlAddItem = function() {
        //1. Get the field input data
        let input = UIController.getInput();
        console.log(input);


        //2. Add item to the budget controller
    
        //3. Add item to the UI
    
        //4. Calculate the budget
    
        //5. Display the budget on the UI
    }

    document.querySelector(DOM.inputBtn).addEventListener('click', ctrlAddItem);

    document.addEventListener('keypress', function(event) {
        //keyCode 13 is the code for "Enter" key
        if(event.keyCode === 13 || event.which === 13) {
            ctrlAddItem();
        }
    });

}(budgetController, UIController));