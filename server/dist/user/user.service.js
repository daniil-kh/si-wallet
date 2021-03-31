"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const constants_1 = require("../core/constants");
const sha256 = require("sha256");
const blockchain_service_1 = require("../blockchain/blockchain.service");
let UserService = class UserService {
    constructor(userRepository, blockchain) {
        this.userRepository = userRepository;
        this.blockchain = blockchain;
    }
    async create(user) {
        if (await this.userRepository.findOne({ where: { username: user.username } })) {
            throw new Error("User with this username already exists");
        }
        let object = user;
        object.password = sha256(user.password);
        let newUser = await this.userRepository.create(object);
        newUser.password = undefined;
        await this.blockchain.createAddress(newUser.username).catch((err) => { throw err; });
        return Object.assign({}, newUser.toJSON());
    }
    async updateFullname(id, user) {
        await this.userRepository.update(user, {
            where: {
                id: id
            }
        }).catch((err) => { throw err; });
        return await this.findOneById(id).catch((err) => { throw err; });
    }
    async validate(user) {
        let UserData = await this.userRepository.findOne({
            where: {
                email: user.email,
                password: sha256(user.password)
            },
            attributes: { exclude: ['password'] }
        });
        if (!UserData)
            return null;
        return Object.assign({}, UserData.toJSON());
    }
    async findOneByEmail(email) {
        return await this.userRepository.findOne({
            where: { email },
            attributes: { exclude: ['password'] }
        });
    }
    async findOneById(id) {
        let UserData = await this.userRepository.findOne({
            where: { id },
            attributes: { exclude: ['password'] }
        });
        if (!UserData)
            return null;
        let balance = await this.blockchain.getAdresses(UserData.username).catch((err) => { throw err; });
        let allBalance = 0;
        await Promise.all(balance.map((one) => {
            allBalance += parseFloat(one.available_balance);
            return one.available_balance;
        }));
        return Object.assign(Object.assign({}, UserData.toJSON()), { profitAmount: 0, profitPercent: 100, APY: 0, DDY: 0, tradeBalance: 0, totalBalance: allBalance });
    }
    async findAll() {
        return await this.userRepository.findAll();
    }
};
UserService = __decorate([
    common_1.Injectable(),
    __param(0, common_1.Inject(constants_1.USER_REPOSITORY)),
    __metadata("design:paramtypes", [Object, blockchain_service_1.BlockchainService])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map