"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importStar(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const connection_1 = require("../src/database/connection");
const foodModel_1 = require("../src/modules/foodModel");
const cors_1 = __importDefault(require("cors"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 3002;
app.use((0, express_1.json)());
app.use((0, express_1.urlencoded)({ extended: true }));
app.use((0, cors_1.default)());
/* app.use("/api"); */
(0, connection_1.connectToDatabase)();
app.get("/", (req, res) => {
    res.json({ ok: "OK" });
});
app
    .get("/foods", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const allFoods = yield foodModel_1.FoodModel.find({}).select({ _id: 0 });
    return res.json(allFoods);
}))
    .post("/foods", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!Object.keys(req.body).length) {
        return res.json({ message: "Empty body" });
    }
    try {
        // Use a transaction to delete current documents and replace them with the ones from request
        const session = yield foodModel_1.FoodModel.startSession();
        session.startTransaction();
        try {
            yield foodModel_1.FoodModel.deleteMany({}, { session });
            yield foodModel_1.FoodModel.insertMany(req.body, { session });
            yield session.commitTransaction();
        }
        catch (error) {
            yield session.abortTransaction();
            throw error;
        }
        finally {
            session.endSession();
        }
    }
    catch (error) {
        console.error("Error replacing documents:", error);
    }
    return res.json(req.body);
}));
app.get("/reset", (_, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield foodModel_1.FoodModel.deleteMany({});
    return res.json({ reset: "reset" });
}));
app.listen(3002, "0.0.0.0", () => {
    console.log("App listening on port ", port);
});
module.exports = app;
