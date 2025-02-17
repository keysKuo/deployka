import { Types } from "mongoose";
import { User } from "./user";
import { BuildForm } from "./forms";
import { RepositoryData } from "./repository";
export type Project = {
    _id?: Types.ObjectId;
    user: User | Types.ObjectId;
    info: BuildForm;
    repoData: RepositoryData;
};
//# sourceMappingURL=project.d.ts.map