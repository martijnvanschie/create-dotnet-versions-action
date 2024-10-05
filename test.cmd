CALL npx ncc build src/index.js -o dist --license licenses.txt
type nul > github.output
set GITHUB_OUTPUT=github.output
node ./dist/index.js