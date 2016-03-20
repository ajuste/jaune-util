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
	@$(COFFEE) --output ./test --no-header --compile -b ./test-src
