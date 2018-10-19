let budgetController = (function() {

    let x = 23;

    let add = function(a) {
        return x + a;
    }

    return {
        publicTest(b) {
            return add(b);
        }
    }
}());


let UIController = (function() {
    //TODO
}());


let controller = (function(budgetCtrl, UICtrl) {

    let z = budgetCtrl.publicTest(3);

    return {
        anotherPublic() {
            console.log(z);
        }
    }

}(budgetController, UIController));