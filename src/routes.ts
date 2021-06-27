import { request, Router } from "express"
import { CreateUserController } from "./controllers/CreateUserController"
import { CreateTagController } from "./controllers/CreateTagController"
import { ensurAdmin } from "./middlewares/ensureAdmin"
import { AuthenticateUserControler } from "./controllers/AutenticateUserController"
import { CreateComplimentsController } from "./controllers/CreateComplimentsController"
import { ensureAuthenticad } from "./middlewares/ensureAuthenticad"
import { ListUserSendComplimentsController } from "./controllers/ListUserSendComplimentsController"
import { ListUserReceiveComplimentsController } from "./controllers/ListUserReceiveComplimentsController"
import { ListTagsController } from "./controllers/ListTagsController"
import { ListUsersController } from "./controllers/ListUsersController"

const router = Router()

const createUserController = new CreateUserController()
const createTagController = new CreateTagController()
const authenticateUserControler = new AuthenticateUserControler()
const createComplimentsController = new CreateComplimentsController()
const listUserSendComplimentsController = new ListUserSendComplimentsController()
const listUserReceiveComplimentsController = new ListUserReceiveComplimentsController()
const listTagsController = new ListTagsController()
const listUsersController = new ListUsersController()

//METODOS POST
router.post("/users", createUserController.handle)
router.post("/tags", ensureAuthenticad, ensurAdmin, createTagController.handle)
router.post("/login", authenticateUserControler.handle)
router.post("/compliments", ensureAuthenticad, createComplimentsController.handle )

//METODOS GET
router.get("/users/compliments/send", ensureAuthenticad, listUserSendComplimentsController.handle)
router.get("/users/compliments/receive", ensureAuthenticad, listUserReceiveComplimentsController.handle)
router.get("/tags", ensureAuthenticad, listTagsController.handle)
router.get("/users", ensureAuthenticad, listUsersController.handle)
router.get("/", (request, response) => {
    response.send("Hello Word")
})
export { router }