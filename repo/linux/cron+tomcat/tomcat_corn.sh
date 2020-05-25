#!/bin/bash
source /etc/profile 
JAVA_HOME=/usr/local/java/jdk1.8.0_181/
export JAVA_HOME
JAVA_PROCESS=`lsof -i:80 | wc -l`
if [ $JAVA_PROCESS -eq 0 ];then
    echo "tomcat is stop"
	/usr/local/tomcat/apache-tomcat-8.5.32/bin/shutdown.sh
	sleep 10
	/usr/local/tomcat/apache-tomcat-8.5.32/bin/startup.sh
else
    echo "tomcat is running"
fi
