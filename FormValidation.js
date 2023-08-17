/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

function validateMobileNo(mobileNo)
{
    if (/^\d{10}$/.test(mobileNo)) {
        return true;
    } else {
        alert("Invalid number; must be ten digits");
        return false;
    }

}

function validateLength(value, length)
{
    if (value.length !== length) {
        alert("Please enter valid value");
        return false;
    } else
    {
        return true;
    }
}

function validateEmailID(email) {
//    debugger;
    var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    if (reg.test(email) === false)
    {
        document.getElementById("lEmailErrorMessage").innerHTML = "Invalid Email-Id";
        $("#emailId").val("");
        $("#emailId").focus();
        return false;
    }
    $("#lEmailErrorMessage").val("");
    return true;
}

function validateName(event)
{
    var charCode = (event.which) ? event.which : event.keyCode;
    if ((charCode < 65 || charCode > 90) & (charCode < 97 || charCode > 122)) {
        return false;
    } else {
        return true;
    }
}

function validateRequired(value)
{
    if (value.length > 0)
        return true;
    else
        return false;
}

function validateNumber(event) {
    var charCode = (event.which) ? event.which : event.keyCode;
    if ((charCode < 48 || charCode > 57)) {

        return false;
    } else {
        return true;
    }
}

function validateString(event) {
    debugger;
    var charCode = (event.which) ? event.which : event.keyCode;
    if ((charCode === 38 || charCode === 60 || charCode === 62 || charCode === 34 || charCode === 39 || charCode === 47)) {

        return false;
    } else {
        return true;
    }
}

function validateFloatNumber(event) {
//    debugger;
    var charCode = (event.which) ? event.which : event.keyCode;
    if ((charCode < 46 || charCode > 57 || charCode === 47)) {
        return false;
    } else {
        return true;
    }
}

function validateQuantity(event) {
    var charCode = (event.which) ? event.which : event.keyCode;
    if ((charCode < 48 || charCode > 57)) {
        return false;
    } else {
        return true;
    }
}

function validateFloatNumberWithSingleDot(t, event)
{
//    debugger;
    if ((event.which !== 46 || $(t).val().indexOf('.') !== -1) && (event.which < 48 || event.which > 57)) {
        //alert('hello');
        if ((event.which !== 46 || $(t).val().indexOf('.') !== -1)) {
//            alert('Multiple Decimals are not allowed');
        }
        event.preventDefault();
    }
    if (t.value.indexOf(".") > -1 && (t.value.split('.')[1].length > 1)) {
//        alert('Two numbers only allowed after decimal point');
        event.preventDefault();
    }
}

function validateAlphanumeric(event) {
    var charCode = (event.which) ? event.which : event.keyCode;
    if ((charCode > 47 && charCode <= 57) || (charCode > 64 && charCode <= 90) || (charCode > 96 && charCode <= 122)) {
        return true;
    } else {
        return false;
    }
}

function onlyNumbers(event) {
    if (event.type == "paste") {
        var clipboardData = event.clipboardData || window.clipboardData;
        var pastedData = clipboardData.getData('Text');
        if (isNaN(pastedData)) {
            event.preventDefault();

        } else {
            return;
        }
    }
    var keyCode = event.keyCode || event.which;
    if (keyCode >= 96 && keyCode <= 105) {
        // Numpad keys
        keyCode -= 48;
    }
    var charValue = String.fromCharCode(keyCode);
    if (isNaN(parseInt(charValue)) && event.keyCode != 8) {
        event.preventDefault();
    }
}