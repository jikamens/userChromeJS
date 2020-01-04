FILES=manifest.json bootstrap.js README.md LICENSE.txt chrome.manifest \
      content/kickstarter.jsm content/kickstarter.xul \
      $(wildcard locale/*/kickstarter.dtd)

all: userChromeJS.xpi

clean: ; -rm -f *.xpi

userChromeJS.xpi: $(FILES)
	./send-later/utils/make-kickstarter.sh
	zip -r $@.tmp $(FILES)
	mv -f $@.tmp $@
