//Budget controller 
let budgetController = (function() {
    //TODO
}());


//UI Controller 
let UIController = (function() {
    //TODO
}());


//Global controller
let controller = (function(budgetCtrl, UICtrl) {

    //Function to follow DRY principle
    let ctrlAddItem = function() {
        //1. Get the field input data
    
        //2. Add item to the budget controller
    
        //3. Add item to the UI
    
        //4. Calculate the budget
    
        //5. Display the budget on the UI

        console.log('IT FUCKING WORKS');
    }

    document.querySelector('.add__btn').addEventListener('click', ctrlAddItem);

    document.addEventListener('keypress', function(event) {
        //keyCode 13 is the code for "Enter" key
        if(event.keyCode === 13 || event.which === 13) {
            ctrlAddItem();
        }
    });

}(budgetController, UIController));