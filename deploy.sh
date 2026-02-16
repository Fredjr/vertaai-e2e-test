#!/bin/bash
# Deployment script for user roles migration
# WARNING: This modifies production database schema

set -e

echo "Starting deployment..."

# Run database migration
echo "Running migration 001_add_user_roles.sql..."
psql $DATABASE_URL -f migrations/001_add_user_roles.sql

# Restart application
echo "Restarting application..."
kubectl rollout restart deployment/app

echo "Deployment complete!"
