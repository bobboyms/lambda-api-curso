build-ApiLambdaFunction:
	npm install
	npm rebuild
# 	npm run lint
	npm run fast-compile
	cp -R * $(ARTIFACTS_DIR)