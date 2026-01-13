#!/bin/bash
cd /home/kavia/workspace/code-generation/senior-care-staffing-portal-26156-26165/frontend_portal
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

