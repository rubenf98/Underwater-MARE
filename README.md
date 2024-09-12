# Underwater Survey
Começado pelo Rúben no Wave - branch MARE

## Development

Recommended to use docker for development. The following commands allow for the development of the application without the need to install any dependencies.

```sh
docker build -t underwater-mare .
docker run -e WATCHPACK_POLLING=true -v ${pwd}\src:/app/src:ro  -d -p 3000:3000 --name underwater-mare underwater-mare
```

In case docker is not used, the following are needed:

Node v20.11.0
Npm v10.2.4

Then:


```sh
npm install
npm run dev
```



