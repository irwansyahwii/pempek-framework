import "reflect-metadata";
import * as models from './models';

import * as typeinfo from 'ts-type-info';


var SimplePropertyRetriever = {
    getOwnEnumerables: function (obj) {
        return this._getPropertyNames(obj, true, false, this._enumerable); 
         // Or could use for..in filtered with hasOwnProperty or just this: return Object.keys(obj);
    },
    getOwnNonenumerables: function (obj) {
        return this._getPropertyNames(obj, true, false, this._notEnumerable);
    },
    getOwnEnumerablesAndNonenumerables: function (obj) {
        return this._getPropertyNames(obj, true, false, this._enumerableAndNotEnumerable); 
        // Or just use: return Object.getOwnPropertyNames(obj);
    },
    getPrototypeEnumerables: function (obj) {
        return this._getPropertyNames(obj, false, true, this._enumerable);
    },
    getPrototypeNonenumerables: function (obj) {
        return this._getPropertyNames(obj, false, true, this._notEnumerable);
    },
    getPrototypeEnumerablesAndNonenumerables: function (obj) {
        return this._getPropertyNames(obj, false, true, this._enumerableAndNotEnumerable);
    },
    getOwnAndPrototypeEnumerables: function (obj) {
        return this._getPropertyNames(obj, true, true, this._enumerable); 
        // Or could use unfiltered for..in
    },
    getOwnAndPrototypeNonenumerables: function (obj) {
        return this._getPropertyNames(obj, true, true, this._notEnumerable);
    },
    getOwnAndPrototypeEnumerablesAndNonenumerables: function (obj) {
        return this._getPropertyNames(obj, true, true, this._enumerableAndNotEnumerable);
    },
    // Private static property checker callbacks
    _enumerable : function (obj, prop) {
        return obj.propertyIsEnumerable(prop);
    },
    _notEnumerable : function (obj, prop) {
        return !obj.propertyIsEnumerable(prop);
    },
    _enumerableAndNotEnumerable : function (obj, prop) {
        return true;
    },
    // Inspired by http://stackoverflow.com/a/8024294/271577
    _getPropertyNames : function getAllPropertyNames(obj, iterateSelfBool, iteratePrototypeBool, includePropCb) {
        var props = [];

        do {
            if (iterateSelfBool) {
                Object.getOwnPropertyNames(obj).forEach(function (prop) {
                    if (props.indexOf(prop) === -1 && includePropCb(obj, prop)) {
                        props.push(prop);
                    }
                });
            }
            if (!iteratePrototypeBool) {
                break;
            }
            iterateSelfBool = true;
        } while (obj = Object.getPrototypeOf(obj));

        return props;
    }
};

function generate(){

    for(let className in models){
        let classDef = models[className];

        let modelName = classDef.modelName || '';


        if(modelName.length > 0){
            let instance = new classDef();
            let props = SimplePropertyRetriever.getOwnEnumerablesAndNonenumerables(instance);

            let propDesc = Object.getOwnPropertyDescriptor(instance, props[0]);


            var t = Reflect.getMetadata("design:type", classDef, "'title'");

            console.log(t);

            console.log(props);        
        }

    }
}

generate();