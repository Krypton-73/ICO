# ICO-Platform (ACEX)

## upgrading application from v6 to v7
***```1 - rm -rf node_modules package-lock.json```

***```2 - npm i```

## updating application

***```1 - npm i```

## deploy application

> npm run prod

- ./dist folder will be recursively removed using rimraf.
- The production file will generated be in dist/ico-platform/
- This will then be copied in /var/www/$CURDIR/
- Post successful completion, nginx service will be restarted.
