import * as express from "express"
import { response } from "@infra/drivers/utils"
import { ApiController } from "@infra/drivers/api/ApiController"
import { PedidoDTO } from "@infra/drivers/dtos/pedido/pedido.dto"
const router = express.Router()

const apiController = ApiController.Instance

router.get("/", (req: express.Request, res: express.Response, next: express.NextFunction) => {
  return response(apiController.pedidoController.listar(req.query), res, next)
})

router.get("/:id", (req: express.Request, res: express.Response, next: express.NextFunction) => {
  return response(apiController.pedidoController.buscarUm(req.params.id), res, next)
})

router.post("/", PedidoDTO.validate, (req: express.Request, res: express.Response, next: express.NextFunction) => {
  const body = req.body
  return response(
    apiController.pedidoController.criar(body),
    res,
    next
  )
})

router.patch("/:id", PedidoDTO.validate, (req: express.Request, res: express.Response, next: express.NextFunction) => {
  const body = req.body
  return response(
    apiController.pedidoController.editar({_id: req.params.id, props: body}),
    res,
    next
  )
})

router.delete("/:id", (req: express.Request, res: express.Response, next: express.NextFunction) => {
  return response(apiController.pedidoController.deletar(req.params.id), res, next)
})

export default router
