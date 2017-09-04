var fs = require('fs');
var system = require('system');
var page = require('webpage').create();

page.onInitialized = function() {
    if (page.injectJs('core.js')) {
        console.log('Polyfills loaded');
    }
}

page.onError = function(msg, trace) {
    var msgStack = ['ERROR: ' + msg];

    if (trace && trace.length) {
        msgStack.push('TRACE:');
        trace.forEach(function(t) {
            msgStack.push(' -> ' + t.file + ': ' + t.line + (t.function ? ' (in function "' + t.function +'")' : ''));
        });
    }

    console.error(msgStack.join('\n'));
}

function sleep(ms) {
    var unixtime_ms = new Date().getTime();
    while(new Date().getTime() < unixtime_ms + ms) {}
}

function getTokens(symbol) {
    url = 'https://finance.yahoo.com/quote/' + symbol + '/history?p=' + symbol;
    console.log('Fetch url', url);
    page.settings.userAgent = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/60.0.3112.113 Safari/537.36';
    page.open(url, function(status) {
        console.log('status:', status);
        var title = page.evaluate(function() {
            return document.title;
        });
        console.log('title:', title);

        sleep(10000); // need time to render the page

        var href = page.evaluate(function() {
            return document.querySelector('span a').getAttribute('href');
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
