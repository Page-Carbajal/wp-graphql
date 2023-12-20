# How to Create this package

From this [CodeMentor](https://www.codementor.io/@dhananjaykumar/build-and-publish-an-npm-typescript-package-1jklrmbf2g) tutorial.



```bash
# 1. Install TS globally
$ npm install -g typescript

# 2. Create directory and install TS as dependency
$ mkdir wp-grapql; cd wp-grapql
$ npm install typescript -D

# 3. NPM and TSC init
$ mkdir src
$ npm init -y
$ tsc --init
```

The last command will generate a tsconfig file.

Configure it so it looks like this.

```json
{
  "compilerOptions": {
    "target": "es2016",
    "module": "commonjs",
    "declaration": true,
    "outDir": "lib",
    "esModuleInterop": true,
    "forceConsistentCasingInFileNames": true,
    "strict": true,
    "skipLibCheck": true
  },
  "include": ["src/**/*"]
}
```

Modify the package.json file to add the build command.

Your package.json should look like this

```json
{
  "devDependencies": {
    "typescript": "^5.3.3"
  },
  "name": "@your-name/wp-graphql",
  "description": "A GraphQL Client for WordPress",
  "version": "1.0.0",
  "main": "./src/index.js",
  "scripts": {
    "build": "npx tsc"
  },
  "keywords": [],
  "author": "Your Name",
  "license": "ISC"
}
```

Now the basic package is done, you can create typescript files inside the **src** directory

To install the package you can use the git version from [this](https://medium.com/pravin-lolage/how-to-use-your-own-package-from-git-repository-as-a-node-module-8b543c13957e) tutorial 

```bash
$ npm install --save https://medium.com/pravin-lolage/how-to-use-your-own-package-from-git-repository-as-a-node-module-8b543c13957e
```

And now you should be able to import using the name of your package lik this


