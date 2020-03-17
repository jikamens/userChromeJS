FILES=manifest.json bootstrap.js README.md LICENSE.txt chrome.manifest

all: userChromeJS.xpi

clean: ; -rm -f *.xpi

userChromeJS.xpi: $(FILES)
	zip -r $@.tmp $(FILES)
	mv -f $@.tmp $@
