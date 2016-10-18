
export function modelName(modelName:string){
    return function(target: any){
        // Reflect.defineMetadata("modelName", modelName, constructor);
        target.modelName = modelName;

        let instance = new target();

        logType(target, 'title');
    }
}


export function enumerable(value: boolean) {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        descriptor.enumerable = value;
    };
}

export function sealed(constructor: Function) {
    Object.seal(constructor);
    Object.seal(constructor.prototype);
}

export function logType(target : any, key : string) {
      var t = Reflect.getMetadata("design:type", target, key);

      console.log('type:')
      console.log(t);
    }