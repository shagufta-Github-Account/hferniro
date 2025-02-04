"use server"

import { client } from "@/sanity/lib/client"

export interface Iproduct {

    title: string[],
   image : string,
   price: number,
   tags: string,
 
   dicountPercentage: number,
   isNew: boolean,

 }
 export  async function fetchData(){
    const res = await client.fetch(`*[_type=="product"]{
    _id,
    title,
    "image" :productImage.asset ->url,
    price,
    tags,
    dicountPercentage,

    isNew}`)
    return res
 }