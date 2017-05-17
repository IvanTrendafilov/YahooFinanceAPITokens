
var fs = require('fs');
var system = require('system');
var page = require('webpage').create();

function sleep(ms) {
    var unixtime_ms = new Date().getTime();
    while(new Date().getTime() < unixtime_ms + ms) {}
}

function getTokens(symbol) {
    url = 'https://finance.yahoo.com/quote/' + symbol + '/history?p=' + symbol;
    console.log('Fetch url', url);
    page.settings.userAgent = Math.random().toString(36).substring(7);
    page.open(url, function(status) {
        console.log('status:', status);
        var title = page.evaluate(function() {
            return document.title;
        });
        console.log('title:', title);

        page.includeJs('https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js', function() {
            sleep(10000); // need time to render the page
            var href = page.evaluate(function() {
                var anchor = $('a').filter(function(index) { return $(this).text() === "Download Data"; }).closest('a');
                return anchor.attr('href');
            });
            console.log('csv url:', href);
            console.log('crumb:', href.split('=').slice(-1).pop());
            for (var x in phantom.cookies) {
                var cookie = phantom.cookies[x];
                if (cookie.name === 'B') {
                    console.log('cookie: B=' + cookie.value)
                }
            }
            phantom.exit();
        });
    });
}

// Main
var args = system.args;
var symbol;
if (args.length > 1) {
    symbol = args[1];
} else {
    symbol = '^GSPC';
}
getTokens(symbol);
