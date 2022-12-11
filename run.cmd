CALL ncc build index.js --license licenses.txt
type nul > github.output
set GITHUB_OUTPUT=github.output
node ./dist/index.js