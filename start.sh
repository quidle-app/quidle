#!/bin/bash

(cd api && yarn start:dev | cat) & (cd front && yarn dev | cat) && fg
