FILES=manifest.json background.js experiments.js schema.json README.md \
	LICENSE.txt

all: userChromeJS.xpi

clean: ; -rm -f *.xpi

userChromeJS.xpi: $(FILES)
	zip -r $@.tmp $(FILES)
	mv -f $@.tmp $@
