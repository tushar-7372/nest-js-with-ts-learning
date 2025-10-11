import { Injectable , NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './users.entity';

@Injectable()
export class UsersService {

    // repo : Repository<User> => this means that repo is going to be a type of typeorm Repository that deals with the instances of users
    constructor(@InjectRepository(User) private repo : Repository<User>){}

    // creating and saving a user in db
    create(email : string , password : string){

        // always use option 1
        // option 1 : step 1 : create an instance of User Entity 
        // step 2 : save that instance to db
        // it creates an istance of User Entity with email and password
        const user = this.repo.create({email,password});
        // this takes the above created User Entity instance and saves in the db
        return this.repo.save(user);

        // option 2 : step : directly save the object to db
        // this can also save an entry to db but the validation that we have put on User Entity will not be applied here 
        // return this.repo.save({email,password});

        // so why option 1
        // explained in 'users.entity.ts' - Hooks

    }

    // when we are sending the user data , we are also sending the user's password which is not correct
    findOne(id : number){
        // return this.repo.findOneBy({email : 'abc@gmail.com'});
        // 
        return this.repo.findOneBy({ id })
    }

    find(email : string){
        return this.repo.find( {where : {email} } );
    }

    // for the 2nd attribute , Partial<User> : it will check for any or none of the fields defined in User entity
    // eg : {email : 'email'} or {}
    // option to use : save() or update()
    async update(id : number , attrs : Partial<User>){
        // to use hooks for updating the record, we need to create an entity 
        // for creating an entity , we first need to find the record , create an Entity , save it to db

        // findOne() : this is an async operation
        const user = await this.findOne(id);

        if(!user){
            // controller cannot handle errors thrown using new Error()
            // throw new Error('user not found');

            throw new NotFoundException('user not found');
        }

        // merges the attributes of attrs to user and overrides in user , if already present
        // user is the target object , it will have all the new and updated properties
        Object.assign(user , attrs);

        return this.repo.save(user);
    }

    // option to use : remove(Entity) or delete({obj})
    async remove(id : number){
        const user = await this.findOne(id);

        if(!user){
            // throw new Error('user not found');
             throw new NotFoundException('user not found');
        }

        return this.repo.remove(user);
    }
}
