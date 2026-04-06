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

export const getImpoundById = async (id: string): Promise<ImpoundDTO | undefined> => {
    const docRef: DocumentReference = db.collection("Impounds").doc(id);

    const doc = await docRef.get();

    if (doc.exists) {
        let data = doc.data();

        return {
            id: doc.id,
            plateNumber: data!.plateNumber,
            vehicleType: data!.vehicleType,
            color: data!.color,
            daysInLot: data!.daysInLot,
            realeaseFee: data!.releaseFee,
            createdAt: data!. createdAt
        }
    } else {
        console.log("No such Impound!");
    }
};
