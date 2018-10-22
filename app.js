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


//UI CONTROLLER
let UIController = (function() {

    let DOMstrings = {
        inputType: '.add__type',
        inputDescription: '.add__description',
        inputValue: '.add__value',
        inputBtn: '.add__btn',
        incomeContainer: '.income__list',
        expensesContainer: '.expenses__list'
    }
    
    return {
        getInput() {
            return {
                type: document.querySelector(DOMstrings.inputType).value, //Either inc or exp
                description: document.querySelector(DOMstrings.inputDescription).value,
                value: parseFloat(document.querySelector(DOMstrings.inputValue).value)
            }
        },

        addListItem(obj, type) {
            //Create HTML string and replace placeholder text with actual data
            let html;
            let element;
            if(type === 'inc') {
                element = DOMstrings.incomeContainer;
                html = `<div class="item clearfix" id="income-${obj.id}">
                <div class="item__description">${obj.description}</div>
                <div class="right clearfix">
                    <div class="item__value">${obj.value}</div>
                    <div class="item__delete">
                        <button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button>
                    </div>
                </div>
                </div>`;
            } else if(type === 'exp') {
                element = DOMstrings.expensesContainer;
                html = `<div class="item clearfix" id="expense-${obj.id}">
                <div class="item__description">${obj.description}</div>
                <div class="right clearfix">
                    <div class="item__value">${obj.value}</div>
                    <div class="item__percentage">21%</div>
                    <div class="item__delete">
                        <button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button>
                    </div>
                </div>
                </div>`;

            }

            //Insert the HTML into the DOM
            document.querySelector(element).insertAdjacentHTML('beforeend', html);
        },

        clearFields() {
            //Select "description" and "value" inputs
            let fields = document.querySelectorAll(DOMstrings.inputDescription + ', ' + 
            DOMstrings.inputValue);

            //Loop over the NodeList to clear the input values
            fields.forEach(element => {
                element.value = '';
            });
            
        },

        getDOMstrings() {
            return DOMstrings;
        }
    }

}());


//GLOBAL CONTROLLER
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

    let updateBudget = function() {
        //1. Calculate the budget
        
        //2. Return the budget

        //3. Display the budget on the UI
    };


    //Function to follow DRY principle
    let ctrlAddItem = function() {
        //1. Get the field input data
        let input = UIController.getInput();

        if(input.description !== "" && !isNaN(input.value) && input.value > 0) {

            //2. Add item to the budget controller
            let newItem = budgetCtrl.addItem(input.type, input.description, input.value);
    
            //3. Add item to the UI
            UICtrl.addListItem(newItem, input.type);
    
            //4. For clear the fields
            UICtrl.clearFields();
    
            //5. Calculate and update budget
            updateBudget();
        }

    };

    return {
        init() {
            console.log('Application started');
            setupEventListeners();
        }
    }


}(budgetController, UIController));


controller.init();