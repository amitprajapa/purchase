/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/* global Function, title */



Function.prototype.inheritsFrom = function (parentClassOrObject) {
    if (parentClassOrObject.constructor === Function)
    {
        //Normal Inheritance 
        this.prototype = new parentClassOrObject;
        this.prototype.constructor = this;
        this.prototype.parent = parentClassOrObject.prototype;
    } else
    {
        //Pure Virtual Inheritance 
        this.prototype = parentClassOrObject;
        this.prototype.constructor = this;
        this.prototype.parent = parentClassOrObject;
    }
    return this;
};


function Field() {

    this.id;
    this.name;
    this.value;
    this.dom;
    this.name;

    this.setName = function (pName) {
        this.name = pName;
    };

    this.getName = function () {
        return this.name;
    };

    this.setDom = function (pDom) {
        this.dom = pDom;
    };

    this.getDom = function () {
        this.dom = $("#" + this.id);
        return this.dom;
    };

    this.setId = function (pId) {
        this.id = pId;
    };

    this.getId = function () {
        return this.id;
    };

    this.getValue = function () {
        if (this.getDom()) {
            this.value = this.getDom().val();
        }
        return this.dom.val();
    };

    this.setValue = function (pValue) {
        if (this.getDom()) {
            this.value = this.getDom().val(pValue);
        } else {
            this.value = pValue;
        }
    };

}

function Text() {



}

Text.inheritsFrom(Field);

function Radio() {
    this.radioGroupMembers = [this];
    this.memberId = this.getId();

    this.addRadioAsGroupMember = function (radioField) {
        this.radioGroupMembers.push(radioField);
    };

    this.getGroupName = function () {
        return this.getName();
    };

    this.getValue = function () {
        var radioDom;
        var value = '';
        for (var key in this.radioGroupMembers) {
            if (this.radioGroupMembers.hasOwnProperty(key)) {
                radioDom = this.radioGroupMembers[key].getDom();
                if (radioDom && radioDom.prop('checked') === true) {
                    value = radioDom.val();
                    break;
                }
            }
        }
        return value;
    };

    this.setValue = function (value) {
        var radio;
        if (value === '') {
            for (var key in this.radioGroupMembers) {
                if (this.radioGroupMembers.hasOwnProperty(key)) {
                    radio = this.radioGroupMembers[key];
                    if (radio.getId() === this.getGroupName() && radio.getDom()) {
                        radio.getDom().prop('checked', true);
                        break;
                    }
                }
            }
            return;
        }
        for (var key in this.radioGroupMembers) {
            if (this.radioGroupMembers.hasOwnProperty(key)) {
                radioDom = this.radioGroupMembers[key].getDom();
                if (radioDom && radioDom.val() === value) {
                    radioDom.prop('checked', true);
                    break;
                }
            }
        }
    };

    this.setDisabled = function (isDisabled) {
        var radioDom;
        for (var key in this.radioGroupMembers) {
            if (this.radioGroupMembers.hasOwnProperty(key)) {
                radioDom = this.radioGroupMembers[key].getDom();
                if (radioDom) {
                    radioDom.attr('disabled', 'disabled');
                }
            }
        }
    };

}
;

Radio.inheritsFrom(Field);


function DropDown() {
    this.queryCode;

    this.setQueryCode = function (pQueryCode) {
        this.queryCode = pQueryCode;
    };

    this.getQueryCode = function () {
        return this.queryCode;
    };

    this.addOption = function (pObj) {
        this.getDom().append($('<option>', {
            value: pObj.value,
            text: pObj.text
        }));
        this.getDom().append('<i>');
    };

    this.loadValue = function () {
        //call Ajax; 
        //get Value by executing Query
        //Call this.addOption  
        var _this = this;
        var url = localStorage.getItem("url") + "QueryHelperController";
        var lAjax = new FormAjax();
        lAjax.setUrl(url);
        lAjax.setSync(true);
        lAjax.setData({QueryCode: this.getQueryCode()});
        lAjax.addEventListener('success', function (response) {
            var dataArr = JSON.parse(response);
            for (var x in dataArr) {
                _this.addOption(dataArr[x]);
            }
        });
        lAjax.addEventListener('error', function (textStatus, errorThrown) {
            console.log("Error : " + textStatus + " - " + errorThrown);
        });
        lAjax.execute();
    };
}

DropDown.inheritsFrom(Field);

function CheckBox() {
    this.setValue = function (value) {
        if (value === "Y") {
            this.getDom().prop('checked', true);
        } else if (value === "N" || value === "") {
            this.getDom().prop('checked', false);
        } else if (value === this.getDom().attr('value')) {
            this.getDom().prop('checked', true);
        }
    };

    this.getValue = function () {
        if (this.getDom() && this.getDom().is(':checked')) {
            if (this.getDom().attr('value') === '') {
                return 'Y';
            } else {
                return this.getDom().attr('value');
            }
        } else {
            return 'N';
        }
    };
}

CheckBox.inheritsFrom(Field);

function Form() {

    this.fieldSeqArray = new Array();
    this.fieldMap = [];
    this.jsonData = "";
    this.responseData;
    this.data = {};

    this.setResponseData = function (responseData) {
        this.responseData = responseData;
    };

    this.getResponseData = function () {
        return this.responseData;
    };

    //this.fieldHashTable = new Hashtable();

    this.buildForm = function (pId) {
        this.fieldSeqArray = new Array();
        this.fieldMap = {};
        var input = $("#" + pId + " input");
        var select = $("#" + pId + " select");
        var textarea = $("#" + pId + " textarea");
        this.buildInput(input);
        this.buildSelect(select);
        this.buildTextArea(textarea);
    };

    this.buildField = function (pField, pDom) {
        if (pField) {
            var pFieldId = pDom.attr('id');
            var pFieldName = pDom.attr('name');
            pField.setId(pFieldId);
            pField.setDom(pDom);
            pField.setName(pFieldName);
            this.fieldSeqArray.push(pField);
            this.fieldMap[pFieldId] = pField;
        }
    };

    this.buildSelect = function (pInput) {
        var that = this;
        $.each(pInput, function (index, object) {
            var lField;
            var lType = $(this).attr('type');
            lField = new DropDown();
            that.buildField(lField, $(this));
        });
    };

    this.buildInput = function (pInput) {
        var that = this;
        $.each(pInput, function (index, object) {
            var lField;
            var lType = $(object).attr('type');
            if (lType === 'text') {
                lField = new Text();
            } else if (lType === 'hidden') {
                lField = new Text();
            } else if (lType === 'radio') {
                lField = new Radio();
            } else if (lType === 'checkbox') {
                lField = new CheckBox();
            } else if (lType === 'datetime-local') {
                lField = new Text();
            } else if (lType === 'email') {
                lField = new Text();
            } else if (lType === 'date') {
                lField = new Field();
            }
            that.buildField(lField, $(object));
        });
    };

    this.buildTextArea = function (pInput) {
        var that = this;
        $.each(pInput, function (index, object) {
            var lField;
            lField = new Text();
            that.buildField(lField, $(object));
        });
    };


    this.getFieldById = function (pId) {
        return this.fieldMap[pId];
    };

    this.groupRadios = function (radioField) {
        var formField;
        for (var key in this.fieldArray) {
            if (this.fieldArray.hasOwnProperty(key)) {
                formField = this.fieldArray[key];
                if (formField && formField.getType() === 'RADIO' && radioField.getName() === formField.getName()) {
                    radioField.addRadioAsGroupMember(formField);
                    formField.addRadioAsGroupMember(radioField);
                }
            }
        }
    };

    this.buildJSON = function () {
        //var lData = new Object();
        for (var i = 0; i < this.fieldSeqArray.length; i++) {
            var lField = this.fieldSeqArray[i];
            this.data[lField.getId()] = lField.getValue();
        }
    };

    this.getJSON = function () {
        this.buildJSON();
        return this.data;
    };


    this.loadJSON = function () {
        for (var i = 0; i < this.fieldSeqArray.length; i++) {
            var lField = this.fieldSeqArray[i];
            if (lField.getId() !== 'beanName' && lField.getId() !== "entityName") {
                lField.setValue(this.jsonData[lField.getId()]);
            }
        }
    };

    this.save = function (pData, callback) {
        //document.getElementById("img").style.visibility = "visible";
        var lUrl = localStorage.getItem("url") + "formSave";
        var lData = pData;
        if (!pData) {
            lData = this.getJSON();
        }
        var json = $.extend(this.jsonData, lData);
        //console.log(json); 
        var _this = this;
        json = JSON.stringify(json);
        var lAjax = new FormAjax();
        lAjax.setUrl(lUrl);
        lAjax.setData({beanName: lData.beanName, entityName: lData.entityName, action: "save", json: json});
        lAjax.addEventListener('success', function (response) {
//            console.log(response);
//            var res = JSON.parse(response);
            _this.jsonData = JSON.parse(response);
            if (_this.jsonData.flag === true)
            {
                if (callback && typeof callback === "function")
                {
                    callback(_this.jsonData);
                } else {
                    smallAlert("Saved successfully", function () {
                        location.reload();
                    }, 2000);

                }
            } else if (_this.jsonData.flag === false)
            {
                smallAlert("Save operation failed", function () {
                    location.reload();
                }, 2000);
            }
        });
        lAjax.addEventListener('error', function (textStatus, errorThrown) {
            console.log("Error : " + textStatus + "" + errorThrown);
            document.getElementById("img").style.visibility = "hidden";
            document.getElementById("statusMessage").innerHTML = textStatus;

        });
        lAjax.execute();
    };


    this.view = function (pID, callback, callback1)
    {
        var url = localStorage.getItem("url") + "FormServlet";
        var entityName = form.getFieldById("entityName").getValue();
        var beanName = form.getFieldById("beanName").getValue();
        var _this = this;
        var lAjax = new FormAjax();
        lAjax.setUrl(url);
        lAjax.setData({action: "view", entityName: entityName, pid: pID, beanName: beanName});
        lAjax.addEventListener('success', function (response) {
            var data = JSON.parse(response).data;
            _this.jsonData = JSON.parse(data);
            _this.loadJSON();

            if (callback && typeof callback === "function")
            {
                callback();
            }
            if (callback1 && typeof callback1 === "function")
            {
                callback1(_this.jsonData);
            }

        });
        lAjax.addEventListener('error', function (textStatus, errorThrown) {
            alert("Error : " + textStatus + " - " + errorThrown);
        });
        lAjax.execute();
    };

    this.delete = function ()
    {
        var url = localStorage.getItem("url") + "FormServlet";
        var entityName = document.getElementById("entityName").value;
        var beanName = document.getElementById("beanName").value;
        var lData = this.getJSON();
        var json = JSON.stringify(lData);
        var lAjax = new FormAjax();
        lAjax.setUrl(url);
        lAjax.setData({beanName: beanName, entityName: entityName, action: "delete", json: json});
        lAjax.addEventListener('success', function (response) {
            console.log(response);
            var res = JSON.parse(response);
            if (res.flag === true)
            {
                document.getElementById("img").style.visibility = "hidden";
                document.getElementById("statusMessage").innerHTML = "<font color='green>'<b>Deleted successfull</b></font>";
            } else
            {
                document.getElementById("img").style.visibility = "hidden";
                document.getElementById("statusMessage").innerHTML = "<font color='red'><b>Not Deleted.</b></font>";
            }
        });
        lAjax.addEventListener('error', function (textStatus, errorThrown) {
            console.log("Error : " + textStatus + "" + errorThrown);
            document.getElementById("img").style.visibility = "hidden";
            document.getElementById("statusMessage").innerHTML = textStatus;
        });
        lAjax.execute();
    };


    this.update = function (callback, flag)
    {
        var url = localStorage.getItem("url") + "FormServlet";
        var entityName = document.getElementById("entityName").value;
        var beanName = document.getElementById("beanName").value;
        var lData = this.getJSON();
        var json = JSON.stringify(lData);
        console.log(json);
        var lAjax = new FormAjax();
        lAjax.setUrl(url);
        lAjax.setData({beanName: beanName, entityName: entityName, action: "update", json: json});
        lAjax.addEventListener('success', function (response) {
            console.log(response);
            var res = JSON.parse(response);
            if (res.flag === true)
            {
                document.getElementById("img").style.visibility = "hidden";
                document.getElementById("statusMessage").innerHTML = "<font color='green'><b>Updated successfull</b></font>";
                if (callback && typeof callback === "function")
                {
                    callback(flag);
                }
            } else
            {
                document.getElementById("img").style.visibility = "hidden";
                document.getElementById("statusMessage").innerHTML = "<font color='red'><b>Update operation failed</b></font>";
            }
        });
        lAjax.addEventListener('error', function (textStatus, errorThrown) {
            console.log("Error : " + textStatus + "" + errorThrown);
            document.getElementById("img").style.visibility = "hidden";
            document.getElementById("statusMessage").innerHTML = textStatus;
        });
        lAjax.execute();
    };

}
;

function getParameter(name, url) {
    if (!url)
        url = location.href;
    name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
    var regexS = "[\\?&]" + name + "=([^&#]*)";
    var regex = new RegExp(regexS);
    var results = regex.exec(url);
    return results === null ? null : results[1];
}



var form = new Form();


function smallAlert(pMessage, pCallBack, pTimeOut) {
    if (pTimeOut)
        pTimeOut = 3000;
    $.smallBox({
        title: pMessage,
        content: "<i class='fa fa-clock-o'></i> <i>" + pMessage + "...</i>",
        color: "#739E73",
        iconSmall: "fa fa-thumbs-up bounce animated",
        timeout: pTimeOut
    }, function () {
        pCallBack();
    });
}
function smallAlertFailure(pMessage, pCallBack, pTimeOut) {
    if (pTimeOut)
        pTimeOut = 3000;
    $.smallBox({
        title: pMessage,
        content: "<i class='fa fa-clock-o'></i> <i>" + pMessage + "...</i>",
        color: "##C94C4C",
        iconSmall: "fa fa-thumbs-down bounce animated",
        timeout: pTimeOut
    }, function () {
        pCallBack();
    });
}

function sweetAlertTimeOut(title, message, status, timer, pCallBack) {
    swal({
        type: status,
        title: '<div style="padding-top:2%">' + title + '</div>',
        text: message,
        html: true,
        timer: timer,
        allowEscapeKey: false
    }, function () {
        pCallBack();
    });
}

function sweetAlertIcon(title, message, icon) {
    swal(title, message, icon);
}

function sweetAlertBtn(title, message, icon, button) {
    swal(title, message, icon, button);
}

function sweetAlertTitle(title, message) {
    swal(title, message);
}

function sweetAlertMsg(message) {
    swal(message);
}

function sweetAlertForCart(title, message, timer)
{
    swal({
        title: '<div style="padding-top:2%;color:#2a3f54">' + title + '</div>',
        text: '<div style="padding-top:2%;color:#e5751a">' + message + '</div>',
        html: true,
        timer: timer,
        showConfirmButton: false,
        imageUrl: "img/avatars/emptycart.png"

    });
}

function sweetAlertForCreditSell(title, timer)
{
    swal({
        title: '<div style="padding-top:2%;color:#2a3f54">' + title + '</div>',
        html: true,
        timer: timer,
        showConfirmButton: true
//        imageUrl: "img/avatars/emptycart.png",

    });
}

function sweetAlertWithTwoImages(title, message, timer, imagePath) {
//    debugger;
    swal({
        title: '<div style="padding-top:2%;color:#2a3f54">' + title + '</div>',
        type: 'success',
        text: '<div style="padding-top:2%;color:#e5751a">' + message + '</div>',
        html: true,
        timer: timer,
        showConfirmButton: false,
//        imageUrl: "DisplayImage?path=/home/Prepaid/Images/" + imagePath
        imageUrl: "DisplayImage?path=/Users/Dhamani/NetBeansProjects/PreparedSolutions/prepaid/prepaid/Images" + imagePath
    });
}

function sweetAlertForConfirmDelete(title,text,text1,pCallBack) {
    swal({
        title: title,
        text: text,
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#DD6B55",
        confirmButtonText: "Yes, Delete it!",
        cancelButtonText: "No, cancel please!",
        closeOnConfirm: false,
        closeOnCancel: false
    },
            function (isConfirm) {
                if (isConfirm) {
                    pCallBack();
                } else {
                    swal("Cancelled", text1, "error");

                }
            });
    }