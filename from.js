function Validator(options){
    function validate(inputElement,rule){
        var errorElement = inputElement.parentElement.querySelector(options.errorSelector);
        var errorMessage = rule.test(inputElement.value);
             if(errorMessage){
                        errorElement.innerText = errorMessage;
                } else {
                        errorElement.innerText = '';
                }
    }
    // lay elements cuar form validate
    var formElement = document.querySelector(options.form);
    if(formElement){
        options.rules.forEach(rule => {
            var inputElement =  document.querySelector(rule.selector);
            if(inputElement){
                // xu ly truong hop blur ra khoi input
                inputElement.onblur = function(){
                    validate(inputElement,rule);
                }
                // xu ly truong hop khi nguoi dung nhap vao input
                inputElement.oninput = () => {
                    var errorElement = inputElement.parentElement.querySelector(options.errorSelecto);
                    errorElement.innerText = '';
                }
            }
        });
    }
}
// đinh nghĩa rules
// nguyên tắc chạy
Validator.isRequired = function(selector){
    return {
        selector:selector,
        test:(value)=> value.trim() ? undefined : 'Vui long nhập trường này'
    } 
}

Validator.isEmail = function(selector){  
    return {
        selector:selector,
        test:(value)=> {
            var regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ ;
            return regex.test(value) ? undefined : 'vui long nhap email'
        }
    } 
}
Validator.minLength = function(selector,min){  
    return {
        selector:selector,
        test:(value)=> {
            return value.length >= min ? undefined : `Vui lòng nhập tối thiểu ${min} ký tự`
        }
    } 
}