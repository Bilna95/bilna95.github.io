function Header(key, value) {
	this.key = key;
	this.value = value;
}

function ExtraInfo(value) {
	this.value = value;
}

function Output(link, moduleID, headers, quality) {
	this.quality = quality;
	this.link = link;
	this.moduleID = moduleID;
	this.headers = headers
}

function ResolverLogic(request, method, userAgent, referer, headers, extraInfo, loadJavascript, javaScript, output) {
	this.request = request;
	this.method = method;
	this.userAgent = userAgent;
	this.referer = referer;
	this.headers = headers;
	this.extraInfo = extraInfo;
	this.loadJavascript = loadJavascript;
	this.javaScript = javaScript;
	this.output = output;
}
var moduleID = '23049823094';
var resolverLogic;
var output = [];
var requestHeaders = [];
var extraInfo = [];
var savedData = document.getElementById('katsu-final-data');
var parsedJson = JSON.parse(savedData.innerHTML);
var videoHeaders = [];
videoHeaders.push(new Header('', ''));

let playerRegex = /innerHTML\s=\s*"([^"]+)"\s?\+\s?''\+\s?\('([^']+)/;
let body = document.body.innerText;
let playerMatch = playerRegex.exec(body);

if (playerMatch) {
    let matchedLink = playerMatch[2];
    let index = matchedLink.indexOf('?');
	if (index == -1){
		try{
			firstpart = playerMatch[1].split('=')[1].replace('\"','');
			secondpart = playerMatch[2].substr(5);
			secondtry = playerMatch[2].substr(4);
			let videoLink = 'https://streamta.pe/get_video?id=' + firstpart + secondpart + '&stream=1';
			let fixedLink = 'https://streamta.pe/get_video?id=' + firstpart + secondtry + '&stream=1';
			console.log(videoLink,fixedLink);
			output.push(new Output(fixedLink, moduleID, videoHeaders, 'Thai guy was here'));;
			output.push(new Output(videoLink, moduleID, videoHeaders, 'Normal'));
		}catch(e){}
		try{
			if (matchedLink.match(/^=/)){
				let videoLink = 'https://streamta.pe/get_video?id=' + matchedLink.substr(5) + '&stream=1';
				if (videoLink.includes('id==')) {
					videoLink = videoLink.replace('id==', 'id=');
				  }
				console.log(videoLink);
				output.push(new Output(videoLink, moduleID, videoHeaders, 'Normal'));
			}
		}catch(e){}
		try{
            if(matchedLink.match(/id=/)) {
                split = matchedLink.split('id=');
                let videoLink = 'https://streamta.pe/get_video?id=' + split[1] + '&stream=1';
                console.log(videoLink);
                output.push(new Output(videoLink, moduleID, videoHeaders, 'Normal'));;
            }
        }catch(e){}
		try{
			if (matchedLink.match(/^([a-zA-Z]+d=)/)){
				split = matchedLink.split('d=');
				let videoLink = 'https://streamta.pe/get_video?id=' + split[1] + '&stream=1';
				console.log(videoLink);
				output.push(new Output(videoLink, moduleID, videoHeaders, 'Normal'));
			}
		}
		catch(e){}
	}else{
			let videoLink = `https://streamta.pe/get_video${matchedLink.substr(index)}&stream=1`;
			console.log(videoLink);
			output.push(new Output(videoLink, moduleID, videoHeaders, 'Normal'));
		}
}

requestHeaders.push(new Header('', ''));
extraInfo.push(new ExtraInfo(parsedJson.request));
resolverLogic = new ResolverLogic('', 'get', '', '', requestHeaders, extraInfo, '', '', output);
var finalJson = JSON.stringify(resolverLogic);savedData.innerHTML = finalJson;