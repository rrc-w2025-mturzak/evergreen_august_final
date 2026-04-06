import { db } from "../config/firebaseConfig";
import { DocumentReference, QuerySnapshot } from "firebase-admin/firestore";
import { Impound } from "../models/impoundModel";
import { ImpoundCreateRequest } from "../models/impoundCreateRequestModel";
import { ImpoundUpdateRequest } from "../models/impoundUpdateRequestModel";
import { ImpoundDTO } from "../models/impoundDTO";

export const addImpound = async (item:ImpoundCreateRequest): Promise<string> => {

    const docRef: DocumentReference = db.collection("Impounds").doc("6");

    const itemEntity: Impound = {
        plateNumber: item.plateNumber,
        vehicleType: item.vehicleType,
        color: item.color,
        daysInLot: item.daysInLot,
        realeaseFee: item.realeaseFee,
        createdAt: new Date()
    }
    await docRef.set(itemEntity);
    return docRef.id;
};

