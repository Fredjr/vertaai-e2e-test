# VertaAI End-to-End Test Repository

This repository is used for testing VertaAI's Track A (Contract Integrity Gate) and Track B (Drift Remediation) functionality.

## API Overview

This project provides a simple user management API.

### Endpoints

#### List Users
- **GET** `/users`
- **Query Parameters:**
  - `limit` (optional): Maximum number of users to return (default: 20)
- **Response:** Array of user objects

#### Create User
- **POST** `/users`
- **Request Body:**
  ```json
  {
    "email": "user@example.com",
    "name": "John Doe"
  }
  ```
- **Response:** Created user object

#### Get User
- **GET** `/users/{userId}`
- **Path Parameters:**
  - `userId` (required): The ID of the user to retrieve
- **Response:** User object

## Setup

1. Clone the repository
2. Install dependencies: `npm install`
3. Run the server: `npm start`

## Testing

Run tests with: `npm test`

## Deployment

This API is deployed to: https://api.example.com/v1

# Elite v3.0 validation - context-aware rationales, patch previews, drift framing
# Final 3 High-ROI validation: Split confidence + concise-first
# CRITICAL FIXES: Split confidence + drift framing + concise-first + enterprise naming
# TOP-TIER: Headline fix + Governance Impact + Adaptive Verbosity
# CONSISTENCY & COMPLETENESS: Obligation counting + Conditional requirements + Risk confidence
# SEMANTIC CONSISTENCY: Remove Overall Confidence + Fix Invariant vs Triggered semantics
# FIX 5: Broader governance impact phrasing (less domain-specific)
