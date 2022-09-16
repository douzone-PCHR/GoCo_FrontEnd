#!/bin/bash
REPOSITORY=/home/ubuntu
REALREPOSITORY=/home/ubuntu/real_front

mkdir -p $REALREPOSITORY

sudo cp -r $REPOSITORY/front/build $REALREPOSITORY
