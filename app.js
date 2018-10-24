//Budget controller 
let budgetController = (function() {
    
    let Expense = function(id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
    };

    let Income = function(id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
    };

    let data = {
        allItems: {
            exp: [],
            inc: []
        },
        totals: {
            exp: 0,
            inc: 0
        },
        budget: 0,
        percentage: -1
    };

    let calculateTotal = function(type) {
        //Loops over allItems and store the sum in totals
        let sum = 0;
        data.allItems[type].forEach(current => sum += current.value);
        data.totals[type] = sum;
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

        deleteItem(type, id) {

            //Create a new array with only the elements ID
            let ids = data.allItems[type].map(current => current.id);

            //Get the index of that ID element
            let index = ids.indexOf(id);

            //Delete the element based on its index
            if(index !== -1) {
                data.allItems[type].splice(index, 1);
            }
        },

        calculateBudget() {
            //Calculate income and expenses
            calculateTotal('inc');
            calculateTotal('exp');

            //Calculate the budget : income - expenses
            data.budget = data.totals.inc - data.totals.exp;

            //Calculate the percentage of income that we spent
            if(data.totals.inc > 0) {
                data.percentage = Math.round((data.totals.exp / data.totals.inc) * 100);
            } else {
                data.percentage = -1;
            }

            //Expense 100 and income 200, spent 50% = 100/200 = 0.5*100
        },

        getBudget() {
            return {
                budget: data.budget,
                totalInc: data.totals.inc,
                totalExp: data.totals.exp,
                percentage: data.percentage
            };
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
        expensesContainer: '.expenses__list',
        budgetLabel: '.budget__value',
        incomeLabel: '.budget__income--value',
        expensesLabel: '.budget__expenses--value',
        percentageLabel: '.budget__expenses--percentage',
        container: '.container'
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
                html = `<div class="item clearfix" id="inc-${obj.id}">
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
                html = `<div class="item clearfix" id="exp-${obj.id}">
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

        displayBudget(obj) {
            document.querySelector(DOMstrings.budgetLabel).textContent = obj.budget;
            document.querySelector(DOMstrings.incomeLabel).textContent = obj.totalInc;
            document.querySelector(DOMstrings.expensesLabel).textContent = obj.totalExp;
            
            if(obj.percentage > 0) {
                document.querySelector(DOMstrings.percentageLabel).textContent = obj.percentage + '%';
            } else {
                document.querySelector(DOMstrings.percentageLabel).textContent = '---';
            }
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

    let updateBudget = function() {
        //1. Calculate the budget
        budgetCtrl.calculateBudget();

        //2. Return the budget
        let budget = budgetCtrl.getBudget();

        //3. Display the budget on the UI
        UICtrl.displayBudget(budget);
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

    let ctrlDeleteItem = function(event) {
        let itemID = event.target.parentNode.parentNode.parentNode.parentNode.id;

        if(itemID) {
            let splitID = itemID.split('-');
            let type = splitID[0];
            //Parse the split string to int
            let ID = parseInt(splitID[1]);

            //1. Delete the item from the data structure
            budgetCtrl.deleteItem(type, ID);

            //2. Delete the item from the UI

            //3. Update and show the new budget
        }
    };

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

        document.querySelector(DOM.container).addEventListener('click', ctrlDeleteItem);

    };

    return {
        init() {
            console.log('Application started');
            UICtrl.displayBudget({
                budget: 0,
                totalInc: 0,
                totalExp: 0,
                percentage: -1
            });
            setupEventListeners();
        }
    }


}(budgetController, UIController));


controller.init();