# ICO-Platform (ACEX)

The ICO platform developed for ACEX Token sale.

## Upgrading Application from Angular v6 to v7

```bash
rm -rf node_modules package-lock.json
npm i
```

## Updating Application for minor releases

```bash
npm i
```

## Deploying Application

```bash
npm run prod
```

>- ./dist folder will be recursively removed using rimraf.
>- The production file will generated be in dist/ico-platform/
>- This will then be copied in /var/www/$CURDIR/
>- Post successful completion, nginx service will be restarted.

## Deploying Application using Bash Script

```bash
bash deploy.sh
```
