# Role-Based Access Governance Platform (RBAC Microservices Project)

## Overview

This project is a microservices-based **Identity and Access Governance Platform** that implements:

- Authentication with JWT
- Role-Based Access Control (RBAC)
- Access Request and Approval Workflows
- Temporary Privilege Grants with Expiry
- Notification and Approval Inbox
- User / Role Administration
- Dynamic Policy Rules
- Asset Governance

The platform simulates enterprise-style access governance where users request privileged operations and approvers grant or deny access based on policies.

---

# Architecture

## Microservices

The system consists of:

- Auth Service
- User Service
- Asset Service
- Access Service
- API Gateway
- Eureka Service Discovery

Frontend:

- React
- Axios
- React Router

Backend:

- Spring Boot
- Spring Data JPA
- Feign Client
- MySQL
- JWT

---

# Key Features

## Authentication
- User login
- JWT generation and validation
- Role-aware login

## Authorization (RBAC)
Roles implemented:

- ADMIN
- MANAGER
- HR
- USER
- AUDITOR
- SUPPORT

Policy-based permissions:
- Create
- Read
- Update
- Delete

Default-deny authorization model.

---

## Access Request Workflow

Users can request privileged access for:

- CREATE
- UPDATE
- DELETE

Request lifecycle:

PENDING → APPROVED / REJECTED

Requests are routed to approvers and processed in Approval Inbox.

---

## Temporary Grants

Approved requests generate grants:

- Permanent grants
- Temporary grants
- Automatic expiry support

Example:
- Temporary delete privilege expires automatically.

---

## Dynamic UI Authorization

Actions are dynamically governed.

Examples:

- Delete button only appears with approved DELETE grant.
- Update available only with granted UPDATE access.

---

## Notifications

Supports:

- Pending approval notifications
- Approval/rejection notifications
- Unread notification badge
- Mark-as-read support

---

## User and Role Governance

Admin capabilities:

- Create users
- Update users
- Delete users
- Assign roles

---

## Access Policy Matrix

Dynamic Rules module visualizes role permissions on protected resources.

Example policies:

ADMIN + ASSET + DELETE = Allowed

USER + ASSET + DELETE = Denied

---

# High Level Flow

User Login  
↓  
Request Privileged Access  
↓  
Approval Routing  
↓  
Grant Issued  
↓  
Action Enabled  
↓  
Grant Expiry (optional)

---

# Sample Modules

## Dashboard
- Metrics
- Recent Activity
- Quick Actions

## Asset Management
- Protected asset operations
- Grant-controlled actions

## Approval Inbox
- Approve / Reject requests
- Role-routed approval queue

## Notifications
- Real-time approval awareness

---

# Security Concepts Used

This project applies:

- Least Privilege
- Default Deny
- Separation of Duties
- Just-In-Time Access

---

# Project Structure

Frontend
```bash
rbac-ui/
```

Backend
```bash
auth-service/
user-service/
asset-service/
access-service/
api-gateway/
service-registry/
```

---

# Running the Project

## Backend

Start in order:

1. Eureka Service Registry
2. API Gateway
3. Auth Service
4. User Service
5. Asset Service
6. Access Service

Run Spring Boot services:

```bash
mvn spring-boot:run
```

---

## Frontend

```bash
npm install
npm run dev
```

Default:

```bash
http://localhost:5173
```

---

# Sample Demo Flow

1 Login as user  
2 Submit delete access request  
3 Login as approver  
4 Approve request  
5 Granted action appears  
6 Grant expires automatically

---

# Future Enhancements

Planned improvements:

- BCrypt password encryption
- Dual approval workflow
- Full audit logging
- Docker deployment
- Automated tests
- Role hierarchy engine

---

# Resume Project Summary

Built a microservices-based RBAC governance platform implementing approval-driven privilege elevation, temporary grants, dynamic authorization, notifications and identity administration.

---

# Author

Developed as an enterprise-style access governance project for learning and portfolio demonstration.
