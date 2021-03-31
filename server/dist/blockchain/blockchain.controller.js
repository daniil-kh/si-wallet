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
exports.BlockchainController = void 0;
const common_1 = require("@nestjs/common");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const blockchain_service_1 = require("./blockchain.service");
const withdraw_dto_1 = require("./dto/withdraw.dto");
let BlockchainController = class BlockchainController {
    constructor(blockchainService) {
        this.blockchainService = blockchainService;
    }
    async getBalance(req, res) {
        let result = await this.blockchainService.getAdresses(req.user.username).catch((err) => {
            res.status(common_1.HttpStatus.BAD_REQUEST).json({ message: [err.message] });
        });
        res.status(common_1.HttpStatus.OK).json(result);
    }
    async getPrices(res) {
        let result = await this.blockchainService.getPrices().catch((err) => {
            res.status(common_1.HttpStatus.INTERNAL_SERVER_ERROR).json({ message: [err.message] });
        });
        res.status(common_1.HttpStatus.OK).json(result);
    }
    async getNews(res) {
        let result = await this.blockchainService.getNews().catch((err) => {
            res.status(common_1.HttpStatus.INTERNAL_SERVER_ERROR).json({ message: [err.message] });
        });
        res.status(common_1.HttpStatus.OK).json(result);
    }
    async getAssets(res) {
        let result = await this.blockchainService.getAssets().catch((err) => {
            res.status(common_1.HttpStatus.INTERNAL_SERVER_ERROR).json({ message: [err.message] });
        });
        res.status(common_1.HttpStatus.OK).json(result);
    }
    async getAssetsBySlag(slag, res) {
        let result = await this.blockchainService.getAssetsBySlag(slag).catch((err) => {
            res.status(common_1.HttpStatus.INTERNAL_SERVER_ERROR).json({ message: [err.message] });
        });
        res.status(common_1.HttpStatus.OK).json(result);
    }
    async withdraw(body, res, req) {
        common_1.Logger.log(body);
        let result = await this.blockchainService.withdraw(req.user.username, body.network, body.amount, body.withdrawAddress).catch((err) => {
            res.status(common_1.HttpStatus.INTERNAL_SERVER_ERROR).json({ message: [err.message] });
        });
        res.status(common_1.HttpStatus.OK).json(result);
    }
};
__decorate([
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
    common_1.Get('/allBalance'),
    __param(0, common_1.Request()), __param(1, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], BlockchainController.prototype, "getBalance", null);
__decorate([
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
    common_1.Get('/prices'),
    __param(0, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], BlockchainController.prototype, "getPrices", null);
__decorate([
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
    common_1.Get('/news'),
    __param(0, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], BlockchainController.prototype, "getNews", null);
__decorate([
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
    common_1.Get('/assets'),
    __param(0, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], BlockchainController.prototype, "getAssets", null);
__decorate([
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
    common_1.Get('/assets/:slag'),
    __param(0, common_1.Param('slag')), __param(1, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], BlockchainController.prototype, "getAssetsBySlag", null);
__decorate([
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
    common_1.Post('/withdraw'),
    __param(0, common_1.Body()), __param(1, common_1.Res()), __param(2, common_1.Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [withdraw_dto_1.WithdrawDto, Object, Object]),
    __metadata("design:returntype", Promise)
], BlockchainController.prototype, "withdraw", null);
BlockchainController = __decorate([
    common_1.Controller('blockchain'),
    __metadata("design:paramtypes", [blockchain_service_1.BlockchainService])
], BlockchainController);
exports.BlockchainController = BlockchainController;
//# sourceMappingURL=blockchain.controller.js.map