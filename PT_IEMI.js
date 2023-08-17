
function onEmailTemplatePageLoad(bankid)
{
    var lAjax = new Ajax();
    lAjax.setUrl('../IEMI_RBL1/PTAjaxServlet');
    lAjax.setData({event: "GetEmailTemplate", bankid: bankid});
    lAjax.addEventListener('success', function (response) {
        var JSONObject = JSON.parse(response);
        var emailTemplate = JSONObject["EMAILTEMPLATE"];
        var bankId = JSONObject["BANKID"];
        CKEDITOR.instances.editor.setData("" + emailTemplate);
        document.getElementById("bankid").value = "" + bankId;
        alert(emailTemplate);
    });
    lAjax.addEventListener('error', function (textStatus, errorThrown) {
        alert("Error : " + textStatus + " - " + errorThrown);
    });
    lAjax.execute();
}

function onEmailTemplateSave(emailTemplate, bankId)
{
    var lAjax = new Ajax();
    lAjax.setUrl('../IEMI_RBL1/PTAjaxServlet');
    lAjax.setData({event: "updateEmailTemplate", txtEmailTemplate: emailTemplate, bankid: bankId});
    lAjax.addEventListener('success', function (response) {
        var JSONObject = JSON.parse(response);
        var status = JSONObject["status"];
        alert(status);
    });
    lAjax.addEventListener('error', function (textStatus, errorThrown) {
        alert(textStatus + 'Data not Updated ' + errorThrown);
    });
    lAjax.execute();
}

function getSMSsettingDetails(bankid)
{
    var lAjax = new Ajax();
    lAjax.setUrl('../IEMI_RBL1/PTAjaxServlet');
    lAjax.setData({event: "GetSmsTemplate", bankid: bankid});
    lAjax.addEventListener('success', function (response) {
        var JSONObject = JSON.parse(response);
        var OFFERINGSMS = JSONObject["OFFERINGSMS"];
        var CONFIRMATIONSMS = JSONObject["CONFIRMATIONSMS"];
        var REJECTIONSMS = JSONObject["REJECTIONSMS"];
        var SMSSETTINGID = JSONObject["SMSSETTINGID"];
        document.getElementById("txtOfferingSms").value = OFFERINGSMS;
        document.getElementById("txtConfirmationSms").value = CONFIRMATIONSMS;
        document.getElementById("txtRejectionSms").value = REJECTIONSMS;
        document.getElementById("smsid").value = SMSSETTINGID;
    });
    lAjax.addEventListener('error', function (textStatus, errorThrown) {
        alert("Error : " + textStatus + " - " + errorThrown);
    });
    lAjax.execute();
}

function updateSMSDetails(offsms, confsms, rejsms, smsid)
{
    var lAjax = new Ajax();
    lAjax.setUrl('../IEMI_RBL1/PTAjaxServlet');
    lAjax.setData({event: "updateSMSDetails", smsid: smsid
        , txtOfferingSms: offsms, txtConfirmationSms: confsms
        , txtRejectionSms: rejsms});

    lAjax.addEventListener('success', function (response) {
        var JSONObject = JSON.parse(response);
        var status = JSONObject["status"];
        alert(status);
    });
    lAjax.addEventListener('error', function (textStatus, errorThrown) {
        alert(textStatus + 'Data not Updated ' + errorThrown);
    });
    lAjax.execute();
}

function getSchedularSetting(bankid)
{
    var lAjax = new Ajax();
    lAjax.setUrl('../IEMI_RBL1/PTAjaxServlet');
    lAjax.setData({event: "GetCronSettings", bankid: bankid});
    lAjax.addEventListener('success', function (response) {
        var JSONObject = JSON.parse(response);
        var INPUTFILEJOB = JSONObject["INPUTFILEJOB"];
        var REPLYFILEJOB = JSONObject["REPLYFILEJOB"];
        var OUTFILEJOB = JSONObject["OUTFILEJOB"];
        var SMSGATEWAYJOB = JSONObject["SMSGATEWAYJOB"];
        var EMAILGATEWAYJOB = JSONObject["EMAILGATEWAYJOB"];
        var CRONID = JSONObject["CRONID"];
        document.getElementById("txtFileJob").value = INPUTFILEJOB;
        document.getElementById("txtOutJob").value = REPLYFILEJOB;
        document.getElementById("txtReplyJob").value = OUTFILEJOB;
        document.getElementById("txtSMSJob").value = SMSGATEWAYJOB;
        document.getElementById("txtEmailJob").value = EMAILGATEWAYJOB;
        document.getElementById("txtCronId").value = CRONID;
    });
    lAjax.addEventListener('error', function (textStatus, errorThrown) {
        alert("Error : " + textStatus + " - " + errorThrown);
    });
    lAjax.execute();
}


function updateCronDetails(CRONID, INPUTFILEJOB, REPLYFILEJOB, OUTFILEJOB, SMSGATEWAYJOB, EMAILGATEWAYJOB)
{
    var lAjax = new Ajax();
    lAjax.setUrl('../IEMI_RBL1/PTAjaxServlet');
    lAjax.setData({event: "updatecronDetails", CRONID: CRONID
        , INPUTFILEJOB: INPUTFILEJOB, REPLYFILEJOB: REPLYFILEJOB
        , OUTFILEJOB: OUTFILEJOB, SMSGATEWAYJOB: SMSGATEWAYJOB
        , EMAILGATEWAYJOB: EMAILGATEWAYJOB});

    lAjax.addEventListener('success', function (response) {
        var JSONObject = JSON.parse(response);
        var status = JSONObject["status"];
        alert(status);
    });
    lAjax.addEventListener('error', function (textStatus, errorThrown) {
        alert(textStatus + 'Data not Updated ' + errorThrown);
    });
    lAjax.execute();
}


function getLocationSetting(bankid)
{
    var lAjax = new Ajax();
    lAjax.setUrl('../IEMI_RBL1/PTAjaxServlet');
    lAjax.setData({event: "GetLocationSettings", bankid: bankid});
    lAjax.addEventListener('success', function (response) {
        var JSONObject = JSON.parse(response);
        var INFUTFILELOC = JSONObject["INFUTFILELOC"];
        var OUTFILELOC = JSONObject["OUTFILELOC"];
        var REPLYFILELOC = JSONObject["REPLYFILELOC"];
        var ZIPLOC = JSONObject["ZIPLOC"];
        var REPORTSLOC = JSONObject["REPORTSLOC"];
        var FAILURELOC = JSONObject["FAILURELOC"];
        var SMSLOC = JSONObject["SMSLOC"];
        var LOCID = JSONObject["LOCID"];
        document.getElementById("txtInputPath").value = INFUTFILELOC;
        document.getElementById("txtOutFilePath").value = OUTFILELOC;
        document.getElementById("txtReplyFilePath").value = REPLYFILELOC;
        document.getElementById("txtZipLoc").value = ZIPLOC;
        document.getElementById("txtReportLoc").value = REPORTSLOC;
        document.getElementById("txtFailureLoc").value = FAILURELOC;
        document.getElementById("txtSMSLoc").value = SMSLOC;
        document.getElementById("txtLOCID").value = LOCID;
    });
    lAjax.addEventListener('error', function (textStatus, errorThrown) {
        alert("Error : " + textStatus + " - " + errorThrown);
    });
    lAjax.execute();
}

function updateLocationDetails(locid, txtInputPath, txtOutFilePath, txtReplyFilePath, txtZipLoc,
        txtReportLoc, txtFailureLoc, txtSMSLoc)
{
    var lAjax = new Ajax();
    lAjax.setUrl('../IEMI_RBL1/PTAjaxServlet');
    lAjax.setData({event: "updateLocationDetails", locid: locid
        , txtInputPath: txtInputPath, txtOutFilePath: txtOutFilePath
        , txtReplyFilePath: txtReplyFilePath, txtZipLoc: txtZipLoc
        , txtReportLoc: txtReportLoc, txtFailureLoc: txtFailureLoc, txtSMSLoc: txtSMSLoc});

    lAjax.addEventListener('success', function (response) {
        var JSONObject = JSON.parse(response);
        var status = JSONObject["status"];
        alert(status);
    });
    lAjax.addEventListener('error', function (textStatus, errorThrown) {
        alert(textStatus + 'Data not Updated ' + errorThrown);
    });
    lAjax.execute();
}

function getEmails(bankid)
{
    var lAjax = new Ajax();
    lAjax.setUrl('../IEMI_RBL1/PTAjaxServlet');
    lAjax.setData({event: "GetEmails", bankid: bankid});
    lAjax.addEventListener('success', function (response) {
        alert("success");
    });
    lAjax.addEventListener('error', function (textStatus, errorThrown) {
        alert("Error : " + textStatus + " - " + errorThrown);
    });
    lAjax.execute();
}
