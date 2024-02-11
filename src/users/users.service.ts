import { Injectable } from '@nestjs/common';
import { NotFoundException } from '@nestjs/common';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';


@Injectable()
export class UsersService {
    private users = [
        {
            "id": 1,
            "name": "John Doe",
            "email": "john.doe@gmail.com",
            "role": "ADMIN"
        },
        {
            "id": 2,
            "name": "Jan Doe",
            "email": "jan.doe@gmail.com",
            "role": "INTERN"
        },
        {
            "id": 3,
            "name": "Joon Doe",
            "email": "joon.doe@gmail.com",
            "role": "INTERN"
        },
        {
            "id": 4,
            "name": "Jen Doe",
            "email": "jen.doe@gmail.com",
            "role": "ENGINEER"
        },
        {
            "id": 5,
            "name": "Jun Doe",
            "email": "jun.doe@gmail.com",
            "role": "ADMIN"
        },
    ]

    findAll(role?: 'INTERN' | 'ENGINEER' | 'ADMIN') {
        if (role) {
            const rolesArray =  this.users.filter(user => user.role === role)
            
            if (rolesArray.length === 0) {
                throw new NotFoundException(`User with role ${role} not found`)
            }
            
            return rolesArray
        }
        return this.users
    }

    findOne(id: number) {
        const user = this.users.find(user => user.id === id)

        if (!user) {
            throw new NotFoundException(`User with ID ${id} not found`)
        }

        return user
    }

    create(createUserDto: CreateUserDto) {
        const usersByHighesId = [...this.users].sort((a, b) => b.id - a.id)

        const newUser = {
            id: usersByHighesId[0].id + 1,
            ...createUserDto
        }
        
        this.users.push(newUser)

        return newUser
    }

    update(id: number, updateUserDto: UpdateUserDto){
        this.users = this.users.map(user => {
            if (user.id === id) {
                return {
                    ...user,
                    ...updateUserDto
                }
            }
            return user
        })

        return this.findOne(id)
    }

    delete(id: number) {
        const removedUser = this.findOne(id)

        this.users = this.users.filter(user => user.id !== id)

        return removedUser
    }
}
