import { Request, Response, NextFunction } from "express";
import { HTTP_STATUS } from "../../../constants/httpConstants";
import { successResponse } from "../models/responseModel";
import { createNewImpound, getImpoundByIdAsync, getAllImpounds, updateImpoundById, deleteImpoundById } from "../services/ImpoundService";
import { ImpoundCreateRequest } from "../models/impoundCreateRequestModel";
import { ImpoundUpdateRequest } from "../models/impoundUpdateRequestModel";

export const healthData = (req: Request, res: Response) => {
    res.status(HTTP_STATUS.OK).json({
        status: HTTP_STATUS.OK,
        uptime: process.uptime(),
        timestamp: new Date().toISOString(),
        version: "1.0.0"
    });
};


export const createImpound = async (req: Request, res: Response) => {
    const requestImpound: ImpoundCreateRequest = {
        plateNumber: req.body.plateNumber,
        vehicleType: req.body.vehicleType,
        color: req.body.color,
        daysInLot: req.body.daysInLot,
        realeaseFee: req.body.realeaseFee
    }
    let result = await createNewImpound(requestImpound)
    res.status(HTTP_STATUS.CREATED).send(result)
}

export const getImpoundById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        let id = req.params.id as string;
        let results = await getImpoundByIdAsync(id)

        res.status(HTTP_STATUS.OK).json(successResponse(results, "Impound retrieved"))
    } catch (error) {
        next(error);
    }
}

export const getAllImpound = async (req: Request, res: Response) => {
    try {
        const Impounds = await getAllImpounds() ?? [];
        res.status(HTTP_STATUS.OK).json({ message: "Impound applications retrieved", count: Impounds.length, data: Impounds });
    } catch (error) {
        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ message: "Internal Server Error"})
    }
}
