window.onload = function () {
	function updateLabel() {
        var enabled = chrome.extension.getBackgroundPage().enabled;
        var button = document.getElementById('toggle_button');
        button.value = enabled ? "ON" : "OFF";
        button.className = enabled ? "button-on" : "button-off";
        if (enabled)
            chrome.browserAction.setIcon({ path: 'icon16_green.png' });
        else
            chrome.browserAction.setIcon({ path: 'icon16_red.png' });
	}
	document.getElementById('toggle_button').onclick = function(event) {
		var background = chrome.extension.getBackgroundPage();
		background.enabled = !background.enabled;
        updateLabel();
        event.target.blur();
        chrome.tabs.getSelected(null, function(tab) {
            var code = 'window.location.reload();';
            chrome.tabs.executeScript(tab.id, {code: code});
        });
	};
	updateLabel();
}