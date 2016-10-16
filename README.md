# What is Pempek-Framework

Pempek-Framework is a typescript application framework that will allows building applications that is not tightly coupled to a particular persistent storage or database server and a particular user interface platform. With Pempek-Framework, you only need to define your application domain model and the framework will take care how to save them and how to display them. But you still can modify and provide your own customizations.

# How to use

## The CLI

Install the `pempek-cli`:

```
npm install pempek-cli
```

## Generate the application folder

Generate your project folder using `pempek g <YOUR_PROJECT_NAME>`

```
pempek g online-store
```

## Define your models

Inside the application there will be a `models` folder. It will be the places of all the application domain models.

If you don't specify the `@storageOptions()` of the class model properties then it will use the default mappings. 

```
- online-store
    - models
        - book.ts
        - author.ts
        - chapter.ts
    

=== book.ts ===
import {DomainModel} from 'pempek-framework';
import {Author} from './author';
import {Chapter} from './chapter';

@modelName('Book')
export class Book extends DomainModel{

    @storageOptions(StorageType.CHAR(200))
    public title:string = '';

    @storageOptions(StorageType.TEXT('tiny'))
    public summary:string = '';

    @belongsTo('Author')
    public author: Author = null;


    @hasMany('Chapter')
    public chapters: Chapter[] = [];
}

=== author.ts ===
import {DomainModel} from 'pempek-framework';

@modelName('Author')
export class Author extends DomainModel{
    public name:string = '';

}

=== chapter.ts ===
import {DomainModel} from 'pempek-framework';

@modelName('Author')
export class Author extends DomainModel{
    public name:string = '';

}

```

NOTE: [sequelize-classes](https://github.com/ConciergeAuctions/sequelize-classes) project can be used as a reference to build the POJO to sequelize model class.

## Generate the UI

First install the ui plugin

```
npm install pempek-ui-vue2
```

Once installed you can generate the ui for your models.

```
pempek g ui-vue2 models/book
```

## Install a service plugin

```
npm install pempek-sequelize-service
```

Once you install the sequelize-service you can generate your domain models service to persists them using sequelize.

```
pempek g sequelize-service models/book
```

## Install the backend server plugin

```
npm install pempek-backend-hapi
```

Once installed you can use hapijs as the backend server

```
pempek g backend-hapi models/book
```

The backend-hapi will generate the REST end points based on the metadata of your models.

### Generate the UI - Technical Plans

So far from my experiments. The only way to iterate the list of class members is by instantiating the class using the `new` keyword. After that we can use (this)[https://developer.mozilla.org/en-US/docs/Web/JavaScript/Enumerability_and_ownership_of_properties] utility function from Mozilla to retrieve many kind of class members types.

Another finding, we can use `import * as models` and then use `for..in` to iterate the list of the export definitions. Because we only interested with domain model class we can check for the `modelName` variable existence on each class definitions. 

Pseudocode:

```

import * as models from './models';

for(let className in models){
    let classInfo = getClassInfo(className, models);

    if(classInfo.modelName.length > 0){
        generateUI(classInfo);
    }
}

```

### Generate the Sequelize Service - Technical Plans

Pseudocode:

```

import * as models from './models';

for(let className in models){
    let classInfo = getClassInfo(className, models);

    if(classInfo.modelName.length > 0){
        generateSequelizeModelAndMigrations(classInfo);
        generateSequelizeService(classInfo);
    }
}

```

### Generate the Hapi backend - Technical Plans

Pseudocode:

```

import * as models from './models';

for(let className in models){
    let classInfo = getClassInfo(className, models);

    if(classInfo.modelName.length > 0){
        generateHapiController(classInfo);
        generateHapiRESTEndPoints(classInfo);
    }
}

```
