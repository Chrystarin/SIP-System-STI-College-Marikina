"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const helmet_1 = __importDefault(require("helmet"));
const mongoose_1 = __importDefault(require("mongoose"));
const authenticate_1 = __importDefault(require("./middlewares/authenticate"));
const errorHandler_1 = __importDefault(require("./middlewares/errorHandler"));
const errors_1 = require("./utilities/errors");
const envs_1 = __importDefault(require("./utilities/envs"));
const auth_route_1 = __importDefault(require("./api/auth/auth.route"));
const schoolYear_route_1 = __importDefault(require("./api/schoolYear/schoolYear.route"));
const sip_route_1 = __importDefault(require("./api/sip/sip.route"));
const student_route_1 = __importDefault(require("./api/student/student.route"));
const user_route_1 = __importDefault(require("./api/user/user.route"));
const { PORT, MONGO_URI, CORS_ORIGIN } = envs_1.default;
const app = (0, express_1.default)();
app.use((0, cors_1.default)({ credentials: true, origin: CORS_ORIGIN }));
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.json());
app.use((0, helmet_1.default)());
app.use('/auth', auth_route_1.default);
app.use(authenticate_1.default);
app.use('/schoolyears', schoolYear_route_1.default);
app.use('/sips', sip_route_1.default);
app.use('/students', student_route_1.default);
app.use('/users', user_route_1.default);
app.use((_req, _res, next) => next(new errors_1.NotFound()));
app.use(errorHandler_1.default);
mongoose_1.default
    .connect(MONGO_URI)
    .then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => console.log('Server running on port', PORT));
})
    .catch(console.error);
