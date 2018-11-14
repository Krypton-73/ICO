#!/bin/bash
CURDIR=${PWD##*/}


remove_oldfiles() {
	rm -rf $PWD/dist/*
	rm -rf /var/www/$CURDIR/*
}

build(){
	ng build --prod
}

move_files(){
	echo "making directory and copying to /var/www/$CURDIR/"
	mkdir /var/www/$CURDIR/
	cp -r $PWD/dist/ico-platform/* /var/www/$CURDIR/
	nginx -s reload
}


_CMD=$1
case $_CMD in
   "")
    echo "No arguments passed. executing remove and build"
    remove_oldfiles
    build
    move_files

   ;;
   "m") echo "moving files"
	move_files
   ;;
   "r") echo "removing files"
		remove_oldfiles
   ;;
   "b") echo "building files"
		build
   ;;

  *)
	echo "!unknown command '$_CMD' Run bash $0 -h"
	;;
esac

