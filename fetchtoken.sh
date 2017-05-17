#!/bin/bash

if [ -z "$BINPATH" ]; then
    BINPATH="phantomjs/bin/phantomjs"
fi

./$BINPATH fetchtoken.js "$@"
