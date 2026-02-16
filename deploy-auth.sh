#!/bin/bash
# Deployment script for authentication overhaul
# WARNING: This is a breaking change that requires downtime

set -e

echo "🚀 Starting authentication system deployment..."

# Step 1: Backup database
echo "📦 Creating database backup..."
pg_dump $DATABASE_URL > backup_$(date +%Y%m%d_%H%M%S).sql

# Step 2: Run migrations
echo "🔄 Running database migrations..."
psql $DATABASE_URL < migrations/002_auth_overhaul.sql

# Step 3: Deploy new auth service
echo "🔧 Deploying AuthServiceV2..."
kubectl set image deployment/api api=myregistry/api:auth-v2

# Step 4: Wait for rollout
echo "⏳ Waiting for deployment to complete..."
kubectl rollout status deployment/api

# Step 5: Verify deployment
echo "✅ Verifying deployment..."
curl -f http://api/health || (echo "❌ Health check failed!" && exit 1)

# Step 6: Invalidate all existing sessions (BREAKING)
echo "🔐 Invalidating all existing sessions..."
psql $DATABASE_URL -c "TRUNCATE user_sessions;"

echo "✅ Deployment complete!"
echo "⚠️  All users will need to re-authenticate"
