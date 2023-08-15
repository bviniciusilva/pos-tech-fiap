import * as express from "express"
import { response } from "@infra/drivers/utils"
import { ApiController } from "@infra/drivers/api/ApiController"
import { ItemDTO } from "../dtos/item/item.dto"
const router = express.Router()

const apiController = ApiController.Instance

router.get("/", (req: express.Request, res: express.Response, next: express.NextFunction) => {
  return response(apiController.itemController.listar(req.query), res, next)
})

router.get("/:id", (req: express.Request, res: express.Response, next: express.NextFunction) => {
  return response(apiController.itemController.buscarUm(req.params.id), res, next)
})

router.post("/", ItemDTO.validate, (req: express.Request, res: express.Response, next: express.NextFunction) => {
  const body = req.body
  return response(
    apiController.itemController.criar(body),
    res,
    next
  )
})

router.patch("/:id", ItemDTO.validate, (req: express.Request, res: express.Response, next: express.NextFunction) => {
  const body = req.body
  return response(
    apiController.itemController.editar(req.params.id, body),
    res,
    next
  )
})

router.delete("/:id", (req: express.Request, res: express.Response, next: express.NextFunction) => {
  return response(apiController.itemController.deletar(req.params.id), res, next)
})

export default router
