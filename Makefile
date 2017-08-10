project-initialize:
	mkdir -p dist
	cd dist && rm -rf .git && git init && git remote add gh_pg git@github.com:misoton665/misoton665.github.io.git

format:
	elm-format ./src/elm --yes

run-local: format
	npm start

build: format
	npm run build

deploy: format
	cd ./dist && git push -f gh_pg master

te:
	cd dist && ls