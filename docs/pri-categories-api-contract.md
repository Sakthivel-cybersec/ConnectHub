# ConnectHub - Categories Backend API Contract

## 1. Category Fields

Based on the existing frontend category data:

- name: String, required
- description: String
- icon: String
- color: String
- timestamps: createdAt and updatedAt

The final MongoDB ID and category reference format must be aligned with the shared Contact model.

## 2. API Endpoints

| Method | Endpoint | Purpose | Permission |
| GET | /api/categories | List categories | categories:view |
| POST | /api/categories | Create category | categories:manage |
| GET | /api/categories/:id | Get category details | categories:view |
| PATCH | /api/categories/:id | Update category | categories:manage |
| DELETE | /api/categories/:id | Delete category | categories:manage |

## 3. Validation Rules

- Category name is required.
- Trim whitespace from category names.
- Prevent duplicate category names.
- Validate icon and color values.
- Reject invalid MongoDB IDs.
- Return appropriate HTTP status codes.
- Do not delete categories linked to existing contacts.

## 4. Role Permissions

| Role | View | Create | Update | Delete |
| Admin | Yes | Yes | Yes | Yes |
| Manager | Yes | No | No | No |
| Employee | Yes | No | No | No |
| Viewer | Yes | No | No | No |

## 5. Existing Frontend Categories

- Employee: users, blue
- Client: briefcase, violet
- Vendor: building, amber
- Business Partner: handshake, green

## 6. Dependencies To Confirm

- Sak: JWT authentication middleware and shared permission middleware.
- Ash: Contact model path, category reference format and timestamps.
- Team: Whether the four existing categories should be seeded into MongoDB.

## 7. Implementation Status

Design draft only. No backend APIs or database models have been implemented yet.
