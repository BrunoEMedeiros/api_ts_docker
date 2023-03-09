
The main difference is that tsc transpile all the file according to your tsconfig.

Instead, ts-node will start from the entry file and transpile the file step by step through the tree based on the import/export.

libs

npm i express
npm i --save-dev @types/express
npm i --save-dev @types/node
npm i --save-dev ts-node
npm i --save-dev nodemon