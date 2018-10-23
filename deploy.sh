rm -rf $PWD/dist/*
ng build --prod
rm -rf /var/www/html/*
cp -r $PWD/dist/ocgdemo/* /var/www/html/
nginx -s reload
