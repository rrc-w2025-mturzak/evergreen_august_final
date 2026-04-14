# Impound Lot API

## Project Overview

### What does this API do?
This API manages impounded vehicles stored in a lot. It allows authorized users to:

- Retrieve all impound records
- Retrieve a single record by ID
- Create new impound entries
- Update existing entries
- Delete records
- Perform a quick health check

It provides a clean, structured backend for tracking vehicles, fees, and lot activity.

### What problem does it solve?
Impound lots often rely on spreadsheets or inconsistent manual logs. This API:

- Centralizes impound data
- Enforces strict validation rules
- Ensures consistent formatting
- Provides secure access with authentication + role‑based authorization
- Makes it easy for staff to manage vehicle records

### Who is it for?
This API is designed for:

- Municipal impound lots
- Private towing companies
- Police‑managed storage yards
- Parking enforcement teams
- Any organization that needs to track vehicles, fees, and lot durations

---

## Installation Instructions

Clone the repository:

```
git clone <your-repo-url-here>
```

### Prerequisites
- VS Code (latest recommended)
- Node.js v22.21.1 or newer
- npm v10.9.4 or newer
- Postman, Thunder Client, or another API testing tool
- A valid JWT for protected routes

### Environment Variables
Create a `.env` file with:

```
SERVER_URL=http://localhost:3000/api/v1
JWT_SECRET=<your-secret>
```

(Include any database or service keys your project requires.)

### Starting the Server
Run:

```
npm install
npm run start
```

### API Documentation
Swagger UI (auto‑generated from your JSDoc):

```
http://localhost:3000/api-docs
```

---

# API Endpoints

Below is a simplified guide to all available routes.

---

## GET  
### `/health`
Health check endpoint.

**Example response:**
```json
{
  "status": "ok"
}
```

---

## GET  
### `/impound`
Retrieve all impound records.  
Requires authentication + roles: **admin, manager, staff**

**Example response:**
```json
{
  "message": "Impound records retrieved",
  "count": 1,
  "data": [
    {
      "id": "imp_000001",
      "plateNumber": "ABC346",
      "vehicleType": "truck",
      "color": "blue",
      "daysInLot": 3,
      "releaseFee": 70,
      "createdAt": "2026-04-11T19:15:31.000Z",
      "updatedAt": "2026-04-11T19:15:31.000Z"
    }
  ]
}
```

---

## POST  
### `/impound`
Create a new impound record.  
Requires authentication + roles: **admin, manager**

---

### Request Body Rules

#### `plateNumber`
- String  
- 2–10 alphanumeric characters  
- Example: `"ABC346"`  
- **Required**

#### `vehicleType`
Must be one of:
- car  
- truck  
- van  
- bus  
- suv  
- motorcycle  
**Required**

#### `color`
- String  
- Example: `"blue"`  
- **Required**

#### `daysInLot`
- Integer  
- Minimum: 0  
- **Required**

#### `releaseFee`
- Number  
- Minimum: 0  
- **Required**

---

### Example Request
```json
{
  "plateNumber": "ABC346",
  "vehicleType": "truck",
  "color": "blue",
  "daysInLot": 3,
  "releaseFee": 70
}
```

### Example Response
```json
{
  "message": "Impound record created",
  "data": {
    "id": "imp_000001",
    "plateNumber": "ABC346",
    "vehicleType": "truck",
    "color": "blue",
    "daysInLot": 3,
    "releaseFee": 70,
    "createdAt": "2026-04-11T19:15:31.000Z"
  }
}
```

---

## GET  
### `/impound/{id}`
Retrieve a single impound record.  
Requires authentication + roles: **admin, manager, staff**

### Example:
```
GET /impound/imp_000001
```

### Example response:
```json
{
  "message": "Impound record retrieved",
  "data": {
    "id": "imp_000001",
    "plateNumber": "ABC346",
    "vehicleType": "truck",
    "color": "blue",
    "daysInLot": 3,
    "releaseFee": 70,
    "createdAt": "2026-04-11T19:15:31.000Z",
    "updatedAt": "2026-04-11T19:15:31.000Z"
  }
}
```

---

## PUT  
### `/impound/{id}`
Update an existing impound record.  
Requires authentication + roles: **admin, manager**

Follows the same validation rules as POST.

### Example response:
```json
{
  "message": "Impound record updated",
  "data": {
    "id": "imp_000001",
    "plateNumber": "ABC346",
    "vehicleType": "truck",
    "color": "red",
    "daysInLot": 5,
    "releaseFee": 90,
    "createdAt": "2026-04-11T19:15:31.000Z",
    "updatedAt": "2026-04-12T10:22:11.000Z"
  }
}
```

---

## DELETE  
### `/impound/{id}`
Delete an impound record.  
Requires authentication + role: **admin**

### Example response:
```json
{
  "message": "Impound record deleted"
}
```

---

# Authentication & Authorization

This API uses:

- **JWT authentication** (`authenticate` middleware)
- **Role‑based access control** (`isAuthorized`)

### Roles include:
- `admin`
- `manager`
- `staff`

Different routes require different permissions.
