import { Request, RequestHandler, Response } from "express";

import { z } from "zod";

import { FileService } from "@/services/file.service";

export class PublicController {
  public getPicture(folder: string): RequestHandler {
    async function getPicture(req: Request, res: Response): Promise<void> {
      const params = FilenameParamsSchema.parse(req.params);

      const file = await FileService.load(folder, params.filename);

      if (!file) {
        res.status(404).json({
          message: "Picture not found.",
          error: "Not Found",
        });

        return;
      }

      res.sendFile(file);
    }

    return getPicture.bind(this);
  }
}

export const FilenameParamsSchema = z.object({
  filename: z.string(),
});
