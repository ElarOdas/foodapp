
#!/bin/bash
set -e

# TODO collect user source through wildcards
source /run/secrets/db-script-worker
source /run/secrets/db-script-api

webapp_dbname="foodapp"