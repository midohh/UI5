jQuery.sap.require("sap.ui.model.json.JSONModel");
jQuery.sap.require("sap.m.MessageToast");
//sap.ui.getCore().loadLibrary("quagga", "../lib/quagga");  
function handleOnChange(e){
	console.log(e);
	if (e.files && e.files.length) {
		var file = e.files[0];
        URL.createObjectURL(file);
        decode(file);
    }
}


function handleProductIDScan(){}

function decode(file){

    console.log("Scanning");
    // TODO we should find out, which readers we need.
    var config = {
            decoder : {
                readers : ["code_128_reader",
                           "ean_reader",
                           "ean_8_reader",
                           "code_39_reader",
                           "code_39_vin_reader",
                           "codabar_reader",
                           "upc_reader",
                           "upc_e_reader",
                           "i2of5_reader"]
              },
        numOfWorkers : 4,
        locate : true,
        src : URL.createObjectURL(file),
        debug : false
    };
    
    Quagga.decodeSingle(config, function(result) {
    	
    	console.log(URL.createObjectURL(file));
    	
    	if (typeof result !== "undefined" && result !== null) { 
    		var oModel = sap.ui.getCore().setModel(new sap.ui.model.json.JSONModel({image:URL.createObjectURL(file)}), "img"); 
    		console.log("result "+  result.codeResult.code);
    		console.log(result)
    		sap.ui.getCore().byId("idFileUploader1--barcodeNumber").setValue(result.codeResult.code);
    	}
    	else {
    		var msg = 'Barcode scan failed';
    		sap.m.MessageToast.show(msg);
    		var oModel = sap.ui.getCore().setModel(new sap.ui.model.json.JSONModel({image:URL.createObjectURL(file)}), "img"); 
    	}
    });

	
}