#!/usr/bin/env bash
# NOTE currently this script only implement the installation of phantomjs on macOS

URL="https://bitbucket.org/ariya/phantomjs/downloads/phantomjs-2.1.1-macosx.zip"
INSTALLDIR="phantomjs"
if [ -d "$INSTALLDIR" ]; then
    echo "You've already installed phantomjs in this directory"
    exit 1
fi

# Download
TMPFILE=$(mktemp)
wget "$URL" -O $TMPFILE

# Unzip
unzip -d $PWD $TMPFILE
rm $TMPFILE

# Rename
DIR=$(find . -type d -name 'phantomjs-*' -maxdepth 1 | head -1)
mv $DIR $INSTALLDIR

echo "Install complete, phantomjs bin located at $(realpath $INSTALLDIR/bin)"
ls $INSTALLDIR/bin
