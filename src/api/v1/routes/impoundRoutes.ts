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

impoundRouter.get("/health", healthData);
impoundRouter.get("/impound", authenticate, isAuthorized({ hasRole: ["admin", "manager", "staff"], allowSameUser: true}), getAllImpound);
impoundRouter.get("/impound/:id", authenticate, isAuthorized({ hasRole: ["admin", "manager", "staff"], allowSameUser: true}), validateRequest(postSchemas.getById), getImpoundById);
impoundRouter.post("/impound", authenticate, isAuthorized({ hasRole: ["admin", "manager"], allowSameUser: true}), validateRequest(postSchemas.create), createImpound);
impoundRouter.put("/impound/:id", authenticate, validateRequest(postSchemas.update), updateImpoundByIdAsync);
impoundRouter.delete("/impound/:id", authenticate, validateRequest(postSchemas.delete), deleteImpoundByIdAsync);

export default impoundRouter;

// impoundRouter.get("/impounds", authenticate, isAuthorized({ hasRole: ["admin", "manager", "officer"], allowSameUser: true}), getAllImpound);
// impoundRouter.get("/impounds/:id", authenticate, isAuthorized({ hasRole: ["admin", "manager", "officer"], allowSameUser: true}), validateRequest(postSchemas.getById), getImpoundById);
// impoundRouter.post("/impounds", authenticate, isAuthorized({ hasRole: ["admin", "manager"], allowSameUser: true}), validateRequest(postSchemas.create), createImpound);
// impoundRouter.put("/impounds/:id", authenticate, isAuthorized({ hasRole: ["admin", "manager"], allowSameUser: true}),validateRequest(postSchemas.update), updateImpoundByIdAsync);
// impoundRouter.delete("/impounds/:id", authenticate, isAuthorized({ hasRole: ["admin"], allowSameUser: true}),validateRequest(postSchemas.delete), deleteImpoundByIdAsync);