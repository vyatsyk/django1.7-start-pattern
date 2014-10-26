#!/bin/bash
echo "GOTO /home/web/project/" > ~/deployment
cd /home/web/project/
echo "PULL" >> ~/deployment
git pull
echo FINISHED PULL >> ~/deployment
echo -------------------------------------- >> ~/deployment
echo COLLECTING python django requirements >> ~/deployment
pip install -r /home/web/project/requirements.txt --upgrade
echo FINISHED collecting python django requirements >> ~/deployment
echo -------------------------------------- >> ~/deployment
echo Collectin node dependencies >> ~/deployment
cd /home/web/project/app/static/
npm install
echo Node Depenedencies collected >> ~/deployment
echo Collecting bower dependencies >> ~/deployment
node_modules/bower/bin/bower install
echo Bower dependencies collected >> ~/deployment
echo Running grunt >> ~/deployment
grunt deployment
echo Grunt was ran >> ~/deployment
echo COLLECTING STATIC >> ~/deployment
python /home/web/project/manage.py collectstatic --noinput -i bower_components -i node_modules -i \
        images -i js -i less -i .bowerrc -i bower.json -i Gruntfile.js -i package.json -i app.css -i app.js
echo FINISHED COLLECTING STATIC >> ~/deployment
echo -------------------------------------- >> ~/deployment
echo SYNCING DB >> ~/deployment
python /home/web/project/manage.py migrate
echo FINISHING SYNCING DB >> ~/deployment
echo -------------------------------------- >> ~/deployment
echo RELOADING SERVER >> ~/deployment
touch /home/web/project/wsgi.py
echo FINISHED RELOADING >> ~/deployment
