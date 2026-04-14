import express, { Router } from "express";
import { healthData, 
        createImpound, 
        getImpoundById, 
        getAllImpound, 
        updateImpoundByIdAsync, 
        deleteImpoundByIdAsync } from "../controllers/impoundController";
import { validateRequest } from "../middleware/validateRequest";
import { postSchemas } from "../validation/impoundValidation";
import authenticate from "../middleware/authenticate";
import isAuthorized from "../middleware/authorize";

const impoundRouter: Router = express.Router();

/**
 * @openapi
 * /health:
 *   get:
 *     summary: Health check endpoint
 *     tags: [Events]
 *     responses:
 *       200:
 *         description: API is running
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "ok"
 */
impoundRouter.get("/health", healthData);
/**
 * @openapi
 * /impound:
 *   get:
 *     summary: Retrieve all impound records
 *     tags:
 *       - Impound
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of all impounded vehicles
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Impound records retrieved
 *                 count:
 *                   type: integer
 *                   example: 1
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                         example: imp_000001
 *                       plateNumber:
 *                         type: string
 *                         example: ABC346
 *                       vehicleType:
 *                         type: string
 *                         enum:
 *                           - car
 *                           - truck
 *                           - van
 *                           - bus
 *                           - suv
 *                           - motorcycle
 *                         example: truck
 *                       color:
 *                         type: string
 *                         example: blue
 *                       daysInLot:
 *                         type: integer
 *                         example: 3
 *                       releaseFee:
 *                         type: number
 *                         example: 70
 *                       createdAt:
 *                         type: string
 *                         example: 2026-04-11T19:15:31.000Z
 *                       updatedAt:
 *                         type: string
 *                         example: 2026-04-11T19:15:31.000Z
 */
impoundRouter.get("/impound", authenticate, isAuthorized({ hasRole: ["admin", "manager", "staff"], allowSameUser: true}), getAllImpound);
/**
 * @openapi
 * /impound/{id}:
 *   get:
 *     summary: Retrieve a single impound record by ID
 *     tags:
 *       - Impound
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: Impound record ID
 *       - name: include
 *         in: query
 *         required: false
 *         schema:
 *           type: string
 *           enum: [comments, author]
 *     responses:
 *       200:
 *         description: Impound record retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Impound record retrieved
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: imp_000001
 *                     plateNumber:
 *                       type: string
 *                       example: ABC346
 *                     vehicleType:
 *                       type: string
 *                       enum:
 *                         - car
 *                         - truck
 *                         - van
 *                         - bus
 *                         - suv
 *                         - motorcycle
 *                       example: truck
 *                     color:
 *                       type: string
 *                       example: blue
 *                     daysInLot:
 *                       type: integer
 *                       example: 3
 *                     releaseFee:
 *                       type: number
 *                       example: 70
 *                     createdAt:
 *                       type: string
 *                       example: 2026-04-11T19:15:31.000Z
 *                     updatedAt:
 *                       type: string
 *                       example: 2026-04-11T19:15:31.000Z
 *       404:
 *         description: Impound record not found
 */
impoundRouter.get("/impound/:id", authenticate, isAuthorized({ hasRole: ["admin", "manager", "staff"], allowSameUser: true}), validateRequest(postSchemas.getById), getImpoundById);
/**
 * @openapi
 * /impound:
 *   post:
 *     summary: Create a new impound record
 *     tags:
 *       - Impound
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - plateNumber
 *               - vehicleType
 *               - color
 *               - daysInLot
 *               - releaseFee
 *             properties:
 *               plateNumber:
 *                 type: string
 *                 pattern: "^[A-Za-z0-9\\-]{2,10}$"
 *                 example: ABC346
 *               vehicleType:
 *                 type: string
 *                 enum:
 *                   - car
 *                   - truck
 *                   - van
 *                   - bus
 *                   - suv
 *                   - motorcycle
 *                 example: truck
 *               color:
 *                 type: string
 *                 example: blue
 *               daysInLot:
 *                 type: integer
 *                 minimum: 0
 *                 example: 3
 *               releaseFee:
 *                 type: number
 *                 minimum: 0
 *                 example: 70
 *     responses:
 *       201:
 *         description: Impound record created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Impound record created
 *                 data:
 *                   $ref: "#/components/schemas/Impound"
 *       400:
 *         description: Validation error
 */
impoundRouter.post("/impound", authenticate, isAuthorized({ hasRole: ["admin", "manager"], allowSameUser: true}), validateRequest(postSchemas.create), createImpound);
impoundRouter.put("/impound/:id", authenticate, isAuthorized({ hasRole: ["admin", "manager"], allowSameUser: true}), validateRequest(postSchemas.update), updateImpoundByIdAsync);
impoundRouter.delete("/impound/:id", authenticate, isAuthorized({ hasRole: ["admin"], allowSameUser: true}), validateRequest(postSchemas.delete), deleteImpoundByIdAsync);

export default impoundRouter;
