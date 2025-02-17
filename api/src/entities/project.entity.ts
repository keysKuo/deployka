import { BuildForm, RepositoryData } from "shared-types";
import { User } from "./user.entity";
import { Types } from "mongoose";

export type Project = {
    _id?: Types.ObjectId,
    user: User | Types.ObjectId,
    info: BuildForm,
    repoData: RepositoryData
}
