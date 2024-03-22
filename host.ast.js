import * as Ast from "./Asterisk/index.js";

Ast.clearLogs();
Ast.serverside.open(1200);

Ast.files.regester404("./404.html");

Ast.serverside.api.createEndpoint(function(dataIn){
	return {"message": "You sent: " + JSON.stringify(dataIn)};
}, "/my_api");