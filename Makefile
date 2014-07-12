
coverage: jscover mochaCover


jscover:
	@jscoverage --no-highlight routes routes-cov

test:
	@mocha


mochaCover:
	@mocha -R html-cov > coverage.html


clean:
	rm -f coverage.html
	rm -fr routes-cov

.PHONY: test mochaCover clean coverage