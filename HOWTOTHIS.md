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
  "name": "wp-graphql",
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
