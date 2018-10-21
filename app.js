//Budget controller 
let budgetController = (function() {
    
    let Expense = function(id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
    }

    let Income = function(id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
    }

    let data = {
        allItems: {
            exp: [],
            inc: []
        },
        totals: {
            exp: 0,
            inc: 0
        }
    }

    return {
        addItem(type, des, val) {
            let newItem, ID;
            //ID = last ID + 1
            //Create new ID
            if(data.allItems[type].length > 0) {
                ID = data.allItems[type][data.allItems[type].length - 1].id + 1;
            } else {
                ID = 0;
            }

            //Create new item based on 'inc' or 'exp' type
            if(type === 'exp') {
                newItem = new Expense(ID, des, val);
            } else if(type === 'inc') {
                newItem = new Income(ID, des, val);
            }

            //Push the item into data structure
            data.allItems[type].push(newItem);

            //Return new element
            return newItem;
        },
        
        testing() {
            console.log(data);
        }
    }

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
                type: document.querySelector(DOMstrings.inputType).value, //Either inc or exp
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

    //Wraping all eventListeners in a function
    let setupEventListeners = function() {
        
        let DOM = UICtrl.getDOMstrings();
        
        document.querySelector(DOM.inputBtn).addEventListener('click', ctrlAddItem);
    
        document.addEventListener('keypress', function(event) {
            //keyCode 13 is the code for "Enter" key
            if(event.keyCode === 13 || event.which === 13) {
                ctrlAddItem();
            }
        });

    };


    //Function to follow DRY principle
    let ctrlAddItem = function() {
        //1. Get the field input data
        let input = UIController.getInput();

        //2. Add item to the budget controller
        let newItem = budgetCtrl.addItem(input.type, input.description, input.value);
        //3. Add item to the UI
    
        //4. Calculate the budget
    
        //5. Display the budget on the UI
    };

    return {
        init() {
            console.log('Application started');
            setupEventListeners();
        }
    }


}(budgetController, UIController));


controller.init();