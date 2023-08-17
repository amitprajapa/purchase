/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/* global Ext */

function FormAjax() {

    this.url = null;
    this.type = 'post';
    this.data = {};
    this.dataType = 'text';
    this.divId;
    this.model;
    this.sync = false;
    this.maskingText = '';
    var me = this;
 
    this.setData = function (pData) {
        this.data = pData;
    };

    this.getData = function () {
        return this.data;
    };

    this.setMaskingText = function (pMaskingText) {
        this.maskingText = pMaskingText;
    };


    this.setSync = function (pSync) {
        this.sync = pSync;
    };

    this.getSync = function () {
        return this.sync;
    };


    this.setUrl = function (pUrl) {
        this.url = pUrl;
    };

    this.setType = function (pType) {
        this.type = pType;
    };

    this.setDataType = function (pDataType) {
        this.dataType = pDataType;
    };

    this.setDivId = function (pDivId) {
        this.divId = pDivId;
    };

    this.eventListeners = new Array();


    this.addEventListener = function (eventName, fn) {
        this.eventListeners[eventName] = fn;
    };

    this.processResponse = function (responseObj, onOkClick) {
        if (responseObj && typeof responseObj === 'object') {
            if (responseObj.showMessage !== false && responseObj.showMessage || (!responseObj.success)) {
                Ext.Msg.show({
                    title: '',
                    msg: responseObj.message,
                    buttons: Ext.Msg.OK,
                    fn: function (buttonId) {
                        if (buttonId === "ok") {
                            if (onOkClick && typeof onOkClick === 'function')
                                onOkClick();
                        }
                    },
                    animateTarget: 'elId',
                    icon: (responseObj.success === true) ? Ext.window.MessageBox.INFO : Ext.window.MessageBox.ERROR
                });
                return true;
            } else {
                if (onOkClick && typeof onOkClick === 'function') {
                    onOkClick();
                }
            }
        }
        return false;
    };


    this.execute = function () {
        $(document).ajaxStart(function(){
            Pace.restart();
        });
        try {
            if (!this.model)
                this.model = new Modal();
        } catch (err) {
        }

        try {
            if (this.data === null)
                this.data = {};
            this.data = $.extend(this.data, {'SecurityNote': token});
        } catch (err) {

        }

        that = this;
        $.ajax({
            url: this.url,
            type: this.type,
            data: this.data,
            dataType: this.dataType,
            async: !this.sync,
            error: function (jqXHR, textStatus, errorThrown) {
                if (me.eventListeners['error']) {
                    me.eventListeners['error'](textStatus, errorThrown);
                }
            },
            beforeSend: function () {
                try {
                    //that.model.loadMask(that.maskingText, that.divId);
                    //tbd with pace Piyush
                } catch (err) {
                }

                if (me.eventListeners['beforeSend']) {
                    me.eventListeners['beforeSend']();
                }

            },
            complete: function (jqXHR, textStatus) {
                try {
                    //that.model.removeMask();
                    //tbd with pace  Piyush
                } catch (err) {
                }

                if (me.eventListeners['complete']) {
                    me.eventListeners['complete'](textStatus);
                }
            },
            success: function (responseText) {

                if (me.eventListeners['success']) {
                    me.eventListeners['success'](responseText);
                }
            }
        });

    };


}





