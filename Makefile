setup:
	npm ci

lint:
	npx eslint .

lint-fix:
	npx eslint --fix .

play:
	node ./index.js