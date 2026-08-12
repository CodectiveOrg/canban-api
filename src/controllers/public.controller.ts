import { Request, RequestHandler, Response } from "express";

import { z } from "zod";

import { HttpError } from "@/errors/http.error";

import { FileService } from "@/services/file.service";

export class PublicController {
  public constructor() {
    this.health = this.health.bind(this);
  }

  public async health(_: Request, res: Response): Promise<void> {
    res.json({
      message: "API is healthy.",
    });
  }

  public getPicture(folder: string): RequestHandler {
    async function getPicture(req: Request, res: Response): Promise<void> {
      const params = FilenameParamsSchema.parse(req.params);

      const file = await FileService.load(folder, params.filename);

      if (!file) {
        throw new HttpError(404, "Picture not found.");
      }

      res.sendFile(file);
    }

    return getPicture.bind(this);
  }
}

export const FilenameParamsSchema = z.object({
  filename: z.string(),
});
