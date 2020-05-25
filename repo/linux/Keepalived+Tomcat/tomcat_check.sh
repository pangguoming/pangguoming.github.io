#!/bin/bash
JAVA_PROCESS=`ps -C java --no-heading| wc -l`
if [ $JAVA_PROCESS -eq 0 ];then
    echo "tomcat is stop"
    sleep 2
	/usr/local/tomcat/apache-tomcat-8.5.34/bin/shutdown.sh
	sleep 10
	/usr/local/tomcat/apache-tomcat-8.5.34/bin/startup.sh
	sleep 100
	if [ `ps -C java --no-heading| wc -l` -eq 0 ];then
        KEEP=`systemctl is-active keepalived.service`
        if [ $KEEP = 'active' ]; then
			systemctl stop keepalived.service
			echo "keepalived stop"
        else
            echo "keepalived is not active"
        fi
    fi
fi
