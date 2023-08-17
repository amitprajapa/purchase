 function WorkflowTrade()

{
    this.data;
    this.url = localStorage.getItem("url") + "MinqroWorkflowAPI/routeBulk";
    this.message = "Request routed..";

    this.setData = function (pData) {
        this.data = pData;
    };

    this.getData = function () {
        return this.data;
    };

    this.getURL = function () {
        return this.url;
    };

    this.setMessage = function (pMessage) {
        this.message = pMessage;
    };

    this.getMessage = function () {
        return this.message;
    };

    this.route = function (callback = '') {
        var that = this;
        var lAjax = new Ajax();
        lAjax.setUrl(this.getURL());
        lAjax.setType("post");
        lAjax.setSync(true); //need to select records. hence made synchrono
        lAjax.setContentType('Application/json');
        var data = JSON.stringify(this.data);
        lAjax.setData(data);
        lAjax.addEventListener('success', function (response) {
            response = JSON.parse(response);
            //var opt = $("<option></option>").attr("value", res.DATA[i][0]);
            //alert("Lead Assigned");
//            $.smallBox({
//                title: that.getMessage(),
//                content: "<i class='fa fa-clock-o'></i> <i>" + that.getMessage() + "...</i>",
//                color: "#739E73",
//                iconSmall: "fa fa-thumbs-up bounce animated",
//                timeout: 2000
//            }, function () {
//
//                //window.location.hash = "ui/view/leads/AssignedToManager.html";
//                checkURL();
//            });
//            if ($('#modal').modal) {
//                $('#modal').modal('hide');
//            }
            if (callback) {
                callback(response);
            }
        });

        lAjax.addEventListener('error', function (textStatus, errorThrown) {
            console.log('error: ' + errorThrown + '\n Status: ' + textStatus);
            alert('error: ' + errorThrown + '\n Status: ' + textStatus);
        });
        lAjax.execute();
    };



}