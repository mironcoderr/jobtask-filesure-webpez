import mongoose, { Schema, Document } from "mongoose";

export interface PurchaseType extends Document {
    buyerId: mongoose.Types.ObjectId;
    productId?: mongoose.Types.ObjectId | null;
    isFirstPurchaseForBuyer: boolean;
}

const purchaseSchema = new Schema<PurchaseType>({
    buyerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        default: null
    },
    isFirstPurchaseForBuyer: {
        type: Boolean,
        required: true,
        default: false
    },
}, { timestamps: true });

export const Purchase = mongoose.model<PurchaseType>("Purchase", purchaseSchema);
