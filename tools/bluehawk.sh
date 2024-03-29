#!/bin/bash -ex

cp ../backend/functions/* ../snippets/functions
rm ../snippets/functions/config.json

cp ../backend/triggers/* ../snippets/triggers
rm ../snippets/triggers/config.json
