# What it does

Gets tokens for Yahoo Finance API data. 

## Usage

1. Run `install-phantomjs.sh` to install phantomjs in current directory:

        ./install-phantomjs.sh

2. Run `fetchtoken.sh` to fetch API tokens:

        ./fetchtoken.sh

You should see something like this:

Fetch url https://finance.yahoo.com/quote/^GSPC/history?p=^GSPC
status: success
title: ^GSPC Historical Prices | S&P 500 Stock - Yahoo Finance
csv url: https://query1.finance.yahoo.com/v7/finance/download/^GSPC?period1=1492463852&period2=1495055852&interval=1d&events=history&crumb=XXXXXXX
crumb: XXXXXXX
cookie: B=YYYYYY

Sometimes the script doesn't work. Try adjusting the user agent and sleep values. 

When it works, you can download historical data with a request like this:

curl 'https://query1.finance.yahoo.com/v7/finance/download/%5EGSPC?period1=1492463852&period2=1495055852&interval=1d&events=history&crumb=XXXXXXX' -H 'user-agent: Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.2; Trident/6.0)' -H 'cookie: B=YYYYYY;' -H 'referer: https://finance.yahoo.com/quote/%5EGSPC/history?p=%5EGSPC'

replace the cookie and crumb values with the ones from the script. period1 (start) and period2 (end) are dates in unix timestamp format. 
