#!/bin/bash

GIN_MODE=release nohup ./yunche config.yaml 2>&1 > yunche.log &
