import config from "../Config/Config";
import { Client , ID, Databases,Storage,Query  } from "appwrite";

export class Service{
    client = new Client();
    databases;
    bucket;
    constructor(){
        this.client
        .setEndpoint(config.appwriteURl)
        .setProject(config.appwriteProjectID);
        this.databases = new Databases(this.client);
        this.bucket = new Storage(this.client);
    }
    async CreatePost({title,slug,content,featuredImage,status,userId}){
        try {
            return await this.databases.createDocument(config.appwriteDatabaseID,config.appwriteCollectionID,slug,{
                title,content,featuredImage,status,userId,
            })
        } catch (error) {
            throw error;
        }
    }
    async UpdatePost(slug,{title,content,featuredImage,status}){
        try {
            return await this.databases.updateDocument(config.appwriteDatabaseID,config.appwriteDatabaseID,
                slug,{
                    title,content,featuredImage,status,
                }
            )
        } catch (error) {
            throw error;
        }
    }
    async deletePost(slug){
        try {
            await this.databases.deleteDocument(
                config.appwriteDatabaseID,config.appwriteCollectionID,slug,
            )
            return true;
        } catch (error) {
            throw error;
            return false;
        }
    }
    async getPost(slug){
        try {
            return await this.databases.getDocument(
                config.appwriteDatabaseID.config.appwriteCollectionID,
                slug,
            )
        } catch (error) {
            throw error;
            return false;
        }
    }
    async getPosts(queries = [Query.equal("status","active")]){
        try {
            return await this.databases.listDocuments(
                config.appwriteDatabaseID,
                config.appwriteCollectionID,queries,
            )
        } catch (error) {
            throw error;
            return false;
        }
    }
    //File Upload Services 
    async uploadfile(file){
        try {
            return await this.bucket.createFile(config.appwriteBucketID,ID.unique(),file
        )
        } catch (error) {
            throw error;
        }
    }

    async deleteFile(fileId){
        try {
            await this.bucket.deleteFile(config.appwriteBucketID,fileId)
            return true;
        } catch (error) {
            throw error;
        }
    }

    getFilePreview(fileId){
        return this.bucket.getFilePreview(
            config.appwriteBucketID,fileId
        )
    }
}



const service = new Service();

export default service;