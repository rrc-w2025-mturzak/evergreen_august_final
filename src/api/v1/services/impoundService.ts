import { addImpound, getImpoundById, getImpounds, updateImpounds, deleteImpound } from "../repositories/firestoreRepository";
import { ImpoundReponse } from "../models/impoundResponse";
import { ImpoundCreateRequest } from "../models/impoundCreateRequestModel";
import { ImpoundUpdateRequest } from "../models/impoundUpdateRequestModel";
import { ImpoundDTO } from "../models/impoundDTO";
import { ImpoundNotFoundError } from "../errors/errors";

export const createNewImpound =  async (item: ImpoundCreateRequest): Promise<string> => {
    return await addImpound(item); 
}

export const getImpoundByIdAsync = async (id: string): Promise<ImpoundReponse> => {
    const entity = await getImpoundById(id);

    if (!entity) {
        throw new ImpoundNotFoundError(`Impound application not found`);
    }

    return {
        id: entity.id,
        plateNumber: entity.plateNumber,
        daysInLot: entity.daysInLot,
        releaseFee: entity. realeaseFee
    };
}
