#!/bin/bash

#进入备份目录将之前的移动到old目录
cd /home/backup/bakmongodb
echo "you are in bakmongodb directory now"

time=$(date +"%Y-%m-%d")
mv dump dump-$time
mongodump 
echo "your database backup successfully completed"
SevenDays=$(date -d -10day  +"%Y-%m-%d")
if [ -f /home/backup/bakmongodb/dump-$SevenDays ]
then
rm -rf /home/backup/bakmongodb/dump-$SevenDays
echo "you have delete 10days ago bak sql file "
else
echo "10days ago bak sql file not exist "
echo "bash complete"
fi