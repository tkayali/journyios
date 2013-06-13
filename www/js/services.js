// Create the global namespace for reusable services from project to project
MOB.Services = {
	getJSON: function( serviceurl, requestData, requestType, bAsync ){
		var returnjson = "", type = requestType ? requestType : "GET", async = bAsync ? bAsync : false;

		$.ajax({
			url: serviceurl,
			async: async,
			type: type,
			data: requestData,
			dataType: "json",
			success: function( json ){
				if( json.status === "success" ){
					if( json.data ){
						returnjson = json.data;
					}else{
						console.log("Service Failure in " + this.url);
						return [];
					}
				}
			},
			error: function(){
				console.log("Service Failure in " + this.url);
				return [];
			}
		});

		return returnjson;
	}
}

//Create the services object - this keeps all of our service code together
MOB.Journy.Services = {

	URL: {
		createEntry:   "services/createEntry/response",
		createJourny:  "services/getJourny/response",
		editJourny:    "services/editJourny/response",
		getJourny:     "services/getJourny/response",
		getEntries:    "services/getEntries/response"
	},

	createEntry: function( reqData ){
		return MOB.Services.getJSON( MOB.Journy.Services.URL.createEntry + ".json", reqData );
	},
	createJourny: function( reqData ){
		return MOB.Services.getJSON( MOB.Journy.Services.URL.createJourny + ".json", reqData );
	},
	editJourny: function( reqData ){
		return MOB.Services.getJSON( MOB.Journy.Services.URL.editJourny + ".json", reqData );
	},
	getJourny: function( reqData ){
		var data = MOB.Services.getJSON( MOB.Journy.Services.URL.getJourny + ".json" );
		if(data){
			MOB.Journy.Data.userJournys = data.journys;
			return true;
		}else{
			MOB.Journy.Data.userJournys = [];
			return false;
		}
		return false;
	},
	getEntries: function( reqData ){
		var data = MOB.Services.getJSON( MOB.Journy.Services.URL.getEntries + reqData +  ".json" );
		if(data){
			MOB.Journy.Data.userEntries = data.entries;
			return true;
		}else{
			MOB.Journy.Data.userEntries = [];
			return false;
		}
		return false;
	}
}

MOB.Journy.Data = {};
