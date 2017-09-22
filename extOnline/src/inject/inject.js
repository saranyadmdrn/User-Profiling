$(document).ready(function() {
	var data;
	var scroll = false;
	var CurrentScroll = 0;

	

	/*console.log(window.location)
	if( test.indexOf('https://stackoverflow.com/questions/') >= 0){


  
  	}*/

    $(".question-hyperlink").on('click',function(event){
    	let content = $(this).parent().siblings(".excerpt").text().trim();
    	let link = "https://stackoverflow.com" + $(this).attr("href");
		let data = {'type' : "Summary_Question",'content' : content, 'link' : link, 'date' : new Date().toISOString()};
		sendEventData(data);
	})

	$(".login-link.btn-clear").on('click',function(event){
		let content = "";
		let link = "";
		let data = {'type' : "Login", 'content' : content, 'link' : link, 'date' : new Date().toISOString()};
		sendEventData(data);
	})

	$(".login-link.btn").on('click',function(event){
		let content = "";
		let link = "";
		let data = {'type' : "SignUp", 'content' : content, 'link' : link, 'date' : new Date().toISOString()};
		sendEventData(data);
	})

	$(".btn-outlined").on('click',function(event){
		let content = "";
		let link = "https://stackoverflow.com"+ $(this).attr("href");
		let data = {'type' : "Ask_Question", 'content' : content, 'link' : link, 'date' : new Date().toISOString()};
		sendEventData(data);
	})

	$(".post-tag").on('click',function(event){
		let content = $(this).text().trim();
		let link = "https://stackoverflow.com"+ $(this).attr("href");
		let data = {'type' : "Question_Tag", 'content' : content, 'link' : link, 'date' : new Date().toISOString()};
		sendEventData(data);
	})

	$(".user-details").on('click',function(event){
		//check this event
		//console.log(event)
		//console.log("event: UserDetails")
		let content = $(this).children("a").text()
		//console.log("content:" + content)
		let link = "https://stackoverflow.com"+ $(this).children("a").attr("href");
		//console.log("link:" + link)
		let data = {'type' : "User_Details", 'content' : content, 'link' : link, 'date' : new Date().toISOString()};
		sendEventData(data);
	})

	/*$(".job").on('click',function(event){
		//check this event
		event.preventDefault();
		console.log("event: Job")
		let content = $(this).children(".title").text().trim();
		console.log("content:" + content)
		let link = $(this).attr("href");
		console.log("link:" + link)
		let data = {'type' : "Job", 'content' : content, 'link' : link};		
		sendEventData(data);
	})*/

	$(".page-numbers.next").on('click',function(event){
		//check this event

		//console.log("event: NextPage")
		let content = "";
		let link = "";
		let data = {'type' : "Next_Page", 'content' : content, 'link' : link, 'date' : new Date().toISOString()};
		sendEventData(data);
	})

	$("#question").on('click',function(event){

		//check this event
		if(event.target.className == 'vote-up-off' || event.target.className == 'vote-down-off' || event.target.className == 'star-off' ){
			//console.log(event)
			let className = event.target
			let content = $(this).find(".post-text").html();
			let type = ""
			let link = className.baseURI
			
			//console.log("event:voting")
			//console.log("type:" + className)

			if(className.innerText == "up vote"){
				type = "Question_Up_Vote"
			}
			else if(className.innerText == "down vote"){
				type = "Question_Down_Vote"
			}
			else if(className.innerText == "favorite"){
				type = "Question_Favorite"
			}

			let data = {'type' : type, 'content' : content, 'link' : link, 'date' : new Date().toISOString()};
			sendEventData(data); 
		}
		else{
			//console.log("hiiiiiiiiiiiiiii")
		}
		
		
	})

	$(".answer").on('click',function(event){

		//check this event
		let className = event.target
	if(className.innerText == "up vote" || className.innerText == "down vote" || className.innerText == "favorite" || className.innerText == 'add a comment'){
		//console.log(event)
		
		let content = $(this).find(".post-text").html();
		let type = "";
		let link = className.baseURI;
		
		//console.log("event:voting answers")
		//console.log("link:" + link)

		if(className.innerText == "up vote"){
			type = "Answer_Up_Vote"
		}
		else if(className.innerText == "down vote"){
			type = "Answer_Down_Vote"
		}
		else if(className.innerText == "favorite"){
			type = "Answer_Favorite"
		}
		else if(className.innerText == 'add a comment')
		{
			type = "Add_a_comment"
		}

		let data = {'type' : type, 'content' : content, 'link' : link, 'date' : new Date().toISOString()};
		//console.log(data)
		sendEventData(data); 
	}
	else{}
		
	})


	$("form").submit(function(event){
		
	    let content = $(this).find("input").attr("value");
	    let type = "Text_Search";
	    let link = event.target.baseURI;
	    let data = {'type' : type, 'content' : content, 'link' : link, 'date' : new Date().toISOString()};
		sendEventData(data); 

	});

	$("pre").bind('copy', function(event) {
    	let content = event.currentTarget.innerText;
    	//console.log(content)
    	let type = "Copy_Content";
    	//console.log(type);
    	let link = event.target.baseURI;
    	let data = {'type' : type, 'content' : content, 'link' : link, 'date' : new Date().toISOString()};
		sendEventData(data); 
	});

    
});


function sendEventData(data) {
		//console.log("sendMessage")
		chrome.extension.sendMessage(data, function(response) {
        	//console.log("response");
    });
}


/*
chrome.extension.sendMessage({data}, function(response) {
	
});*/