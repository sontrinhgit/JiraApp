import { baseService } from "./baseService";

export class ProjectService extends baseService {
  //muon ke thua thi phai co constructor
  constructor() {
    super();
  }

  deleteProject = (id) => {
    this.delete(`/Project/deleteProject?projectId=${id}`);
  };
}

export const projectService = new ProjectService();
