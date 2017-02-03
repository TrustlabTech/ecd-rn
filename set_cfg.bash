#!/usr/bin/env bash
if [[ "$(git rev-parse --abbrev-ref HEAD)" == "unstable" ]]; then
    cp -R cfg/dev.json cfg/runtime.json
else
    cp -R cfg/prod.json cfg/runtime.json
fi
# EOF