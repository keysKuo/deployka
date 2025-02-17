"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentMethod = exports.CheckoutStatus = void 0;
var CheckoutStatus;
(function (CheckoutStatus) {
    CheckoutStatus["COMPLETED"] = "completed";
    CheckoutStatus["PENDING"] = "pending";
    CheckoutStatus["CANCELLED"] = "cancelled";
})(CheckoutStatus || (exports.CheckoutStatus = CheckoutStatus = {}));
var PaymentMethod;
(function (PaymentMethod) {
    PaymentMethod["STRIPE"] = "stripe";
    PaymentMethod["PAYPAL"] = "paypal";
    PaymentMethod["MOMO"] = "momo";
    PaymentMethod["ZALOPAY"] = "zalopay";
})(PaymentMethod || (exports.PaymentMethod = PaymentMethod = {}));
