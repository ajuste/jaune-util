COFFEE = ./node_modules/coffee-script/bin/coffee

usage:
	@echo ''
	@echo 'make compile: Compile sources'
	@echo 'make compile-tests: Compile test sources'
	@echo ''

# --

# Compile sources
.PHONY: compile compile-tests
compile:
	@$(COFFEE) --output ./lib --no-header --compile -b ./src

# Compile tests
compile-tests: compile
	@$(COFFEE) --output ./test-compiled --no-header --compile -b ./test

# Run lint for coffeescript
run-coffee-link:
	./node_modules/coffeelint/bin/coffeelint .

test: compile-tests run-coffee-link
	./node_modules/istanbul/lib/cli.js cover ./node_modules/mocha/bin/_mocha ./test-compiled/**/*.js

cover:
	cat ./coverage/lcov.info | ./node_modules/.bin/coveralls
