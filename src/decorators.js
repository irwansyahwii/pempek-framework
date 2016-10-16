"use strict";
function modelName(modelName) {
    return function (target) {
        // Reflect.defineMetadata("modelName", modelName, constructor);
        target.modelName = modelName;
    };
}
exports.modelName = modelName;
function enumerable(value) {
    return function (target, propertyKey, descriptor) {
        descriptor.enumerable = value;
    };
}
exports.enumerable = enumerable;
function sealed(constructor) {
    Object.seal(constructor);
    Object.seal(constructor.prototype);
}
exports.sealed = sealed;
