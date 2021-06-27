import { getCustomRepository } from "typeorm"
import { TagsRepositories } from "../repositories/TagRepositories"


class CreateTagService{
    async execute( name : string){
        const tagRepository = getCustomRepository(TagsRepositories)

        if(!name){
            throw new Error("Incorrect name!")
        }

        const tagAlreedExists = await tagRepository.findOne({
            name,
        })

        if (tagAlreedExists) {
            throw new Error("Tag already exists!")
        }

        const tag = tagRepository.create({
            name
        })
        await tagRepository.save(tag)
        return tag
    }
}

export { CreateTagService }