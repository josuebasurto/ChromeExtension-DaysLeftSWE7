//                   8888888888  888    88888
//                   88     88   88 88   88  88
//                    8888  88  88   88  88888
//                       88 88 888888888 88   88
//                88888888  88 88     88 88    888888
 
//                88  88  88   888    88888    888888
//                88  88  88  88 88   88  88  88
//                88 8888 88 88   88  88888    8888
//                 888  888 888888888 88   88     88
//                  88  88  88     88 88    8888888

//                Countdown by Josue Basurto @josuebasurto

var theDate = new Date('12/18/2015 12:00 AM'); // <<< The Date!

//Function that calcualte days between two dates absolutely.
function daysLeftFor(futureDate){
	var oneDay = 24 * 60 * 60 * 1000;
	var today = new Date();
	var daysLeft = Math.round((futureDate.getTime() - today.getTime())/(oneDay));
	return daysLeft;
}

//Function that creates notification.
function generateNotification(days){
	var opt = {
		type: "progress",
		title: "Star Wars: Episode VII",
		iconUrl: "images/darth_vader_icon_128.png"
	};

	if (days > 0) {
		opt.type = "progress";
		opt.message = "There are " + days + " days left for Star Wars: Episode VII";
		opt.contextMessage = "Do you have your tickets already?";
		opt.progress = days;
	} else {
		opt.type = "basic";
		opt.message = "Go to see Star Wars: Episode VII";
		opt.contextMessage = "NOW!";
	};

	chrome.browserAction.setBadgeBackgroundColor({ color: [255, 0, 0, 255] });
	chrome.browserAction.setBadgeText({text: days.toString()});

    return opt;
}

//When the extension is installed or upgraded
chrome.runtime.onInstalled.addListener(function() {
	chrome.notifications.create(theDate.toString(), generateNotification(daysLeftFor(theDate)));
	
});

//When the extension icon is clicked
chrome.browserAction.onClicked.addListener(function(tab) {
	chrome.notifications.create(theDate.toString(), generateNotification(daysLeftFor(theDate)));
});