import {logType, modelName, enumerable, sealed} from '../decorators';

@modelName('Book')
export class Book {
    @logType
    public title:string = '';

    test(){

    }
}


export function dodol(){
    
}