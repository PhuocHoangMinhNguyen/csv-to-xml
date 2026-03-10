# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

**Development (both client and server):**
```bash
npm run dev
```

**Backend only (with nodemon):**
```bash
npm run server
```

**Frontend only:**
```bash
npm run client
```

**Build frontend for production:**
```bash
npm run client:build
```

**Frontend tests:**
```bash
cd client && npm test
```

## Architecture

This is a full-stack Node.js + React app for Magellan Logistics. It translates customer CSV files into Magellan-format XML files, transferring them via FTP.

### Backend (`server.js`, root-level modules)
- Express server on port 5000
- A `node-cron` job fires every minute: connects to each FTP server in the `ftps` Firestore collection → downloads CSV files to `ftpserver/{clientCode}/{host}/IN/` → runs the CSV→XML conversion → uploads `PROC/`, `ERR/`, `OUT/` folders back to FTP → cleans up local directories
- REST API routes in `routes/`: `notifications`, `clients`, `ftps`, `admins`, `dictionary`, `defaultvalue`

### Core conversion logic (`csvToXml.js`)
1. Fetches the client's field mapping from Firestore `dictionary` collection (maps customer CSV column names → Magellan XML field names, and customer values → Magellan values)
2. Fetches default values from Firestore `default value` collection
3. Parses CSV rows using `csvtojson`, applies the mapping, injects defaults
4. Validates that all mandatory fields are present (defined in `data/magellanField.js`)
5. Builds a nested XML structure (CustomerOrders → CustomerOrder → OrderHeader + OrderLines) using `jstoxml`
6. On success: copies CSV to `PROC/`, writes XML to `OUT/`, logs a notification to Firestore
7. On error: copies CSV to `ERR/`, logs a notification to Firestore, sends email to all admin addresses

### Firebase (`firebase/firebase.js`)
Uses Firebase Admin SDK with a service account JSON. The `db` export is a Firestore instance used throughout. Collections: `clients`, `ftps`, `admins`, `notifications`, `dictionary`, `default value`.

### Frontend (`client/src/`)
React class-component app (React 17) using Materialize CSS. Proxied to `http://localhost:5000` in development. Routes:
- `/` — Dashboard
- `/notification` — Notification list
- `/mapping` — View saved field mappings (dictionaries)
- `/mapping-drop-file` — Upload a CSV dictionary file for a client
- `/client` — Client management
- `/ftp/:id` — FTP server management per client
- `/admin` — Admin email management

### Magellan XML schema (`data/magellanField.js`)
Defines the fixed ordered lists of XML fields: `header` (order-level fields), `line` (order-line-level fields), and `mandatoryHeader` (required fields: `OrderAction`, `OrderNumber`, `ClientCode`, `SupplierCode`, `DirectOrTranship`, `TransportMode`). Field `id` values determine position in the output XML.

### Special XML fields
- `OrderReference` / `OrderLineReference`: stored as arrays `[referenceName, referenceValue]` and nested differently in the XML output
- `DeliveryAddressCode` / `LineDeliveryAddress`: wrapped in their own XML container elements
- `OrderMilestoneDates` / `OrderLineMilestoneDates`: date fields grouped into their own XML containers
- `&` characters in field values are replaced with `_` before writing to XML
