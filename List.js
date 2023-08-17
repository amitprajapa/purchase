
/**
 * This class is for generating the datatable list in
 * attribute list and custom data type section.
 *
 * @class List
 * @constructor
 */


var url = `${localStorage.getItem("url") || ''}listView`;



function SearchCriteria() {

    this.field;
    this.operator;
    this.value;
    this.column;

    this.setColumn = function (pColumn) {
        this.column = pColumn;
    };

    this.getColumn = function () {
        return this.column;
    };

    this.setField = function (pField) {
        this.field = pField;
    };
    this.getField = function () {
        return this.field;
    };

    this.setOperator = function (pOperator) {
        this.operator = pOperator;
    };
    this.getOperator = function () {
        return this.operator;
    };

    this.setValue = function (pValue) {
        this.value = pValue;
    };
    this.getValue = function () {
        return this.value;
    };
}

function SearchParam() {
    this.index;
    this.value;
    this.type;

    this.setIndex = function (pIndex) {
        this.index = pIndex;
    };

    this.getIndex = function () {
        return this.index;
    };

    this.setValue = function (pValue) {
        this.value = pValue;
    };

    this.getValue = function () {
        return this.value;
    };

    this.getJSON = function () {
        var lObject = new Object();
        lObject.index = this.index;
        lObject.value = this.value;
        lObject.type = this.type;
    };
}

function List() {
    var debugState = false;
    this.criteria = null;
    this.searchCriteria = [];
    this.searchParam = [];
    this.viewCode = null;
    this.dataUrl = '';
    this.headerUrl = '';
    this.targetNode = '';
    this.gridParams = "[]";
    this.rowSelectable = false;
    this.isServerSidePaging = true;
    this.columnFilterable = false;
    this.rowsSelected = null;
    this.dataTable = null;
    this.columns = null;
    this.pageSize = 10;
    this.pickDataFn = null;
    this.isPicklist = true;
    this.multiple = true;
    this.isServerSideData = true;
    this.picklistData = null;
    this.picklistColumns = null;
    this.selectionInfo = null;
    this.searchable = true;
    this.isSelectable = false;
    this.isMultiselect = false;
    this.SelectAll = false;
    this.events = [];
    this.url = `${localStorage.getItem("url") || ''}listView`;

    this.postRendering = function () {

    };
    this.setSearchParam = function (pSearchParam) {
        this.searchParam = pSearchParam;
    };

    this.getSearchParam = function () {
        return this.searchParam;
    };

    this.init = function () {
        this.rowsSelected = new Set();
    };
    this.setColumns = function (pColsArray) {
        if (pColsArray) {
            this.columns = pColsArray;
        }

    };
    this.getColumns = function () {
        return this.columns;
    };
    this.setSearchable = function (bool) {
        this.searchable = bool;
    };
    
    /**
     * This method sets view code
     * of table to display.
     *
     * @method setViewCode
     * @param {String} viewId
     */
    this.setViewCode = function (pViewCode) {
        this.viewCode = pViewCode;
    };
    /**
     * This method gets view code
     * of table to display.
     *
     * @method getViewCode
     */
    this.getViewCode = function () {
        return this.viewCode;
    };
    /**
     * This method setDataUrl url
     *
     * @method setDataUrl
     * @param {dataUrl}
     */
    this.setDataUrl = function (dataUrl) {
        this.dataUrl = dataUrl;
    };
    /**
     * This method gets data url
     *
     * @method getDataUrl
     */
    this.getDataUrl = function () {
        return this.dataUrl;
    };
    /**
     * This method sets url header.
     *
     * @method setHeaderUrl
     * @param {String} headerUrl
     */
    this.setHeaderUrl = function (headerUrl) {
        this.headerUrl = headerUrl;
    };
    /**
     * This method gets header url.
     *
     * @method getHeaderUrl
     */
    this.getHeaderUrl = function () {
        return this.headerUrl;
    };
    /**
     * This method sets target node
     * of table to display.
     *
     * @method setTargetNode
     * @param {String} node
     */
    this.setTargetNode = function (node) {
        this.targetNode = node;
    };
    /**
     * This method gets target node.
     *
     * @method getTargetNode
     */
    this.getTargetNode = function (divId) {
        return this.targetNode;
    };
    this.setCriteria = function (criteria) {
        this.criteria = criteria;
    };
    this.getCriteria = function () {
        return this.criteria;
    };
    /**
     * This method sets grid parameters.
     *
     * @method setGridParams
     * @param {Object} gridParams
     */
    this.setGridParams = function (gridParams) {
        this.gridParams = gridParams;
    };
    /**
     * This method gets grid parameters.
     *
     * @method getGridParams
     */
    this.getGridParams = function () {
        return this.gridParams;
    };
    /**
     * This method sets selectable row.
     *
     * @method setRowSelectable
     * @param {selectable}
     */
    this.setRowSelectable = function (selectable) {
        this.rowSelectable = selectable;
    };
    /**
     * This method checks if row selectable.
     *
     * @method isRowSelectable
     */
    this.isRowSelectable = function () {
        return this.rowSelectable;
    };
    
    /**
     * This method sets server paging.
     *
     * @method setServerPaging
     * @param {isServerSidePaging}
     */
    this.setServerPaging = function (pIsServerSidePaging) {
        this.isServerSidePaging = pIsServerSidePaging;
    };
    /**
     * This method checks for server paging.
     *
     * @method isServerPaging
     */
    this.isServerPaging = function () {
        return this.isServerSidePaging;
    };
    /**
     * This method sets column filter.
     *
     * @method setColumnFilter
     * @param {columnFilter}
     */
    this.setColumnFilter = function (columnFilter) {
        this.columnFilterable = columnFilter;
    };
    /**
     * This method checks for column filter.
     *
     * @method hasColumnFilter
     */
    this.hasColumnFilter = function () {
        return this.columnFilterable;
    };
    /**
     * This method sets page size.
     *
     * @method setPageSize
     * @param {pageSize}
     */
    this.setPageSize = function (pageSize) {
        this.pageSize = pageSize;
    };
    /**
     * This method gets page size.
     *
     * @method getPageSize
     */
    this.getPageSize = function () {
        return this.pageSize;
    };
    /**
     * This method sets if picklist data function.
     *
     * @method setPickDataFn
     * @param {pickDataFn}
     */
    this.setPickDataFn = function (pickDataFn) {
        this.pickDataFn = pickDataFn;
    };
    /**
     * This method gets picklist data function.
     *
     * @method getPickDataFn
     */
    this.getPickDataFn = function () {
        return this.pickDataFn;
    };
    /**
     * This method sets if picklist.
     *
     * @method setIsPicklist
     * @param {isPicklist}
     */
    this.setIsPicklist = function (isPicklist) {
        this.isPicklist = isPicklist;
    };
    /**
     * This method checks if picklist data.
     *
     * @method getIsPicklist
     */
    this.getIsPicklist = function () {
        return this.isPicklist;
    };
    /**
     * This method sets multiple records.
     *
     * @method setMultiple
     * @param {multiple}
     */
    this.setMultiple = function (multiple) {
        this.multiple = multiple;
    };
    /**
     * This method gets multiple records.
     *
     * @method getMultiple
     */
    this.getMultiple = function () {
        return this.multiple;
    };
    /**
     * This method sets if server side data.
     *
     * @method setIsServerSideData
     * @param {isServerSideData}
     */
    this.setIsServerSideData = function (isServerSideData) {
        this.isServerSideData = isServerSideData;
    };
    /**
     * This method gets and checks if server side data.
     *
     * @method getIsServerSideData
     */
    this.getIsServerSideData = function () {
        return this.isServerSideData;
    };
    /**
     * This method sets picklist data.
     *
     * @method setPicklistData
     * @param {picklistData}
     */
    this.setPicklistData = function (picklistData) {
        this.picklistData = picklistData;
    };
    /**
     * This method gets picklist data.
     *
     * @method displayRecords
     */
    this.getPicklistData = function () {
        return this.picklistData;
    };
    /**
     * This method sets picklist columns data.
     *
     * @method setPicklistColumns
     * @param {picklistColumns}
     */
    this.setPicklistColumns = function (picklistColumns) {
        this.picklistColumns = picklistColumns;
    };
    /**
     * This method gets all picklist columns in table
     *
     * @method getPicklistColumns
     */
    this.getPicklistColumns = function () {
        return this.picklistColumns;
    };

    this.setSearchCriteria = function (pSearchCriteria) {
        this.searchCriteria = pSearchCriteria;
    };

    this.getSearchCriteria = function () {
        return this.searchCriteria;
    };

    this.setCustomDropdown = function (dropdownhtml) {
        
    };
    /**
     * This method renders all records in table
     *
     * @method render
     */
    this.render = function () {
        this.rowsSelected = new Set();
        if (this.getIsPicklist() && !this.getIsServerSideData()) {
            this.displayRecords(null);
        } else {
//Get data from ajax. 
            var lAjax = new Ajax();
            if (this.getCriteria() === null || this.criteria === "")
            {
                this.setCriteria("-");
            }
            //lAjax.setUrl("@URL.Action('POST','listview')");
            lAjax.setType("post");
            lAjax.setUrl(this.url + '?type=metadata&code=' + this.getViewCode() + '&criteria=' + this.getCriteria() + '&searchCriteria=' + JSON.stringify(this.getSearchCriteria()));
            lAjax.setSync(true); //need to select records. hence made synchronous.
            var that = this;
            lAjax.addEventListener('success', function (response) {
                response = JSON.parse(response);
                that.displayRecords(response);
            });
            lAjax.addEventListener('error', function (textStatus, errorThrown) {
                console.log('error: ' + errorThrown + '\n Status: ' + textStatus);
            });
            lAjax.execute();
        }
    };
    /**
     * This method displays all records in table
     *
     * @method displayRecords
     * @param {records}
     */
    this.displayRecords = function (records) {
        var tr = document.createElement('tr');
        var that = this;
        var defs = [];
//index column definition

        var lCols;
        if (this.getIsPicklist() && !this.getIsServerSideData()) {
            lCols = this.getPicklistColumns();
        } else {
            if (records) {
                lCols = records.columns;
            }
        }
        if (records.pageSize) {
            this.setPageSize(parseInt(records.pageSize));
        }
//build column definitions

        for (var i in lCols) {
            var th = document.createElement('th');
            th.innerHTML = lCols[i].title;
            tr.appendChild(th);
            var def = {};
            def.data = lCols[i].dbColumn;
            if (lCols[i].dbColumn) {
                def.id = lCols[i].dbColumn;
            }

            if (lCols[i].type && lCols[i].type === 'DATE') {
                def.type = 'date';
                def.render = function (value) {
                    var x = new Date(Date.parse(value));
                    return (x.getMonth() + 1) + "/" + x.getDate() + "/" + x.getFullYear();
                };
            }

            if (lCols[i].width) {
                def.width = lCols[i].width;
            }

            if (lCols[i].sortable) {
                def.sortable = lCols[i].sortable;
            }

            if (lCols[i].hidden) {
                def.visible = lCols[i].hidden && lCols[i].hidden === 'Y' ? false : true;
            } else {
                def.visible = true;
            }


            if (lCols[i].jsFunction && !(typeof lCols[i].jsFunction === 'function')) {
                def.render = eval(lCols[i].jsFunction);
            }
            if (this.getIsPicklist() && i === 0) {
                var that = this;
                def.render = function (data, type, full, meta) {
                    var reqStr = '<a id="' + data + '">' + data + '<a>';
                    $('#' + data).on('click', function () {
                        if (that.pickDataFn && that.pickDataFn !== null) {
                            that.pickDataFn(data);
                        }
                    });
                    return reqStr;
                };
            }
            if ($("#data-table_length")) {
//                lCols[i].DBColumn;
                $("#data-table_length").append('<option value =' + lCols[i].DBColumn + '>' + lCols[i].DBColumn + '</option>');
            }
            defs.push(def);
        }
        this.setColumns(defs);
        var thead = document.createElement('thead');
        thead.className = "bg-warning-500";
        thead.appendChild(tr);
        var node = this.getTargetNode();
        node.appendChild(thead);
        var that = this;
        var lParam = {};
        var lSearchParam = this.getSearchParam();

        var lParamDataArray = new Array();

        for (var i = 0; i < lSearchParam.length; i++) {
            var lValue = lSearchParam[i];
            lParamDataArray.push(lValue);
        }

        var lCriteria = this.getCriteria();
        var lGridParams = JSON.stringify(lParamDataArray);

        var json = JSON.stringify(lParam);
        var lURL = this.url + "?type=data&code=" + this.getViewCode();
        lURL += "&criteria=" + lCriteria;
        lURL += "&gridParams=" + lGridParams;

        var config = {
//            "sDom": "" +
//                    "t" +
//                    "<'dt-toolbar-footer'<'col-sm-4 col-xs-12'i><'col-sm-3 col-xs-12 hidden-xs'l><'col-xs-12 col-sm-5'p>>",
            "autoWidth": false,
            "processing": true,
            "order": [],
            "responsive": true,
            "aLengthMenu": [[8, 10, 15, 25, 50, 100], [8, 10, 15, 25, 50, 100]],
            "serverSide": this.isServerPaging(),
            "columns": defs,
            "rowCallback": function (row, data, dataIndex) {
// If row ID is in the list of selected row IDs
                if (that.rowsSelected.has(data[0])) {
                    var c = row.querySelector('[data-row-id]');
                    c.checked = true;
                    row.classList.add('selected');
                }
            },
//"aLengthMenu": [[10, 25, 50, 75, 100], [10, 25, 50, 75, "All"]], //text & value array
            "iDisplayLength": that.getPageSize(),
            buttons: this.getButtons(),
            "language": {
                "search": ""
            }
        };
//Code for Selection plugin
        if (this.getSelectable()) {
            debugger;
            var lStyle = "single";
            if (this.getMultiSelect()) {
                lStyle = "multi";
            }
            ;
            var selectable = {
                style: lStyle
            };
            config.select = selectable;
        }
//end
        if (this.getIsPicklist() && !this.getIsServerSideData()) {
            config.data = this.getPicklistData();
        } else {
            if (this.getCriteria() === null || this.criteria === "")
            {
                this.setCriteria("-");
            }
            config.ajax = {
                "url": lURL,
                "type": "post",
//"url":  url + '?type=data&code=' + this.getViewCode(),
//"url": 'webServices/listWS/getGridData/' + this.getViewCode(),
//async: false, //to select records.
                "data": function (d) {
//                    d.gridParams = JSON.stringify(that.getGridParams());
                    d.gridParams = that.getGridParams();
                    d.searchCriteria = JSON.stringify(that.getSearchCriteria());
                }
            };
            config.drawCallback = function (settings) {
                var pageRecords = this.api().rows({page: 'current'}).data();
                that.ajaxCallBack(pageRecords);
                that.postRendering();
            };
        }

        config.bFilter = this.searchable;
        console.log('config=======', config);
                   
//initilize if doesn't exist.
        if ($.fn.dataTable.isDataTable(node)) {

//this.dataTable = $(node).DataTable();
            $(node).html('');
            $(node).DataTable().destroy();
            this.dataTable = $(node).DataTable(config);
        } else {
            this.dataTable = $(node).DataTable(config);
        }
//record selection handler
        this.handleRowSelection();

        if (debugState)
            console.debug($("#datatablefilter"));
        //Changed to search after enter keypress by Saurabh J.[19-JUN-2018|Start]
//        $("#datatable-filter").on('keypress', function (event) {
//            var key = event.which;
//            if(key == 13){
//                var code = localStorage.getItem("enqCode");
//                localStorage.setItem(code, $(this).val().trim());
//                that.dataTable.search($(this).val().trim()).draw();
//            }
//        });
        var filter = [];
//        $('#dt-basic-example_filter').tagit({
//            afterTagAdded: function (evt, ui) {
//
//                if (!ui.duringInitialization) {
//                    filter.push(ui.tagLabel);
//                    console.log(filter.toString());
//                    var code = localStorage.getItem("enqCode");
//                    localStorage.setItem(code, filter.toString());
//                    that.dataTable.search(filter.toString()).draw();
//                }
//            },
//            afterTagRemoved: function (evt, ui) {
//
//                var key = evt.which;
//                filter.pop(ui.tagLabel);
//                console.log(filter.toString());
//                var code = localStorage.getItem("enqCode");
//                localStorage.setItem(code, filter.toString());
//                that.dataTable.search(filter.toString()).draw();
//            }
//        });
        //Changed to search after enter keypress by Saurabh J.[19-JUN-2018|End]
        for (var o in this.events) {
            var event = this.events[o];
            this.dataTable.on(event.event, event.CallBack);
        }
        ;
        /*
         $('#datatable-filter').on('keyup', function () {
         var x = $("#data-table").DataTable();
         x.search($(this).val()).draw();
         });
         */

//show column filter
        if (this.hasColumnFilter()) {
//`this.addColumnFilter(node, this.dataTable);
        }

    };

    this.addEvent = function (pEvent, pCallBack) {
        this.events.push({'event': pEvent, 'CallBack': pCallBack})
    };

    this.ajaxCallBack = function (records) {

        if (!this.selectionInfo || !this.selectionInfo.data)//check if set using setSelectedRows.
            return;
        for (var i = 0; i < records.length; i++)
            for (var j = 0; j < this.selectionInfo.data.length; j++)
                if (records[i][this.selectionInfo.colNo] === this.selectionInfo.data[j][this.selectionInfo.attr]) {
//add record id to rows selected.
                    this.rowsSelected.add(records[i]);
//Pagination issue.
                    var checkbox = this.getTargetNode().querySelector('[data-row-id="' + records[i][0] + '"]');
                    if (checkbox) { //if checkbox is available on current page. if not later selection is done using rowsSelected
                        checkbox.checked = true;
                    }
                }
    };
    /**
     * This method deletes rows selected in table
     *
     * @method deleteSelectedRows
     */
    this.deleteSelectedRows = function () {
        for (var index = 0; index < this.rowsSelected.length; index++) {
//var id = this.dataTable.row(this.rowsSelected[index] - 1).data()[1];
//deleteJsonObj[''] =
        }
    };
    /**
     * This method gets rows selected in table
     *
     * @method getSelectedRows
     */
    this.getSelectedRows = function () {
        var selectedRecords = [];
        var that = this;
        if (this.rowsSelected.size !== 0) {
            this.rowsSelected.forEach(function (item) {
                selectedRecords.push(that.dataTable.row(item - 1).data());
            });
        }
        return selectedRecords;
    };
    /**
     * This method sets rows selected in table
     *
     * @method setSelectedRows
     * @param {data} The records selected
     * @param {colNo} Column number for matching.
     * @param {attr} The attribute used for comparision
     */
    this.setSelectedRows = function (data, colNo, attr) { //check selected records based data and column number.
        this.selectionInfo = {};
        this.selectionInfo.data = data;
        this.selectionInfo.colNo = colNo;
        this.selectionInfo.attr = attr;
    };
    /**
     * This method deletes rows selected in table
     *
     * @method deleteRow
     */
    this.deleteRow = function () {
        var that = this;
        this.rowsSelected.forEach(function (value) {
            var x = that.getTargetNode().querySelector('[data-row-id="' + value + '"]');
            $(x).closest('tr').remove();
        });
        var lAjax = new Ajax();
        lAjax.open('DELETE', '/records');
        lAjax.setRequestHeader("Content-Type", "application/json; charset=utf-8");
        var records = this.dataTable.rows().data();
        var dataSent = [];
        for (var i = 0; i < records.length; i++) {
            this.rowsSelected.forEach(function (value) {
                if (records[i][0] === value) {
                    var fRowData = that.formatRowData(records[i]);
                    dataSent.push(fRowData);
                }
            });
        }
        lAjax.send(JSON.stringify(dataSent));
    };
    /**
     * This method applies selected classes to rows selected in table
     *
     * @method updateSelectedArray
     * @param {tr}
     * @param {checkbox}
     */
    this.updateSelectedArray = function (tr, checkbox) {
        var data = this.dataTable.row(tr).data();
        var rowId = data[0];
        if (checkbox.checked === true && !this.rowsSelected.has(rowId)) { //add if doesn't exist
            this.rowsSelected.add(rowId);
        } else if (checkbox.checked !== 'true' && this.rowsSelected.has(rowId)) { //remove if exists
            this.rowsSelected.delete(rowId);
        }

        if (checkbox.checked === true) {
            tr.addClass('selected');
        } else {
            tr.removeClass('selected');
        }
    };
    /**
     * This method selects and handles Row Selection in table
     *
     * @method handleRowSelection
     */
    this.handleRowSelection = function (pCallBack) {
        var me = this;
        var node = this.getTargetNode();
        $(node).on('click', '[data-row-id]', function (e) {
            var $row = $(this).closest('tr');
            me.updateSelectedArray($row, this);
        });
        $(node).on('click', 'tr', function () {
            var $row = $(this).closest('tr');
            if (me.dataTable.row($row).data()) {
                var selectedRecord = me.formatRowData(me.dataTable.row($row).data());
                /*
                 if (forms.getCurrentForm() && selectedRecord) {
                 forms.getCurrentForm().setData({"selectedRowData": selectedRecord})
                 
                 }
                 */
                if (pCallBack) {
                    pCallBack(selectedRecord);
                }
            }
        });
    };
    /**
     * This method formats row data in table
     *
     * @method formatRowData
     * @param {pRowData}
     */
    this.formatRowData = function (pRowData) {
        if (pRowData && this.getColumns()) {
            var object = {};
            for (var index = 0; index < this.getColumns().length; index++) {
                if (this.getColumns()[index].id) {
                    object[this.getColumns()[index].id] = pRowData[index];
                }
            }
            return object;
        }
    };
    /**
     * This method searches for columns in table
     *
     * @method addColumnFilter
     * @param {node}
     * @param {dataTable}
     */
    this.addColumnFilter = function (node, dataTable) { //function to add column filter to datatable.

        var searchRow = document.createElement('tr');
        var td = document.createElement('td');
        searchRow.appendChild(td);
        var i = 0;
        for (i = 1; i < node.rows[0].cells.length; i++) {

            var searchBox = document.createElement('input');
            searchBox.type = 'search';
            searchBox.placeholder = 'Search ';
            searchBox.style.display = 'block';
            searchBox.style.marginTop = '0.5em';
//x = dataTable
            searchBox.addEventListener('keyup', function () {
                if (dataTable.search() !== this.value) {
                    console.log(this.value + ' ' + i);
                    dataTable.columns(i - 2).search(this.value).draw();
                }
            });
            var td = document.createElement('td');
            td.appendChild(searchBox);
            searchRow.appendChild(td);
        }
        node.tHead.appendChild(searchRow);
    };
    /**
     * This method selects all columns in table
     *
     * @method addSelectAllCheckbox
     * @param {headerRow}
     */
    this.addSelectAllCheckbox = function (headerRow) {
        debugger;
//for selectable row
        if (this.isRowSelectable()) {
            var th = document.createElement('th');
            th.classList.add('dt-body-center');
            var selectAllCheckbox = document.createElement('input');
            selectAllCheckbox.type = 'checkbox';
            th.appendChild(selectAllCheckbox);
            headerRow.appendChild(th);
            var that = this;
//select all checkboxes on click.
    selectAllCheckbox.addEventListener('click', function () {
    var checkboxes = that.getTargetNode().querySelectorAll('[data-row-id]');
    var selectAllState = this.checked;
    for (var j = 0; j < checkboxes.length; j++) {
        checkboxes[j].checked = selectAllState;
        var $row = $(checkboxes[j]).closest('tr');
        
        that.updateSelectedArray($row, checkboxes[j]);
        
        //selectAllCheckbox();
    }
});

//
//            selectAllCheckbox.addEventListener('click', function () {
//                var checkboxes = that.getTargetNode().querySelectorAll('[data-row-id]');
//                var selectAllState = this.checked;
//                for (var j in checkboxes) {
//                    checkboxes[j].checked = selectAllState;
//                     var th1 = document.createElement('th');
//                     th1.innerHTML = '<input type=checkbox> Select ALl';
//                     headerRow.appendChild(th1);
//                    
//                    var $row = $(checkboxes[j]).closest('tr');
//                    that.updateSelectedArray($row, checkboxes[j]);
//                }
//            });
        } else {
            var th = document.createElement('th');
            th.innerHTML = '<span>#</span>';
            headerRow.appendChild(th);
        }

    };
    /**
     * This method gets Ok button in table
     *
     * @method getButtons
     */
    this.getButtons = function () {
        var buttonsArray = [];
        var that = this;
        if (this.getIsPicklist()) {
            if (this.getMultiple()) {
                buttonsArray = [
                    {
                        text: 'OK',
                        className: 'btn btn-primary',
                        action: function (e, dt, node, config) {
                            if (that.pickDataFn && that.pickDataFn !== null) {
                                that.pickDataFn(that.rowsSelected);
                            }
                        }
                    }
                ];
            }
        } else {
            /* buttonsArray = [
             {
             text= 'Add',
             className= 'btn btn-primary',
             action= function (e, dt, node, config) {
             Hubs.loadURL('addattribute', null);
             }
             }, {
             text= 'Delete',
             className= 'btn btn-primary',
             action= function (e, dt, node, config) {
             //alert("Deleterow = " + that.rowsSelected);
             //alert("RowData =" + that.dataTable.row((that.rowsSelected[0]) - 1).data());
             //alert("RowData =" + (that.dataTable.rows(that.rowsSelected).data()).toString())
             //that.deleteSelectedRows();
             }
             }
             ]*/
        }
        return buttonsArray;
    };
    this.setSelectable = function (pSelectable) {
        this.isSelectable = pSelectable;
    };
    this.getSelectable = function () {
        return this.isSelectable;
    };
    this.setMultiSelect = function (pMultiSelect) {
        this.isMultiselect = pMultiSelect;
    };
    this.getMultiSelect = function () {
        return this.isMultiselect;
    };
    this.getSelectedRows = function () {
        var data = this.dataTable.rows({selected: true}).data();
        return data;
    };

}


