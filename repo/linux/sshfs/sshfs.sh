#!/bin/bash
check_results=`mount -l | grep "/dangan"`
if [[ $check_results =~ "/dangan" ]] 
then
echo "already mount "
else
sshfs  root@172.20.201.21:/danganmaster  /dangan
echo "mount success"
fi