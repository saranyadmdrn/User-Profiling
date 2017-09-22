// if you checked "fancy-settings" in extensionizr.com, uncomment this lines

// var settings = new Store("settings", {
//     "sample_setting": "This is how you use Store.js to remember values"
// });


//example of using a message handler from the inject scripts
/*chrome.extension.onMessage.addListener(
  function(request, sender, sendResponse) {
  	chrome.pageAction.show(sender.tab.id);
    sendResponse();
  });*/

let URL = 'http://ec2-18-220-227-179.us-east-2.compute.amazonaws.com:8082/eventlog'

chrome.bookmarks.onCreated.addListener(function(id,bookmark){
	//console.log("bookmark:"+ bookmark.url);
	//console.log(new Date(bookmark.dateAdded).toISOString());
	//let data = {'name' : ,'type' : 'bookmark', 'content' : '', 'link' : bookmark.url, 'date' : new Date(bookmark.dateAdded).toISOString()}
	getCookies("http://ec2-18-220-227-179.us-east-2.compute.amazonaws.com","userName",function(userName){
  		//console.log("userName:" + userName)
  		//console.log(request.data)
  		let data = {'name' : userName,'type' : 'bookmark', 'content' : '', 'link' : bookmark.url, 'date' : new Date(bookmark.dateAdded).toISOString()}
  		/*$.post(URL,request,function(data){
  			console.log("logged");
  		});*/
  		
  		$.ajax({
  		type: "POST",
  		contentType: 'application/json',
  		url: URL,
  		data: JSON.stringify(data),
  		dataType : "json",
  		success: function(data){
           // console.log("logged")
        }
	});
  	});

});
chrome.extension.onMessage.addListener(function(request, sender, callback) {
 /* if (request.action == "xhttp") {
    alert("inside background");
    var URL = 'http://localhost:8082/eventlog'
    var xhttp = new XMLHttpRequest();
        var method = request.method ? request.method.toUpperCase() : 'GET';

        xhttp.onload = function() {
            callback(xhttp.responseText);
        };
        xhttp.onerror = function() {
            // Do whatever you want on error. Don't forget to invoke the
            // callback to clean up the communication port.
            callback();
        };
        xhttp.open(method, URL, true);
        if (method == 'POST') {
            xhttp.setRequestHeader('Content-Type', 'application/json');
        }
        xhttp.send(request.data);
        return true; // prevents the callback from being called too early on return
  }*/
  	//console.log("background")
  	getCookies("http://ec2-18-220-227-179.us-east-2.compute.amazonaws.com","userName",function(userName){
  		//console.log("userName:" + userName)
  		//console.log(request.data)
  		request.name = userName;
  		/*$.post(URL,request,function(data){
  			console.log("logged");
  		});*/
  		console.log(request)
  		$.ajax({
  		type: "POST",
  		contentType: 'application/json',
  		url: URL,
  		data: JSON.stringify(request),
  		dataType : "json",
  		success: function(data){
            //console.log("logged")
        }
	});
  	});
  	

  	callback();
});

function getCookies(domain, name, callback){
  //console.log(domain)
	chrome.cookies.get({"url" : domain, "name" : name}, function(cookie){
		if(callback){
			callback(cookie.value);
		}
	});
}