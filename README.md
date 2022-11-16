# webcontrolproyectos

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

#### Run local
- docker build -t web-control-proyectos .
- docker run -d -p 8080:80 web-control-proyectos

#### Deploy heroku

- heroku container:login
- docker build -t web-control-proyectos .
- heroku container:push -a web-control-proyectos web
- heroku container:release -a web-control-proyectos web
- heroku logs --tail -a web-control-proyectos
